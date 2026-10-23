<?php

declare(strict_types=1);

namespace Drupal\vvjt\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Render\BubbleableMetadata;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\vvj_core\Service\TokenResolver;
use Drupal\vvjt\Plugin\views\style\Tabs;

/**
 * Token hooks — exposes per-row field tokens for VVJT-enabled Views.
 *
 * Token forms:
 *   [vvjt:FIELD]        — rendered HTML
 *   [vvjt:FIELD:plain]  — plain text.
 */
final class VvjtTokenHooks {

  use StringTranslationTrait;

  /**
   * Constructor.
   *
   * @param \Drupal\vvj_core\Service\TokenResolver|null $tokenResolver
   *   Shared token resolver. Nullable to keep the container compilable
   *   during the v1 → v2 upgrade window when vvj_core is on disk but
   *   not yet enabled. vvjt_update_10001 installs it; subsequent
   *   container rebuilds inject the real service.
   */
  public function __construct(
    private readonly ?TokenResolver $tokenResolver,
  ) {}

  /**
   * Implements hook_token_info().
   *
   * @return array<string, array<string, array<string, mixed>>>
   *   Token type + token definitions for the `vvjt` namespace.
   */
  #[Hook('token_info')]
  public function tokenInfo(): array {
    return [
      'types' => [
        'vvjt' => [
          'name' => $this->t('VVJT Tabs'),
          'description' => $this->t('Tokens for accessing field values from the first row of a VVJT-enabled View.'),
          'needs-data' => 'view',
        ],
      ],
      'tokens' => [
        'vvjt' => [
          '*' => [
            'name' => $this->t('Field token'),
            'description' => $this->t('Use [vvjt:FIELD_NAME] for HTML output or [vvjt:FIELD_NAME:plain] for plain text.'),
          ],
        ],
      ],
    ];
  }

  /**
   * Implements hook_tokens().
   *
   * @param string $type
   *   Token type — only `vvjt` is handled.
   * @param array<string, string> $tokens
   *   Token name → original placeholder map.
   * @param array<string, mixed> $data
   *   Token data; expects `view` key with a ViewExecutable.
   * @param array<string, mixed> $options
   *   Token resolution options.
   * @param \Drupal\Core\Render\BubbleableMetadata $bubbleable_metadata
   *   For propagating cache metadata.
   *
   * @return array<string, string|\Drupal\Component\Render\MarkupInterface>
   *   Map of original placeholder → resolved value.
   */
  #[Hook('tokens')]
  public function tokens(
    string $type,
    array $tokens,
    array $data,
    array $options,
    BubbleableMetadata $bubbleable_metadata,
  ): array {
    if ($type !== 'vvjt' || $this->tokenResolver === NULL) {
      return [];
    }
    return $this->tokenResolver->resolve(
      'vvjt',
      $tokens,
      $data,
      $bubbleable_metadata,
      Tabs::class,
    );
  }

}
