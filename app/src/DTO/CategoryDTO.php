<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class CategoryDTO
{
    #[Assert\NotBlank]
    public string $name;

    #[Assert\Type('bool')]
    #[Assert\Choice(choices: [true, false])]
    public bool $active;

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return bool
     */
    public function getIsActive(): bool
    {
        return $this->active;
    }
}
