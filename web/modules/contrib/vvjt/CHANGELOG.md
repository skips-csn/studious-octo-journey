# Changelog

## [2.0.0] — UNRELEASED

**Drop-in upgrade for 1.x sites.** v2 modernizes internals — extends `vvj_core`
foundation, ships `<vvjt-tabs>` custom element extending `VvjElementBase`, W3C
ARIA APG keyboard navigation, View Transitions wrapping tab swaps — while
preserving every CSS rule, library name (incl. all 5 breakpoint libraries +
horizontal/vertical/style/admin), option key, plugin ID, theme hook, JS behavior
key from 1.x.

### Added

- `drupal/vvj_core` dependency.
- `<vvjt-tabs>` custom element. Lazy IntersectionObserver hydration;
  AbortController-tracked listeners; ARIA APG tab pattern conformance;
  `Drupal.attachBehaviors()` re-attached on the newly-visible pane (preserves
  nested-views + field-group fix from v1).

### Changed

- Plugin extends `VvjStylePluginBase`. `buildLibraryList()` overridden to add
  `vvjt-horizontal` / `vvjt-vertical` + `vvjt__BP` breakpoint variant
  conditionally, same as v1.
- Token resolution delegates to `vvj_core.token_resolver`.
- Hooks moved to OOP `#[Hook]` classes.

### Fixed

- Update 10002 converts v1 views to the v2 option shape (value types:
  strings and integers stored where v2 declares integer, boolean and float).
- Non-navigation keys (Tab, Shift+Tab, letters) on a focused tab button are no-
  ops again (v1 behavior). A missing guard in the custom element re-activated
  the current tab on every keystroke — causing a transition flash, focus
  fighting the browser's Tab, and (for deep-link tabs) a spurious URL-hash
  change.
- Restored the public `Drupal.vvjt.*` JS API (`getInstance`, `goToTab`,
  `getCurrentTab`, `getTotalTabs`) that the v2 rewrite had dropped — now
  delegating to methods on `<vvjt-tabs>`.
- Deep-link identifier reserved words back to the tab-specific list (`tabs`,
  `tab`, `vvjt`, `vvj`) so identifiers can no longer collide with the
  `#tabs-<id>-<n>` fragment scheme (was wrongly using the base's accordion
  list).
- Deep-link "URL Identifier" field show/hide + required toggle now works (fixed
  in `vvj_core` base — the toggle attributes are slug-derived).
- Removed the phantom "Active on all screens" (`all`) option from the responsive
  breakpoint select (PHP array-union bug leaked the base registry list; v1
  offered exactly 576/768/992/1200/1400).

### Drupal core / PHP

- Requires Drupal `^11.3 || ^12`, PHP `>=8.3`.
