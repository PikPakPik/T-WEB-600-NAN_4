<?php

namespace App\Entity;

use App\Repository\OrderProductRepository;
use App\Trait\DateTimeImmutableTrait;
use App\Trait\DtoHydratorTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: OrderProductRepository::class)]
#[ORM\Table(name: 'orders_products')]
class OrderProduct
{
    use DateTimeImmutableTrait;
    use DtoHydratorTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['cart:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'orderProducts')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['cart:read'])]
    private ?Product $product = null;

    #[ORM\Column]
    #[Groups(['cart:read'])]
    private ?int $quantity = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    private ?Cart $cart = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    private ?Order $orderId = null;

    #[ORM\Column]
    #[Groups(['cart:read'])]
    private ?float $buyPrice = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getCart(): ?Cart
    {
        return $this->cart;
    }

    public function setCart(?Cart $cart): static
    {
        $this->cart = $cart;

        return $this;
    }

    public function getOrderId(): ?Order
    {
        return $this->orderId;
    }

    public function setOrderId(?Order $orderId): static
    {
        $this->orderId = $orderId;

        return $this;
    }

    public function getBuyPrice(): ?float
    {
        return $this->buyPrice;
    }

    public function setBuyPrice(float $buyPrice): static
    {
        $this->buyPrice = $buyPrice;

        return $this;
    }
}
