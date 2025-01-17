<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\Security\Core\Authentication\RememberMe;

use Symfony\Component\Security\Core\Exception\TokenNotFoundException;

/**
 * This class is used for testing purposes, and is not really suited for production.
 *
 * @author Johannes M. Schmitt <schmittjoh@gmail.com>
 */
final class InMemoryTokenProvider implements TokenProviderInterface
{
    private array $tokens = [];

    public function loadTokenBySeries(string $series): PersistentTokenInterface
    {
        if (!isset($this->tokens[$series])) {
            throw new TokenNotFoundException('No token found.');
        }

        return $this->tokens[$series];
    }

    public function updateToken(string $series, #[\SensitiveParameter] string $tokenValue, \DateTimeInterface $lastUsed): void
    {
        if (!isset($this->tokens[$series])) {
            throw new TokenNotFoundException('No token found.');
        }

        $token = new PersistentToken(
            $this->tokens[$series]->getClass(),
            $this->tokens[$series]->getUserIdentifier(),
            $series,
            $tokenValue,
            $lastUsed
        );
        $this->tokens[$series] = $token;
    }

    public function deleteTokenBySeries(string $series): void
    {
        unset($this->tokens[$series]);
    }

    public function createNewToken(PersistentTokenInterface $token): void
    {
        $this->tokens[$token->getSeries()] = $token;
    }
}
