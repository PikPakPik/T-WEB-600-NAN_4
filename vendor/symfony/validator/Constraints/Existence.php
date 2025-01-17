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
abstract class Existence extends Composite
{
    public array|Constraint $constraints = [];

    public function getDefaultOption(): ?string
    {
        return 'constraints';
    }

    protected function getCompositeOption(): string
    {
        return 'constraints';
    }
}
