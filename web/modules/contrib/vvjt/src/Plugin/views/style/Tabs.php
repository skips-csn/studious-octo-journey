<?php

declare(strict_types=1);

namespace Drupal\vvjt\Plugin\views\style;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\views\Attribute\ViewsStyle;
use Drupal\vvj_core\Plugin\views\style\VvjStylePluginBase;
use Drupal\vvjt\VvjtConstants;

/**
 * Renders Views rows as a vanilla-JavaScript tab group.
 *
 * @ingroup views_style_plugins
 */
#[ViewsStyle(
  id: 'views_vvjt',
  title: new TranslatableMarkup('Views Vanilla JavaScript Tabs'),
  help: new TranslatableMarkup('Render items in Tabs using vanilla JavaScript.'),
  theme: 'views_view_vvjt',
  display_types: ['normal'],
)]
class Tabs extends VvjStylePluginBase {

  /**
   * {@inheritdoc}
   */
  public function getModuleSlug(): string {
    return 'vvjt';
  }

  /**
   * {@inheritdoc}
   */
  public function getCustomElementTag(): string {
    return 'vvjt-tabs';
  }

  /**
   * {@inheritdoc}
   *
   * Restores v1's tab-specific "Enable CSS Library" wording.
   *
   * @return \Drupal\Core\StringTranslation\TranslatableMarkup
   *   The description.
   */
  protected function getEnableCssDescription(): TranslatableMarkup {
    return $this->t('Check this box to include the CSS library for styling the tabs.');
  }

  /**
   * {@inheritdoc}
   *
   * Restores v1's tab-specific "Enable Deep Linking" wording.
   *
   * @return \Drupal\Core\StringTranslation\TranslatableMarkup
   *   The description.
   */
  protected function getDeeplinkEnableDescription(): TranslatableMarkup {
    return $this->t(
      'Enable deep linking to create shareable URLs for specific tabs. When enabled, tab buttons become clickable anchor links.',
    );
  }

  /**
   * {@inheritdoc}
   *
   * Restores v1's tab-specific "URL Identifier" wording.
   *
   * @return \Drupal\Core\StringTranslation\TranslatableMarkup
   *   The description.
   */
  protected function getDeeplinkIdentifierDescription(): TranslatableMarkup {
    return $this->t(
      'Short identifier used in tab links. Example: "products" creates links like #tabs-products-1. Will be automatically cleaned: converted to lowercase, spaces become hyphens, special characters removed.',
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function definePatternOptions(array $options): array {
    $options['animation'] = ['default' => VvjtConstants::DEFAULT_ANIMATION];
    $options['tabs_position'] = ['default' => VvjtConstants::DEFAULT_POSITION];
    $options['max_width'] = ['default' => VvjtConstants::DEFAULT_MAX_WIDTH];
    $options['max_height'] = ['default' => VvjtConstants::DEFAULT_MAX_HEIGHT];
    $options['available_breakpoints'] = ['default' => VvjtConstants::DEFAULT_BREAKPOINT];
    $options['disable_background'] = ['default' => FALSE];
    $options['background_buttons'] = ['default' => VvjtConstants::DEFAULT_BG_BUTTONS];
    $options['background_panes'] = ['default' => VvjtConstants::DEFAULT_BG_PANES];
    $options['wrap_tabs'] = ['default' => FALSE];
    return $options;
  }

  /**
   * {@inheritdoc}
   *
   * Tabs offer an extra `a-opacity` preset.
   */
  protected function getAnimationPresets(): array {
    return [
      'none' => $this->t('None'),
      'a-top' => $this->t('Slide from Top'),
      'a-bottom' => $this->t('Slide from Bottom'),
      'a-left' => $this->t('Slide from Left'),
      'a-right' => $this->t('Slide from Right'),
      'a-zoom' => $this->t('Zoom'),
      'a-opacity' => $this->t('Opacity'),
    ];
  }

  /**
   * {@inheritdoc}
   */
  protected function buildPatternSections(array &$form): void {
    $this->buildLayoutSection($form);
    $this->buildAnimationSection($form);
    $this->buildStylingSection($form);
    $this->buildResponsiveSection($form);
  }

  /**
   * Layout section — tabs_position, wrap, max_width, max_height.
   *
   * @param array<int|string, mixed> $form
   *   The form, modified in place.
   */
  protected function buildLayoutSection(array &$form): void {
    $form['layout_section'] = [
      '#type' => 'details',
      '#title' => $this->t('Layout Settings'),
      '#open' => TRUE,
      '#weight' => -40,
    ];

    $form['layout_section']['tabs_position'] = [
      '#type' => 'select',
      '#title' => $this->t('Tabs Position'),
      '#options' => [
        VvjtConstants::POSITION_TOP => $this->t('Top'),
        VvjtConstants::POSITION_RIGHT => $this->t('Right'),
        VvjtConstants::POSITION_BOTTOM => $this->t('Bottom'),
        VvjtConstants::POSITION_LEFT => $this->t('Left'),
      ],
      '#default_value' => $this->options['tabs_position'],
      '#description' => $this->t('Select the position for the tab buttons.'),
    ];

    $form['layout_section']['wrap_tabs'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Wrap Tabs When Exceeded'),
      '#default_value' => $this->options['wrap_tabs'],
      '#description' => $this->t('Check this box to wrap tab buttons if they exceed the available space on any screen size. The default is auto-scroll.'),
    ];

    $form['layout_section']['max_width'] = [
      '#type' => 'number',
      '#title' => $this->t('Max Width (px) for Tabs'),
      '#default_value' => $this->options['max_width'],
      '#description' => $this->t('Configure the maximum width for each tab button in a horizontal layout or for the tabs container in a vertical layout.<br><br>

        <strong>Vertical Tabs (Left/Right) (Max width for buttons container):</strong><br>
        - <strong>Auto (0 px):</strong> The tab buttons adjust their width dynamically based on content size and available space, ensuring flexibility across different screen sizes. Note that the max width will collapse on smaller screens. The default max width is set to 300px in the CSS for vertical tabs.<br>
        - <strong>Max Width (in pixels):</strong> Set a maximum width in pixels to allow tab buttons to expand based on content while preventing them from exceeding a specified width. This is ideal for maintaining consistency without sacrificing adaptability.<br><br>

        <strong>Horizontal Tabs (Top/Bottom) (Max width for each button):</strong><br>
        - <strong>Auto (0 px):</strong> The tabs automatically resize to fit their content, providing a responsive layout that adapts to the available space. The max width remains consistent across different screen sizes.<br>
        - <strong>Max Width (in pixels):</strong> Define a maximum width in pixels for tab buttons to ensure they can grow according to content but do not exceed the specified size, maintaining a clean and organized appearance.'),
      '#step' => 1,
      '#min' => 0,
      '#required' => TRUE,
    ];

    $form['layout_section']['max_height'] = [
      '#type' => 'number',
      '#title' => $this->t('Max Height (px) for Vertical Tabs Buttons Container (Left/Right)'),
      '#default_value' => $this->options['max_height'],
      '#description' => $this->t('Defines the maximum height for the buttons container in a vertical layout (Left/Right). Enter zero for auto. This setting does not affect the pane height.'),
      '#step' => 1,
      '#min' => 0,
      '#required' => TRUE,
    ];
  }

  /**
   * Animation section.
   *
   * @param array<int|string, mixed> $form
   *   The form, modified in place.
   */
  protected function buildAnimationSection(array &$form): void {
    $form['animation_section'] = [
      '#type' => 'details',
      '#title' => $this->t('Animation Settings'),
      '#open' => TRUE,
      '#weight' => -30,
    ];

    $animation_select = $this->buildAnimationSelect('animation');
    $animation_select['#title'] = $this->t('Animation Type');
    $animation_select['#description'] = $this->t('Choose the animation type for the tab pane. Reduced-motion users see no animation regardless.');
    $form['animation_section']['animation'] = $animation_select;
  }

  /**
   * Styling section — background colors.
   *
   * @param array<int|string, mixed> $form
   *   The form, modified in place.
   */
  protected function buildStylingSection(array &$form): void {
    $form['styling_section'] = [
      '#type' => 'details',
      '#title' => $this->t('Styling Settings'),
      '#open' => TRUE,
      '#weight' => -20,
    ];

    $form['styling_section']['background_buttons'] = [
      '#type' => 'color',
      '#title' => $this->t('Tabs Buttons Background Color'),
      '#default_value' => $this->options['background_buttons'],
      '#description' => $this->t('Select the background color to be applied to the tabs buttons. This color will determine the appearance of the buttons in the tab interface.'),
      '#empty_value' => '',
      '#states' => [
        'disabled' => [
          ':input[name="style_options[styling_section][disable_background]"]' => ['checked' => TRUE],
        ],
      ],
    ];

    $form['styling_section']['background_panes'] = [
      '#type' => 'color',
      '#title' => $this->t('Tabs Panes Background Color'),
      '#default_value' => $this->options['background_panes'],
      '#description' => $this->t('Select the background color to be applied to the content panes within the tabs. This color will be used as the background for the content displayed in each pane.'),
      '#empty_value' => '',
      '#states' => [
        'disabled' => [
          ':input[name="style_options[styling_section][disable_background]"]' => ['checked' => TRUE],
        ],
      ],
    ];

    $form['styling_section']['disable_background'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Disable Background Colors for Buttons and Panes'),
      '#default_value' => $this->options['disable_background'],
      '#description' => $this->t('Check this box to completely disable the background colors for both the tabs buttons and the content panes.'),
    ];
  }

  /**
   * Responsive section — vertical-tabs collapse breakpoint.
   *
   * @param array<int|string, mixed> $form
   *   The form, modified in place.
   */
  protected function buildResponsiveSection(array &$form): void {
    $form['responsive_section'] = [
      '#type' => 'details',
      '#title' => $this->t('Responsive Settings'),
      '#open' => FALSE,
      '#weight' => -15,
    ];

    // Assign (do not `+`-union) the pattern-specific keys: array union keeps
    // the LEFT operand's value for shared keys, so a unioned '#options' is
    // silently discarded and the base registry's options (incl. an 'all'
    // value with no backing vvjt library) leak. v1 offered these 5 only.
    $breakpoint_select = $this->buildBreakpointSelect(
      'available_breakpoints',
      VvjtConstants::DEFAULT_BREAKPOINT,
    );
    $breakpoint_select['#title'] = $this->t('Responsive Breakpoint for Vertical Tabs');
    $breakpoint_select['#description'] = $this->t('Choose the breakpoint at which the vertical tabs (Left/Right) will collapse and become horizontal.');
    $breakpoint_select['#options'] = [
      '576' => $this->t('576 px'),
      '768' => $this->t('768 px'),
      '992' => $this->t('992 px'),
      '1200' => $this->t('1200 px'),
      '1400' => $this->t('1400 px'),
    ];
    $form['responsive_section']['available_breakpoints'] = $breakpoint_select;
  }

  /**
   * {@inheritdoc}
   *
   * Override library list to add horizontal/vertical/breakpoint variants
   * conditionally based on tabs_position.
   *
   * @return list<string>
   *   Library identifiers.
   */
  protected function buildLibraryList(): array {
    $libraries = parent::buildLibraryList();
    if ($this->options['tabs_position'] === 'left' || $this->options['tabs_position'] === 'right') {
      $libraries[] = 'vvjt/vvjt-vertical';
      $breakpoint = $this->options['available_breakpoints'] ?? VvjtConstants::DEFAULT_BREAKPOINT;
      $breakpoint = is_scalar($breakpoint) ? (string) $breakpoint : VvjtConstants::DEFAULT_BREAKPOINT;
      $libraries[] = 'vvjt/vvjt__' . $breakpoint;
    }
    else {
      $libraries[] = 'vvjt/vvjt-horizontal';
    }
    return $libraries;
  }

  /**
   * {@inheritdoc}
   *
   * @param array<int|string, mixed> $form
   *   The Views style options form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   */
  public function submitOptionsForm(&$form, FormStateInterface $form_state): void {
    $values = $form_state->getValue('style_options');
    if (!is_array($values)) {
      $values = [];
    }
    $form_state->setValue('style_options', $this->flattenFormValues($values));
    parent::submitOptionsForm($form, $form_state);
  }

  /**
   * Flatten the sectioned form values back into the persisted shape.
   *
   * @param array<int|string, mixed> $values
   *   Submitted form values keyed by section then by option name.
   *
   * @return array<string, mixed>
   *   Flattened option array.
   */
  protected function flattenFormValues(array $values): array {
    $flattened = [];

    $layout = $values['layout_section'] ?? NULL;
    if (is_array($layout)) {
      $flattened['tabs_position'] = $layout['tabs_position'] ?? VvjtConstants::DEFAULT_POSITION;
      $flattened['wrap_tabs'] = $layout['wrap_tabs'] ?? FALSE;
      $flattened['max_width'] = $layout['max_width'] ?? VvjtConstants::DEFAULT_MAX_WIDTH;
      $flattened['max_height'] = $layout['max_height'] ?? VvjtConstants::DEFAULT_MAX_HEIGHT;
    }

    $deeplink = $values['deeplink_section'] ?? NULL;
    if (is_array($deeplink)) {
      $flattened['enable_deeplink'] = $deeplink['enable_deeplink'] ?? FALSE;
      $flattened['deeplink_identifier'] = $deeplink['deeplink_identifier'] ?? '';
    }

    $animation = $values['animation_section'] ?? NULL;
    if (is_array($animation)) {
      $flattened['animation'] = $animation['animation'] ?? VvjtConstants::DEFAULT_ANIMATION;
    }

    $styling = $values['styling_section'] ?? NULL;
    if (is_array($styling)) {
      $flattened['background_buttons'] = $styling['background_buttons'] ?? VvjtConstants::DEFAULT_BG_BUTTONS;
      $flattened['background_panes'] = $styling['background_panes'] ?? VvjtConstants::DEFAULT_BG_PANES;
      $flattened['disable_background'] = $styling['disable_background'] ?? FALSE;
    }

    $responsive = $values['responsive_section'] ?? NULL;
    if (is_array($responsive)) {
      $flattened['available_breakpoints'] = $responsive['available_breakpoints'] ?? VvjtConstants::DEFAULT_BREAKPOINT;
    }

    $advanced = $values['advanced_section'] ?? NULL;
    if (is_array($advanced)) {
      $flattened['enable_css'] = $advanced['enable_css'] ?? TRUE;
    }

    $flattened['unique_id'] = $this->options['unique_id'] ?? $this->generateUniqueId();

    return $flattened;
  }

  /**
   * {@inheritdoc}
   *
   * Tabs write `#tabs-<id>-<n>` fragments, so `tabs`/`tab` must be reserved
   * (matching v1) instead of the base's accordion-oriented default.
   *
   * @return list<string>
   *   Reserved deeplink identifier words.
   */
  protected function getDeeplinkReservedWords(): array {
    return VvjtConstants::DEEPLINK_RESERVED_WORDS;
  }

}
