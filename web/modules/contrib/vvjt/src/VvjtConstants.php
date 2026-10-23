<?php

declare(strict_types=1);

namespace Drupal\vvjt;

/**
 * Vvjt-specific constants — tabs's pattern-only values.
 *
 * Cross-cutting constants live in vvj_core's `ValidationBounds`.
 *
 * @internal Final, non-instantiable.
 */
final class VvjtConstants {

  /**
   * Tab position values.
   */
  public const string POSITION_TOP = 'top';
  public const string POSITION_RIGHT = 'right';
  public const string POSITION_BOTTOM = 'bottom';
  public const string POSITION_LEFT = 'left';
  public const string DEFAULT_POSITION = self::POSITION_TOP;

  /**
   * Animation defaults (tabs include `a-opacity` not in the shared set).
   */
  public const string DEFAULT_ANIMATION = 'a-bottom';

  /**
   * Layout defaults.
   */
  public const int DEFAULT_MAX_WIDTH = 300;
  public const int DEFAULT_MAX_HEIGHT = 0;
  public const string DEFAULT_BREAKPOINT = '992';

  /**
   * Background defaults.
   */
  public const string DEFAULT_BG_BUTTONS = '#ECECEC';
  public const string DEFAULT_BG_PANES = '#F7F7F7';

  /**
   * Deep-link identifier reserved words.
   *
   * Tabs write `#tabs-<id>-<n>` fragments, so `tabs`/`tab` must be reserved
   * to avoid identifier/fragment collisions (matches v1).
   *
   * @var list<string>
   */
  public const array DEEPLINK_RESERVED_WORDS = ['tabs', 'tab', 'vvjt', 'vvj'];

  /**
   * Prevent instantiation.
   */
  private function __construct() {
  }

}
