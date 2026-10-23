(function (Drupal, once) {
  // LibCal endpoint that returns the accessible hours HTML for a selected date.
  const HOURS_ENDPOINT = 'https://csn.libcal.com/widget/hours/today/accessible/content';

  // Strip repeated whitespace so the text extracted from LibCal is easier to compare and render.
  function normalizeWhitespace(text) {
    return text.replace(/\s+/g, ' ').trim();
  }

  // Convert the raw HTML from LibCal into a clean list of campus names, URLs, and hour strings.
  function parseHoursText(rawText) {
    const doc = new DOMParser().parseFromString(rawText, 'text/html');
    const rows = [...doc.querySelectorAll('tr.s-lc-w-hours-row')];

    const locations = rows.map((row) => {
      const nameCell = row.querySelector('.s-lc-w-hours-name');
      const timeCell = row.querySelector('.s-lc-w-hours-time');
      const link = nameCell?.querySelector('a');
      const cleanName = link ? link.cloneNode(true) : nameCell?.cloneNode(true);

      cleanName?.querySelectorAll('.sr-only, .visually-hidden, .s-lc-w-sr-only, .fa, .fa-external-link, [aria-hidden="true"]').forEach((element) => {
        element.remove();
      });

      return {
        name: cleanName?.textContent ? normalizeWhitespace(cleanName.textContent) : 'Campus',
        href: link?.getAttribute('href') || '#',
        hours: timeCell?.textContent ? normalizeWhitespace(timeCell.textContent) : 'Hours unavailable',
      };
    });

    return {
      dateLabel: doc.querySelector('.s-lc-w-hours-title-date')?.textContent
        ? normalizeWhitespace(doc.querySelector('.s-lc-w-hours-title-date').textContent)
        : '',
      locations,
    };
  }

  // Convert a 12-hour value like 9:00am into minutes so the current time can be compared reliably.
  function parseTime(time, period) {
    const [hoursText, minutesText] = time.split(':');
    let hours = Number(hoursText);
    const minutes = Number(minutesText || 0);
    const normalizedPeriod = period.toLowerCase();

    if (normalizedPeriod === 'pm' && hours !== 12) {
      hours += 12;
    }

    if (normalizedPeriod === 'am' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  }

  // Check whether the current time falls within the displayed open/close range for a campus.
  function isLocationOpen(hoursText) {
    const match = hoursText.match(/(\d{1,2}:\d{2})(am|pm)\s*[-–]\s*(\d{1,2}:\d{2})(am|pm)/i);
    if (!match) {
      return false;
    }

    const [, openTime, openPeriod, closeTime, closePeriod] = match;
    const currentTime = new Date();
    const nowInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    return nowInMinutes >= parseTime(openTime, openPeriod) && nowInMinutes <= parseTime(closeTime, closePeriod);
  }

  // Format a native JS date into the YYYY-MM-DD format expected by the API.
  function formatDateInput(date) {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  }

  // Build the widget UI for each matching Drupal block and wire up its controls.
  function createWidget(widget) {
    const dateElement = widget.querySelector('[data-hours-date]');
    const listElement = widget.querySelector('[data-hours-list]');
    const todayButton = widget.querySelector('[data-hours-today]');
    const nextDayButton = widget.querySelector('[data-hours-next-day]');
    let activeDate = new Date();

    function renderLocations(locations) {
      listElement.replaceChildren();

      locations.forEach((location) => {
        const isOpen = isLocationOpen(location.hours);
        const status = isOpen ? 'OPEN' : 'CLOSED';
        const item = document.createElement('li');
        item.className = 'hours-list__item';

        const badge = document.createElement('span');
        badge.className = `hours-badge hours-badge--${isOpen ? 'open' : 'closed'}`;
        badge.setAttribute('aria-label', status);
        badge.textContent = status;

        const campus = document.createElement('div');
        campus.className = 'hours-campus';
        const link = document.createElement('a');
        link.href = location.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = location.name;
        campus.append(link);

        const time = document.createElement('div');
        time.className = 'hours-time';
        time.setAttribute('aria-label', `Hours for ${location.name}: ${location.hours}`);
        time.textContent = location.hours;

        item.append(badge, campus, time);
        listElement.append(item);
      });
    }

    // Fetch the selected date and update the date label plus list of campus statuses.
    async function loadHours(date = activeDate) {
      try {
        const response = await fetch(`${HOURS_ENDPOINT}?date=${formatDateInput(date)}`, {
          headers: { Accept: 'text/html' },
        });

        if (!response.ok) {
          throw new Error(`Failed to load hours: ${response.status}`);
        }

        const payload = parseHoursText(await response.text());
        activeDate = date;
        dateElement.textContent = payload.dateLabel;
        renderLocations(payload.locations);
      } catch (error) {
        console.error('Hours widget error:', error);
        listElement.replaceChildren();
        const message = document.createElement('li');
        message.className = 'hours-list__item';
        message.textContent = 'Hours are temporarily unavailable.';
        listElement.append(message);
      }
    }

    todayButton.addEventListener('click', () => loadHours(new Date()));
    nextDayButton.addEventListener('click', () => {
      const nextDate = new Date(activeDate);
      nextDate.setDate(nextDate.getDate() + 1);
      loadHours(nextDate);
    });

    loadHours();
  }

  Drupal.behaviors.csnHoursWidget = {
    attach(context) {
      once('csn-hours-widget', '[data-hours-widget]', context).forEach(createWidget);
    },
  };
})(Drupal, once);