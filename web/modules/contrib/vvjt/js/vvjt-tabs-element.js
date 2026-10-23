/**
 * @file
 * VvjtTabsElement — `<vvjt-tabs>` custom element.
 *
 * Extends `Drupal.Vvj.ElementBase` from `vvj_core`. Implements the W3C
 * ARIA APG tab pattern with keyboard navigation (Left/Right arrows for
 * horizontal tabs; Home/End; Enter/Space activates), aria-selected sync,
 * deep-linking via URL hash. The base class + shared helpers are pulled
 * from the `Drupal.Vvj` namespace — Drupal core's cross-file sharing
 * pattern — with load order guaranteed by the `vvjt` library's
 * `dependencies:`.
 *
 * @license SPDX-License-Identifier: GPL-2.0-or-later
 */

// phpcs:disable Drupal.NamingConventions.UpperCaseConstant
// phpcs:disable Generic.PHP.UpperCaseConstant
// phpcs:disable Squiz.WhiteSpace.OperatorSpacing

((Drupal) => {
  const { ElementBase, handleArrowKeyNav, wireDeeplink, writeDeeplinkHash } =
    Drupal.Vvj;

  class VvjtTabsElement extends ElementBase {
    static get patternSlug() {
      return 'vvjt';
    }

    onHydrate() {
      /** @type {HTMLElement | null} */
      this._inner = this.querySelector(':scope > .vvjt-inner');
      if (!this._inner) {
        return;
      }

      /** @type {NodeListOf<HTMLElement>} */
      this._buttons = this._inner.querySelectorAll('.vvjt-button');
      /** @type {NodeListOf<HTMLElement>} */
      this._panes = this._inner.querySelectorAll('.vvjt-pane');

      this._initAria();
      this._wireClicks();
      this._wireKeyboard();
      this._updateAriaLabels();
      this._disableNestedLinks();
      this._wireDeeplink();
    }

    // -----------------------------------------------------------------
    // Initial state.
    // -----------------------------------------------------------------

    _initAria() {
      this._buttons.forEach((button, index) => {
        const isFirst = index === 0;
        button.setAttribute('aria-selected', isFirst ? 'true' : 'false');
        button.setAttribute('aria-expanded', isFirst ? 'true' : 'false');
        button.setAttribute('tabindex', isFirst ? '0' : '-1');
        if (isFirst) {
          button.classList.add('active');
        }
      });
      this._panes.forEach((pane, index) => {
        const isFirst = index === 0;
        pane.style.display = isFirst ? 'block' : 'none';
        pane.setAttribute('aria-hidden', isFirst ? 'false' : 'true');
      });
    }

    _updateAriaLabels() {
      this._buttons.forEach((button) => {
        const img = button.querySelector('img');
        const label = img?.alt || button.textContent?.trim() || 'Tab';
        button.setAttribute('aria-label', label);
      });
    }

    _disableNestedLinks() {
      this._buttons.forEach((button) => {
        const links = button.querySelectorAll('a:not(.vvjt-button)');
        links.forEach((link) => {
          link.setAttribute(
            'data-original-href',
            link.getAttribute('href') ?? '',
          );
          link.removeAttribute('href');
          link.addEventListener(
            'click',
            (event) => {
              event.preventDefault();
            },
            { signal: this.signal },
          );
        });
      });
    }

    // -----------------------------------------------------------------
    // Click + keyboard.
    // -----------------------------------------------------------------

    _wireClicks() {
      this.addEventListener('click', this._onClick, { signal: this.signal });
    }

    _wireKeyboard() {
      this._buttons.forEach((button, index) => {
        button.addEventListener(
          'keydown',
          (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              button.click();
              return;
            }
            // Only arrow/Home/End navigate; any other key (Tab, letters, …)
            // must be a no-op as in v1. Without this guard the block below
            // re-activates the current tab on every keystroke (focus never
            // moved, so activeElement is still the current button).
            if (
              !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
            ) {
              return;
            }
            // Tabs are horizontally-navigable per ARIA APG (Left/Right
            // arrows even when displayed vertically — this matches v1).
            handleArrowKeyNav(event, this._buttons, index, {
              horizontal: true,
            });
            // After arrow nav, also activate the new button (showTab on
            // focus), per ARIA APG "automatic activation" pattern.
            const focused = document.activeElement;
            if (
              focused instanceof HTMLElement &&
              Array.from(this._buttons).includes(focused)
            ) {
              focused.click();
            }
          },
          { signal: this.signal },
        );
      });
    }

    _onClick = (event) => {
      /** @type {HTMLElement | null} */
      const button = /** @type {HTMLElement} */ (event.target).closest(
        '.vvjt-button',
      );
      if (!button || !this._inner) {
        return;
      }

      // Anchor (deeplink) buttons let the hashchange listener handle
      // activation; click is informational. Otherwise prevent default.
      const deeplinkEnabled = this._inner.dataset.deeplinkEnabled === 'true';
      if (
        !(
          deeplinkEnabled &&
          button.tagName === 'A' &&
          /** @type {HTMLAnchorElement} */ (button).href
        )
      ) {
        event.preventDefault();
      }

      const pane = this._paneForButton(button);
      if (!pane) {
        return;
      }
      this.withTransition(() => this._showTab(button, pane, true));

      if (deeplinkEnabled && this._inner.dataset.deeplinkId) {
        const index = Array.from(this._buttons).indexOf(button) + 1;
        writeDeeplinkHash('tabs', this._inner.dataset.deeplinkId, index);
      }
    };

    /**
     * @param {HTMLElement} activeButton
     * @param {HTMLElement} activePane
     * @param {boolean} moveFocus
     */
    _showTab(activeButton, activePane, moveFocus) {
      this._panes.forEach((pane) => {
        pane.style.display = 'none';
        pane.setAttribute('aria-hidden', 'true');
      });
      this._buttons.forEach((button) => {
        button.classList.remove('active');
        button.setAttribute('tabindex', '-1');
        button.setAttribute('aria-selected', 'false');
        button.setAttribute('aria-expanded', 'false');
      });
      activePane.style.display = 'block';
      activePane.setAttribute('aria-hidden', 'false');
      activeButton.classList.add('active');
      activeButton.setAttribute('tabindex', '0');
      activeButton.setAttribute('aria-selected', 'true');
      activeButton.setAttribute('aria-expanded', 'true');
      if (moveFocus) {
        activeButton.focus();
      }
      // Re-attach Drupal.behaviors on the newly visible pane so nested
      // views, field-group tabs, etc. wake up. Same as v1.
      requestAnimationFrame(() => {
        Drupal.attachBehaviors(activePane, drupalSettings);
      });
      this.emit('tab-shown', { button: activeButton, pane: activePane });
    }

    /**
     * Resolve the pane corresponding to a tab button by matching
     * `vvjt-button-{uid}-{n}` ↔ `vvjt-pane-{uid}-{n}`.
     *
     * @param {HTMLElement} button
     * @return {HTMLElement | null}
     */
    _paneForButton(button) {
      if (!this._inner) {
        return null;
      }
      const idParts = button.id.split('-');
      if (idParts.length < 4) {
        return null;
      }
      // Drop 'vvjt-button-' prefix; rest is `{uid}-{n}`.
      const rawId = idParts.slice(2).join('-');
      return this._inner.querySelector(`#vvjt-pane-${rawId}`);
    }

    // -----------------------------------------------------------------
    // Deep linking.
    // -----------------------------------------------------------------

    _wireDeeplink() {
      if (!this._inner) {
        return;
      }
      const enabled = this._inner.dataset.deeplinkEnabled === 'true';
      const id = this._inner.dataset.deeplinkId;
      if (!enabled || !id) {
        return;
      }
      wireDeeplink(this, 'tabs', id, this.signal, (panelIndex) => {
        const button = this._buttons[panelIndex - 1];
        const pane = button ? this._paneForButton(button) : null;
        if (button && pane) {
          this._showTab(button, pane, false);
        }
      });
    }

    // -----------------------------------------------------------------
    // Public API (backs the Drupal.vvjt.* compat shim).
    // -----------------------------------------------------------------

    /**
     * Activate a tab by its 1-based index.
     *
     * @param {number} tabIndex
     * @return {boolean} True if the tab was activated.
     */
    goToTab(tabIndex) {
      const button = this._buttons[tabIndex - 1];
      const pane = button ? this._paneForButton(button) : null;
      if (!button || !pane) {
        return false;
      }
      this.withTransition(() => this._showTab(button, pane, false));
      if (
        this._inner &&
        this._inner.dataset.deeplinkEnabled === 'true' &&
        this._inner.dataset.deeplinkId
      ) {
        writeDeeplinkHash('tabs', this._inner.dataset.deeplinkId, tabIndex);
      }
      return true;
    }

    /**
     * @return {number|null} 1-based index of the active tab, or null.
     */
    getCurrentTab() {
      for (let i = 0; i < this._buttons.length; i += 1) {
        if (this._buttons[i].getAttribute('aria-selected') === 'true') {
          return i + 1;
        }
      }
      return null;
    }

    /**
     * @return {number} Total number of tabs.
     */
    getTotalTabs() {
      return this._buttons.length;
    }
  }

  if (!customElements.get('vvjt-tabs')) {
    customElements.define('vvjt-tabs', VvjtTabsElement);
  }
})(Drupal);
