<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class CartDTO
{

    #[Assert\NotBlank]
    public int $quantity;

    /**
     * @return int
     */
    public function getQuantity(): int
    {
        return $this->quantity;
    }
}
