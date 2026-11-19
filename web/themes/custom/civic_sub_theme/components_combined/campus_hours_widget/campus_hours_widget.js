(() => {
  const HOURS_ENDPOINT =
    'https://csn.libcal.com/widget/hours/today/accessible/content';
  const initializedWidgets = new WeakSet();

  function normalizeWhitespace(text) {
    return text.replace(/\s+/g, ' ').trim();
  }

  function formatDate(date) {
    return [
      date.getUTCFullYear(),
      String(date.getUTCMonth() + 1).padStart(2, '0'),
      String(date.getUTCDate()).padStart(2, '0'),
    ].join('-');
  }

  function getNextDate(date) {
    const [year, month, day] = date.split('-').map(Number);
    return formatDate(new Date(Date.UTC(year, month - 1, day + 1)));
  }

  function createWidget(widget) {
    if (initializedWidgets.has(widget)) {
      return;
    }
    initializedWidgets.add(widget);

    const locationId = widget.dataset.locationId;
    const campusName = widget.dataset.campusName;
    const dateElement = widget.querySelector('[data-hours-date]');
    const listElement = widget.querySelector('[data-hours-list]');
    const todayButton = widget.querySelector('[data-hours-today]');
    const nextDayButton = widget.querySelector('[data-hours-next-day]');
    let activeDate;

    function showMessage(message) {
      listElement.replaceChildren();
      const item = document.createElement('li');
      item.className = 'csn-hours-card__message';
      item.append(document.createTextNode(message));
      listElement.append(item);
    }

    async function loadHours(date) {
      todayButton.disabled = true;
      nextDayButton.disabled = true;

      try {
        const requestUrl = new URL(HOURS_ENDPOINT);
        requestUrl.search = new URLSearchParams({
          iid: '1721',
          lid: locationId,
          sublid: '',
          showParentLocation: '1',
          departmentMode: '1',
          showViewAllLink: '0',
          showFootnotes: '0',
          showHeading: '0',
          showDayNav: '0',
        });
        if (date) {
          requestUrl.searchParams.set('date', date);
        }

        const response = await fetch(requestUrl, {
          headers: { Accept: 'text/html' },
        });
        if (!response.ok) {
          throw new Error(`LibCal returned ${response.status}`);
        }

        const content = new DOMParser().parseFromString(
          await response.text(),
          'text/html',
        );
        const dateElementFromLibCal = content.querySelector('[data-date]');
        const row = content.querySelector('tbody tr.s-lc-w-hours-row');
        const timeElement = row?.querySelector('.s-lc-w-hours-time');
        const returnedDate = dateElementFromLibCal?.dataset.date;

        if (!returnedDate || !row || !timeElement) {
          throw new Error(`No hours were returned for ${campusName}`);
        }

        activeDate = returnedDate;
        dateElement.textContent = normalizeWhitespace(
          dateElementFromLibCal.textContent,
        );
        nextDayButton.setAttribute(
          'aria-label',
          `Next day: ${new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
            timeZone: 'UTC',
          }).format(new Date(`${getNextDate(activeDate)}T00:00:00Z`))}`,
        );

        const item = document.createElement('li');
        item.className = 'csn-hours-card__row';
        const hours = document.createElement('span');
        hours.className = 'csn-hours-card__time';
        hours.textContent = normalizeWhitespace(timeElement.textContent);

        item.append(hours);
        listElement.replaceChildren(item);
      } catch (error) {
        console.error('Unable to load campus library hours.', error);
        showMessage('Hours are temporarily unavailable.');
      } finally {
        todayButton.disabled = false;
        nextDayButton.disabled = !activeDate;
      }
    }

    todayButton.addEventListener('click', () => loadHours());
    nextDayButton.addEventListener('click', () => {
      if (activeDate) {
        loadHours(getNextDate(activeDate));
      }
    });

    loadHours();
  }

  function attach(context = document) {
    const widgets = [];
    if (context.matches?.('[data-csn-hours-widget]')) {
      widgets.push(context);
    }
    widgets.push(...context.querySelectorAll('[data-csn-hours-widget]'));
    widgets.forEach(createWidget);
  }

  if (window.Drupal?.behaviors) {
    window.Drupal.behaviors.csnLibraryHours = {
      attach,
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => attach());
  } else {
    attach();
  }
})();
