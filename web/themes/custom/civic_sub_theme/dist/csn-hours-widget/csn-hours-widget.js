(function (Drupal, once) {
  // LibCal endpoint that returns the accessible hours HTML for a selected date.
  const HOURS_ENDPOINT = 'https://csn.libcal.com/widget/hours/today/accessible/content';
  const CAMPUS_URLS = [
    { name: 'charleston', href: '/locations/charleston' },
    { name: 'north las vegas', href: '/locations/nlv' },
    { name: 'henderson', href: '/locations/henderson' },
  ];
  const LIBRARY_TIME = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

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

      const name = cleanName?.textContent ? normalizeWhitespace(cleanName.textContent) : 'Campus';
      const campusUrl = CAMPUS_URLS.find((campus) => name.toLowerCase().includes(campus.name))?.href;

      return {
        name,
        href: campusUrl || link?.getAttribute('href') || '#',
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

  function getLibraryTime() {
    const parts = Object.fromEntries(LIBRARY_TIME.formatToParts(new Date()).map(({ type, value }) => [type, value]));
    return {
      date: new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day), 12),
      minutes: Number(parts.hour) * 60 + Number(parts.minute),
    };
  }

  // Return null when the displayed hours do not establish an open or closed status.
  function isLocationOpen(hoursText, nowInMinutes) {
    if (/^closed\b/i.test(hoursText)) {
      return false;
    }

    const ranges = [...hoursText.matchAll(/(\d{1,2}:\d{2})\s*(am|pm)\s*[-–]\s*(\d{1,2}:\d{2})\s*(am|pm)/gi)];
    if (!ranges.length) {
      return null;
    }

    return ranges.some(([, openTime, openPeriod, closeTime, closePeriod]) => {
      const opens = parseTime(openTime, openPeriod);
      const closes = parseTime(closeTime, closePeriod);
      return nowInMinutes >= opens && nowInMinutes < closes;
    });
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
    let activeDate = getLibraryTime().date;
    let requestId = 0;

    [
      { button: todayButton, label: 'Today' },
      { button: nextDayButton, label: 'Next Day' },
    ].forEach(({ button, label }) => {
      if (!button) {
        return;
      }

      button.setAttribute('aria-label', label);
      button.textContent = label;
    });

    const pairedLayout = widget.closest('.layout--twocol-section');
    const catalog = pairedLayout?.querySelector('.csn-library-catalog');
    const region = widget.closest('.layout__region');
    const catalogRegion = catalog?.closest('.layout__region');
    if (region?.parentElement === pairedLayout && catalogRegion?.parentElement === pairedLayout && region !== catalogRegion) {
      pairedLayout.classList.add('layout--hours-catalog');
      [widget, catalog].forEach((card) => {
        for (let ancestor = card.parentElement; ancestor && ancestor !== pairedLayout; ancestor = ancestor.parentElement) {
          ancestor.classList.add('hours-catalog-stretch');
        }
      });
    }

    function updateStatuses() {
      const now = getLibraryTime();
      const isToday = formatDateInput(activeDate) === formatDateInput(now.date);
      listElement.querySelectorAll('[data-hours-status]').forEach((badge) => {
        let isOpen;
        if (isToday) {
          isOpen = isLocationOpen(badge.dataset.hoursStatus, now.minutes);
        } else {
          isOpen = false;
        }
        const status = isOpen === null ? '' : isOpen ? 'OPEN' : 'CLOSED';
        badge.hidden = false;
        badge.className = `hours-badge${status ? ` hours-badge--${isOpen ? 'open' : 'closed'}` : ''}`;
        badge.setAttribute('aria-label', status);
        badge.textContent = status;
        badge.closest('.hours-list__item').classList.toggle('hours-list__item--no-status', false);
      });
    }

    function renderLocations(locations) {
      listElement.replaceChildren();

      locations.forEach((location) => {
        const item = document.createElement('li');
        item.className = 'hours-list__item';

        const badge = document.createElement('span');
        badge.dataset.hoursStatus = location.hours;

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
      updateStatuses();
    }

    // Fetch the selected date and update the date label plus list of campus statuses.
    async function loadHours(date = activeDate) {
      const currentRequest = ++requestId;
      try {
        const response = await fetch(`${HOURS_ENDPOINT}?date=${formatDateInput(date)}`, {
          headers: { Accept: 'text/html' },
        });

        if (!response.ok) {
          throw new Error(`Failed to load hours: ${response.status}`);
        }

        const payload = parseHoursText(await response.text());
        if (currentRequest !== requestId) {
          return;
        }
        activeDate = date;
        dateElement.textContent = payload.dateLabel;
        renderLocations(payload.locations);
      } catch (error) {
        if (currentRequest !== requestId) {
          return;
        }
        console.error('Hours widget error:', error);
        listElement.replaceChildren();
        const message = document.createElement('li');
        message.className = 'hours-list__item';
        message.textContent = 'Hours are temporarily unavailable.';
        listElement.append(message);
      }
    }

    todayButton.addEventListener('click', () => loadHours(getLibraryTime().date));
    nextDayButton.addEventListener('click', () => {
      const nextDate = new Date(activeDate);
      nextDate.setDate(nextDate.getDate() + 1);
      loadHours(nextDate);
    });

    loadHours();

    function scheduleStatusUpdate() {
      setTimeout(() => {
        if (widget.isConnected) {
          updateStatuses();
          scheduleStatusUpdate();
        }
      }, 60000 - Date.now() % 60000);
    }
    scheduleStatusUpdate();
  }

  Drupal.behaviors.csnHoursWidget = {
    attach(context) {
      once('csn-hours-widget', '[data-hours-widget]', context).forEach(createWidget);
    },
  };
})(Drupal, once);