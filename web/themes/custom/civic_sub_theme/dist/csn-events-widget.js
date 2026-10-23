(function (Drupal, once) {
  const LIBCAL_WIDGET_URL = 'https://csn.libcal.com/widgets/direct/b83ceb2c8fe7';
  const CALENDAR_URL = 'https://csn.libcal.com/calendar/';
  const FETCH_TIMEOUT_MS = 8000;
  const IFRAME_TIMEOUT_MS = 12000;

  function readText(node) {
    if (!node) {
      return '';
    }

    const cleanNode = node.cloneNode(true);
    cleanNode.querySelectorAll('.sr-only, .visually-hidden, .s-lc-w-sr-only, [aria-hidden="true"]').forEach((element) => {
      element.remove();
    });

    return cleanNode.textContent.replace(/\s+/g, ' ').trim();
  }

  function safeUrl(value, fallback) {
    try {
      const url = new URL(value, LIBCAL_WIDGET_URL);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : fallback;
    } catch {
      return fallback;
    }
  }

  function parseLibCalEvents(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const rows = [...doc.querySelectorAll('tr.s-lc-w-dtr')];

    return rows.map((row) => {
      const title = row.querySelector('.s-lc-w-title a') || row.querySelector('.s-lc-w-title');
      const detailLink = row.querySelector('a[href*="/event/"]');
      const calendarLink = row.querySelector('a[href*="/calendar/"]');

      return {
        month: readText(row.querySelector('.s-lc-w-date-m')),
        day: readText(row.querySelector('.s-lc-w-date-d')),
        time: readText(row.querySelector('.s-lc-w-date-t')),
        title: readText(title) || 'Upcoming event',
        meta: readText(row.querySelector('.s-lc-w-loc')),
        detailsUrl: safeUrl(detailLink?.getAttribute('href'), CALENDAR_URL),
        calendarUrl: safeUrl(calendarLink?.getAttribute('href'), CALENDAR_URL),
      };
    });
  }

  function createLink(label, url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    return link;
  }

  function renderEvents(listElement, events) {
    listElement.replaceChildren();
    listElement.setAttribute('aria-busy', 'false');

    events.forEach((event) => {
      const item = document.createElement('article');
      item.className = 'events-list__item';

      const date = document.createElement('div');
      date.className = 'event-date';
      date.setAttribute('aria-label', `${event.month} ${event.day} at ${event.time}`.trim());

      const month = document.createElement('span');
      month.className = 'event-date__month';
      month.textContent = event.month;

      const day = document.createElement('span');
      day.className = 'event-date__day';
      day.textContent = event.day;

      const time = document.createElement('span');
      time.className = 'event-date__time';
      time.textContent = event.time;
      date.append(month, day, time);

      const details = document.createElement('div');
      details.className = 'event-details';

      const heading = document.createElement('h3');
      heading.className = 'event-details__title';
      heading.append(createLink(event.title, event.detailsUrl));
      details.append(heading);

      if (event.meta) {
        const meta = document.createElement('p');
        meta.className = 'event-details__meta';
        meta.textContent = event.meta;
        details.append(meta);
      }

      const actions = document.createElement('div');
      actions.className = 'event-actions';
      actions.setAttribute('aria-label', `Actions for ${event.title}`);
      actions.append(
        createLink('View Details', event.detailsUrl),
        createLink('View Calendar', event.calendarUrl),
      );

      item.append(date, details, actions);
      listElement.append(item);
    });
  }

  function renderFallbackIframe(listElement) {
    listElement.replaceChildren();
    listElement.setAttribute('aria-busy', 'true');

    const iframe = document.createElement('iframe');
    iframe.src = LIBCAL_WIDGET_URL;
    iframe.title = 'CSN Library Events';
    iframe.loading = 'lazy';
    iframe.className = 'libcal-events-frame';
    listElement.append(iframe);

    const timeoutId = window.setTimeout(() => {
      const status = document.createElement('p');
      status.className = 'events-widget__status';
      status.textContent = 'Events are temporarily unavailable.';
      listElement.replaceChildren(status);
      listElement.setAttribute('aria-busy', 'false');
    }, IFRAME_TIMEOUT_MS);

    iframe.addEventListener('load', () => {
      window.clearTimeout(timeoutId);
      listElement.setAttribute('aria-busy', 'false');
    }, { once: true });

    iframe.addEventListener('error', () => {
      window.clearTimeout(timeoutId);
      const status = document.createElement('p');
      status.className = 'events-widget__status';
      status.textContent = 'Events are temporarily unavailable.';
      listElement.replaceChildren(status);
      listElement.setAttribute('aria-busy', 'false');
    }, { once: true });
  }

  function createWidget(widget) {
    const listElement = widget.querySelector('[data-events-list]');

    if (!listElement) {
      return;
    }

    async function loadEvents() {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      try {
        const response = await fetch(Drupal.url('csn-events-widget/feed'), {
          headers: { Accept: 'text/html' },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to load LibCal events: ${response.status}`);
        }

        const events = parseLibCalEvents(await response.text());

        if (!events.length) {
          throw new Error('No events found in LibCal response.');
        }

        renderEvents(listElement, events);
      } catch (error) {
        console.warn('Could not load parsed LibCal events; using the iframe fallback.', error);
        renderFallbackIframe(listElement);
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadEvents();
  }

  Drupal.behaviors.csnEventsWidget = {
    attach(context) {
      if (/\/layout(?:\/|$)/.test(window.location.pathname)) {
        return;
      }

      once('csn-events-widget', '[data-csn-events-widget]', context).forEach(createWidget);
    },
  };
})(Drupal, once);