# Views Vanilla JavaScript Tabs (VVJT)

A vanilla-JavaScript tab group **Views format** for Drupal 11.3+ / 12. Renders
Views rows as a tabbed interface — top, bottom, left, or right placement — with
W3C ARIA APG keyboard navigation, animation presets, configurable backgrounds,
deep-linking, and responsive vertical-to-horizontal collapse.

v2.0 builds on the **`drupal/vvj_core` foundation** (composer auto-installs it).
Behavior runs in a `<vvjt-tabs>` custom element extending `VvjElementBase`.

## Features

- Four position options: top / right / bottom / left
- Wrap-when-exceeded vs auto-scroll for tabs
- Configurable max width / max height
- Seven animation presets (none / fade / zoom / 4 slide directions / opacity)
- Configurable button + pane background colors (with disable toggle)
- Vertical-tabs collapse breakpoint (576 / 768 / 992 / 1200 / 1400 px)
- Optional CSS library
- W3C ARIA APG tab pattern: ArrowLeft/ArrowRight, Home, End, Enter/Space —
  automatic activation on arrow key
- Deep linking — shareable URL fragments per tab (`#tabs-products-3`)
- `[vvjt:field]` and `[vvjt:field:plain]` Views tokens for the **first row** in
  header/footer/empty text when *Use replacement tokens from the first row* is
  enabled
- Lazy IntersectionObserver hydration
- AbortController-tracked listeners
- View Transitions wrapping tab swaps (graceful fallback)
- Re-attaches Drupal.behaviors on newly-visible pane — keeps nested views /
  field-group tabs working
- **Drupal admin help** — `/admin/help/vvjt`

## Token Support in Views Text Areas

In Views headers, footers, or empty text with *Use replacement tokens from the
first row*, default Twig tokens (`{{ title }}`) do not work. Use VVJT tokens
instead:

- `{{ title }}` → `[vvjt:title]`
- `{{ field_image }}` → `[vvjt:field_image]`
- Append `:plain` for plain text: `[vvjt:title:plain]`

v2 resolves tokens through the shared `vvj_core.token_resolver` service; syntax
is unchanged from v1. Tokens read from the **first row** of rendered View
fields. Complex field rewrites are not supported.

## Installation

```bash
composer require drupal/vvjt:^2.0
drush en vvjt
```

## Usage

1. Create or edit a View.
2. Set **Format** to *Views Vanilla JavaScript Tabs*.
3. Set **Show** to *Fields*.
4. The first field becomes the tab button; remaining fields render in the tab
   pane.
5. Configure layout / animation / styling / responsive in the format settings.
6. Save.

**Sample view:** Optional config `views.view.vvjt_example` (`config/optional/`)
installs when there is no ID conflict.

## Public API

External code can drive tab groups via `Drupal.vvjt.*`. Pass the deep link
identifier, a CSS selector, or an element reference:

```js
Drupal.vvjt.goToTab('features', 3);
Drupal.vvjt.getCurrentTab('features');
Drupal.vvjt.getTotalTabs('features');
Drupal.vvjt.getInstance('#vvjt-12345');        // → <vvjt-tabs> element
Drupal.vvjt.getAllInstances();
```

## Drop-in upgrade from 1.x

`composer update drupal/vvjt && drush cache:rebuild` is sufficient. v2
preserves:

- Plugin ID `views_vvjt`, theme hook `views_view_vvjt`
- Twig template names
- All option keys
- Library names (`vvjt`, `vvjt-style`, `vvjt-horizontal`, `vvjt-vertical`,
  `vvjt-admin`, `vvjt__576/768/992/1200/1400`)
- JS behavior key `Drupal.behaviors.VVJTabs`
- CSS class names

Outer rendered tag changed from `<div>` to `<vvjt-tabs>`. Theme selectors
targeting `.vvjt` keep matching.

## Running the tests

This module ships no `phpunit.xml` of its own, deliberately: its suites are
Kernel, Functional and FunctionalJavascript, which need a real Drupal, so a
module-local config would have to hard-code a relative path to `core` and would
break the moment the module is not physically inside a docroot (a symlinked
checkout, for instance). Drupal core's runner already does the job.

Run the fast suites from the docroot:

```bash
cd /path/to/drupal/web
export SIMPLETEST_DB="mysql://user:pass@localhost/dbname"
../vendor/bin/phpunit -c core modules/contrib/vvjt/tests/src/Unit
../vendor/bin/phpunit -c core modules/contrib/vvjt/tests/src/Kernel
```

The **Functional** and **FunctionalJavascript** suites additionally need
`SIMPLETEST_BASE_URL` pointing at a running web server, and the JavaScript ones
need chromedriver. Without those they error rather than fail, and the errors
name missing infrastructure rather than anything about this module — so don't
read them as test failures. The drupal.org pipeline provides both.

## License

GPL-2.0-or-later.
