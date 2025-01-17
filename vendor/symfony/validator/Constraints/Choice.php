<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @author Bernhard Schussek <bschussek@gmail.com>
 */
#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class Choice extends Constraint
{
    public const NO_SUCH_CHOICE_ERROR = '8e179f1b-97aa-4560-a02f-2a8b42e49df7';
    public const TOO_FEW_ERROR = '11edd7eb-5872-4b6e-9f12-89923999fd0e';
    public const TOO_MANY_ERROR = '9bd98e49-211c-433f-8630-fd1c2d0f08c3';

    protected const ERROR_NAMES = [
        self::NO_SUCH_CHOICE_ERROR => 'NO_SUCH_CHOICE_ERROR',
        self::TOO_FEW_ERROR => 'TOO_FEW_ERROR',
        self::TOO_MANY_ERROR => 'TOO_MANY_ERROR',
    ];

    public ?array $choices = null;
    /** @var callable|string|null */
    public $callback;
    public bool $multiple = false;
    public bool $strict = true;
    public ?int $min = null;
    public ?int $max = null;
    public string $message = 'The value you selected is not a valid choice.';
    public string $multipleMessage = 'One or more of the given values is invalid.';
    public string $minMessage = 'You must select at least {{ limit }} choice.|You must select at least {{ limit }} choices.';
    public string $maxMessage = 'You must select at most {{ limit }} choice.|You must select at most {{ limit }} choices.';
    public bool $match = true;

    public function getDefaultOption(): ?string
    {
        return 'choices';
    }

    public function __construct(
        string|array $options = [],
        ?array $choices = null,
        callable|string|null $callback = null,
        ?bool $multiple = null,
        ?bool $strict = null,
        ?int $min = null,
        ?int $max = null,
        ?string $message = null,
        ?string $multipleMessage = null,
        ?string $minMessage = null,
        ?string $maxMessage = null,
        ?array $groups = null,
        mixed $payload = null,
        ?bool $match = null,
    ) {
        if (\is_array($options) && $options && array_is_list($options)) {
            $choices ??= $options;
            $options = [];
        }
        if (null !== $choices) {
            $options['value'] = $choices;
        }

        parent::__construct($options, $groups, $payload);

        $this->callback = $callback ?? $this->callback;
        $this->multiple = $multiple ?? $this->multiple;
        $this->strict = $strict ?? $this->strict;
        $this->min = $min ?? $this->min;
        $this->max = $max ?? $this->max;
        $this->message = $message ?? $this->message;
        $this->multipleMessage = $multipleMessage ?? $this->multipleMessage;
        $this->minMessage = $minMessage ?? $this->minMessage;
        $this->maxMessage = $maxMessage ?? $this->maxMessage;
        $this->match = $match ?? $this->match;
    }
}
