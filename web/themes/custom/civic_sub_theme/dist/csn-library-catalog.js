(function (Drupal, once) {
  Drupal.behaviors.csnLibraryCatalog = {
    attach(context) {
      once('csn-library-catalog', '[data-csn-library-tabs]', context).forEach((root) => {
        const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
        const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));
        const tabList = root.querySelector('[role="tablist"]');
        const catalogLayout = root.closest('.layout--twocol-section');

        if (catalogLayout) {
          catalogLayout.classList.add('layout--catalog-responsive');
        }

        const categoryDropdown = document.createElement('div');
        categoryDropdown.className = 'csn-library-catalog__dropdown';

        const categoryTrigger = document.createElement('button');
        categoryTrigger.className = 'csn-library-catalog__select';
        categoryTrigger.type = 'button';
        categoryTrigger.setAttribute('aria-haspopup', 'listbox');
        categoryTrigger.setAttribute('aria-expanded', 'false');
        categoryTrigger.setAttribute('aria-label', 'Catalog category');

        const selectedIcon = document.createElement('span');
        selectedIcon.className = 'csn-library-catalog__select-icon';
        selectedIcon.setAttribute('aria-hidden', 'true');
        const selectedLabel = document.createElement('span');
        selectedLabel.className = 'csn-library-catalog__select-label';
        const selectChevron = document.createElement('span');
        selectChevron.className = 'csn-library-catalog__select-chevron';
        selectChevron.setAttribute('aria-hidden', 'true');
        categoryTrigger.append(selectedIcon, selectedLabel, selectChevron);

        const categoryOptions = document.createElement('div');
        categoryOptions.className = 'csn-library-catalog__options';
        categoryOptions.id = `${root.id || tabs[0]?.getAttribute('aria-controls') || 'csn-library-catalog'}-category-options`;
        categoryOptions.setAttribute('role', 'listbox');
        categoryOptions.setAttribute('aria-label', 'Catalog categories');
        categoryOptions.hidden = true;
        categoryTrigger.setAttribute('aria-controls', categoryOptions.id);

        const optionButtons = tabs.map((tab, index) => {
          const option = document.createElement('button');
          option.className = 'csn-library-catalog__option';
          option.type = 'button';
          option.id = `${categoryOptions.id}-${index}`;
          option.setAttribute('role', 'option');
          option.setAttribute('aria-selected', 'false');
          option.tabIndex = -1;

          const icon = tab.querySelector('.csn-library-catalog__tab-icon');
          if (icon) {
            const optionIcon = icon.cloneNode(true);
            optionIcon.setAttribute('aria-hidden', 'true');
            option.append(optionIcon);
          }

          const label = document.createElement('span');
          label.textContent = tab.textContent.trim();
          option.append(label);
          categoryOptions.append(option);

          option.addEventListener('click', () => {
            activateTab(tab);
            closeDropdown(true);
          });
          option.addEventListener('keydown', (event) => {
            const optionIndex = optionButtons.indexOf(option);
            const nextIndex = event.key === 'ArrowDown' ? (optionIndex + 1) % optionButtons.length
              : event.key === 'ArrowUp' ? (optionIndex - 1 + optionButtons.length) % optionButtons.length
              : event.key === 'Home' ? 0
              : event.key === 'End' ? optionButtons.length - 1
              : -1;

            if (nextIndex >= 0) {
              event.preventDefault();
              optionButtons[nextIndex].focus();
            } else if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              activateTab(tabs[optionIndex]);
              closeDropdown(true);
            } else if (event.key === 'Escape') {
              event.preventDefault();
              closeDropdown(true);
            } else if (event.key === 'Tab') {
              closeDropdown();
            }
          });
          return option;
        });

        categoryDropdown.append(categoryTrigger, categoryOptions);
        tabList?.after(categoryDropdown);

        function closeDropdown(returnFocus = false) {
          categoryTrigger.setAttribute('aria-expanded', 'false');
          categoryOptions.hidden = true;
          if (returnFocus) {
            categoryTrigger.focus();
          }
        }

        function openDropdown(focusLast = false) {
          categoryTrigger.setAttribute('aria-expanded', 'true');
          categoryOptions.hidden = false;
          const selectedIndex = optionButtons.findIndex((option) => option.getAttribute('aria-selected') === 'true');
          optionButtons[focusLast ? optionButtons.length - 1 : Math.max(selectedIndex, 0)]?.focus();
        }

        function updateDropdown(tab) {
          selectedLabel.textContent = tab.textContent.trim();
          selectedIcon.replaceChildren();
          const icon = tab.querySelector('.csn-library-catalog__tab-icon');
          if (icon) {
            const selectedTabIcon = icon.cloneNode(true);
            selectedTabIcon.setAttribute('aria-hidden', 'true');
            selectedIcon.append(selectedTabIcon);
          }

          tabs.forEach((item, index) => {
            optionButtons[index].setAttribute('aria-selected', String(item === tab));
          });
        }

        tabs.forEach((tab) => {
          if (tab.getAttribute('aria-selected') === 'true') {
            updateDropdown(tab);
          }
        });

        categoryTrigger.addEventListener('click', () => {
          if (categoryTrigger.getAttribute('aria-expanded') === 'true') {
            closeDropdown();
          } else {
            openDropdown();
          }
        });
        categoryTrigger.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openDropdown();
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            openDropdown(true);
          }
        });
        document.addEventListener('click', (event) => {
          if (!categoryDropdown.contains(event.target)) {
            closeDropdown();
          }
        });

        function activateTab(tab, moveFocus = false) {
          tabs.forEach((item) => {
            const selected = item === tab;
            item.setAttribute('aria-selected', String(selected));
            item.tabIndex = selected ? 0 : -1;
          });

          updateDropdown(tab);
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
