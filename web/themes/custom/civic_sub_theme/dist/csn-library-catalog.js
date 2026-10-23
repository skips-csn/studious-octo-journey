(function (Drupal, once) {
  Drupal.behaviors.csnLibraryCatalog = {
    attach(context) {
      once('csn-library-catalog', '[data-csn-library-tabs]', context).forEach((root) => {
        const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
        const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));

        function activateTab(tab, moveFocus = false) {
          tabs.forEach((item) => {
            const selected = item === tab;
            item.setAttribute('aria-selected', String(selected));
            item.tabIndex = selected ? 0 : -1;
          });

          panels.forEach((panel) => {
            panel.hidden = panel.id !== tab.getAttribute('aria-controls');
          });

          if (moveFocus) {
            tab.focus();
          }
        }

        tabs.forEach((tab, index) => {
          tab.addEventListener('click', () => activateTab(tab));
          tab.addEventListener('keydown', (event) => {
            const nextIndex = event.key === 'ArrowRight' ? (index + 1) % tabs.length
              : event.key === 'ArrowLeft' ? (index - 1 + tabs.length) % tabs.length
              : event.key === 'Home' ? 0
              : event.key === 'End' ? tabs.length - 1
              : -1;

            if (nextIndex >= 0) {
              event.preventDefault();
              activateTab(tabs[nextIndex], true);
            }
          });
        });

        root.querySelectorAll('[data-primo-search]').forEach((form) => {
          form.addEventListener('submit', () => {
            const searchText = form.querySelector('[data-primo-query-input]').value.trim();
            form.querySelector('[data-primo-query]').value = `any,contains,${searchText}`;
          });
        });
      });
    }
  };
})(Drupal, once);
