<?php

namespace App\Entity;

use App\Repository\CartRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CartRepository::class)]
class Cart
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'products', cascade: ['persist', 'remove'])]
    private ?Order $products = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProducts(): ?Order
    {
        return $this->products;
    }

    public function setProducts(?Order $products): static
    {
        $this->products = $products;

        return $this;
    }
}
