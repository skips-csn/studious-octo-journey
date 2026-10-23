<?php

declare(strict_types=1);

namespace Drupal\vvjt\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\views\Hook\ViewsThemeHooks;
use Drupal\views\ViewExecutable;
use Drupal\vvjt\Plugin\views\style\Tabs;

/**
 * Preprocess hooks for VVJT tabs.
 *
 * Vvj_core's preprocess adds the universal `.vvj-component` and
 * `.vvj-vvjt` classes to the views_view wrapper. This class adds
 * the legacy `.vvj-tabs` class for v1 contract preservation, plus
 * the row-template theme-suggestion rewrite.
 */
final class VvjtPreprocessHooks {

  /**
   * Constructor.
   *
   * @param \Drupal\views\Hook\ViewsThemeHooks $viewsThemeHooks
   *   Views row / field preprocess (replaces removed procedural
   *   template_preprocess_* in Drupal 12).
   */
  public function __construct(
    private readonly ViewsThemeHooks $viewsThemeHooks,
  ) {}

  /**
   * Implements hook_preprocess_HOOK() for views_view_vvjt.
   *
   * @param array<string, mixed> $variables
   *   Template variables.
   */
  #[Hook('preprocess_views_view_vvjt')]
  public function preprocessViewsViewVvjt(array &$variables): void {
    $view = $variables['view'] ?? NULL;
    if (!($view instanceof ViewExecutable)) {
      return;
    }
    $stylePlugin = $view->style_plugin;
    if (!($stylePlugin instanceof Tabs)) {
      return;
    }
    $variables['options'] = $stylePlugin->options;

    // Rewrite row theme suggestions.
    $rows = $variables['rows'] ?? NULL;
    if (is_array($rows)) {
      foreach ($rows as $key => $row) {
        if (!is_array($row) || !isset($row['#theme']) || !is_array($row['#theme'])) {
          continue;
        }
        foreach ($row['#theme'] as $idx => $hook) {
          if (is_string($hook)) {
            $row['#theme'][$idx] = str_replace(
              'views_view_fields',
              'views_view_vvjt_fields',
              $hook,
            );
          }
        }
        $rows[$key] = $row;
      }
      $variables['rows'] = $rows;
    }

    $this->viewsThemeHooks->preprocessViewsViewUnformatted($variables);
  }

  /**
   * Implements hook_preprocess_HOOK() for views_view_vvjt_fields.
   *
   * @param array<string, mixed> $variables
   *   Template variables.
   */
  #[Hook('preprocess_views_view_vvjt_fields')]
  public function preprocessViewsViewVvjtFields(array &$variables): void {
    $this->viewsThemeHooks->preprocessViewsViewFields($variables);
  }

  /**
   * Implements hook_preprocess_HOOK() for views_view.
   *
   * Adds the legacy `vvj-tabs` class for v1 contract preservation.
   *
   * @param array<string, mixed> $variables
   *   Template variables.
   */
  #[Hook('preprocess_views_view')]
  public function preprocessViewsView(array &$variables): void {
    $view = $variables['view'] ?? NULL;
    if (!($view instanceof ViewExecutable)) {
      return;
    }
    if (!($view->style_plugin instanceof Tabs)) {
      return;
    }
    $attributes = $variables['attributes'] ?? NULL;
    if (is_array($attributes)) {
      $classes = $attributes['class'] ?? [];
      if (!is_array($classes)) {
        $classes = [];
      }
      $classes[] = 'vvj-tabs';
      $attributes['class'] = $classes;
      $variables['attributes'] = $attributes;
    }
  }

}
