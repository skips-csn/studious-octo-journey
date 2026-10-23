/**
 * @file
 * VVJT compat shim. Behavior lives in `<vvjt-tabs>` custom element.
 *
 * @license SPDX-License-Identifier: GPL-2.0-or-later
 */

// phpcs:disable Drupal.NamingConventions.UpperCaseConstant
// phpcs:disable Generic.PHP.UpperCaseConstant
// phpcs:disable Squiz.WhiteSpace.OperatorSpacing

((Drupal, once) => {
  Drupal.behaviors.VVJTabs = {
    attach(context) {
      once('vvjt-tabs-marker', 'vvjt-tabs', context);
    },
    detach() {},
  };

  /**
   * Resolve a deeplink-id, CSS selector, or DOM node to the matching
   * `<vvjt-tabs>` custom element.
   *
   * @param {string|Element} identifier
   *   A deeplink-id (e.g. `'features'`), a CSS selector, or an element.
   * @return {Element|null}
   *   The matched `<vvjt-tabs>` element, or null.
   */
  function getElement(identifier) {
    if (identifier instanceof Element) {
      return identifier.closest('vvjt-tabs');
    }
    if (typeof identifier !== 'string') {
      return null;
    }
    let el = document.querySelector(
      `vvjt-tabs .vvjt-inner[data-deeplink-id="${identifier}"]`,
    );
    if (el) {
      return el.closest('vvjt-tabs');
    }
    el = document.querySelector(identifier);
    if (el) {
      return el.closest('vvjt-tabs') || el;
    }
    return null;
  }

  Drupal.vvjt = Drupal.vvjt || {};

  Drupal.vvjt.getInstance = (containerOrSelector) =>
    getElement(containerOrSelector);

  Drupal.vvjt.getAllInstances = () =>
    Array.from(document.querySelectorAll('vvjt-tabs'));

  Drupal.vvjt.goToTab = (identifier, tabIndex) => {
    const el = getElement(identifier);
    if (!el || typeof el.goToTab !== 'function') {
      console.warn(`VVJT: Tabs "${identifier}" not found or not yet hydrated`);
      return false;
    }
    return el.goToTab(tabIndex);
  };

  Drupal.vvjt.getCurrentTab = (identifier) => {
    const el = getElement(identifier);
    if (!el || typeof el.getCurrentTab !== 'function') {
      return null;
    }
    return el.getCurrentTab();
  };

  Drupal.vvjt.getTotalTabs = (identifier) => {
    const el = getElement(identifier);
    if (!el || typeof el.getTotalTabs !== 'function') {
      return null;
    }
    return el.getTotalTabs();
  };
})(Drupal, once);
