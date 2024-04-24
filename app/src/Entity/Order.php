<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use App\Trait\DateTimeImmutableTrait;
use App\Trait\DtoHydratorTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`orders`')]
class Order
{
    use DateTimeImmutableTrait;
    use DtoHydratorTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * @var Collection<int, OrderProduct>
     */
    #[ORM\OneToMany(targetEntity: OrderProduct::class, mappedBy: 'orderId')]
    private Collection $products;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    private ?User $owner = null;

    #[ORM\Column]
    private ?float $totalPrice = null;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, OrderProduct>
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(OrderProduct $product): static
    {
        if (!$this->products->contains($product)) {
            $this->products->add($product);
            $product->setOrderId($this);
        }

        return $this;
    }

    public function removeProduct(OrderProduct $product): static
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getOrderId() === $this) {
                $product->setOrderId(null);
            }
        }

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }

    public function getTotalPrice(): ?float
    {
        return $this->totalPrice;
    }

    public function setTotalPrice(float $totalPrice): static
    {
        $this->totalPrice = $totalPrice;

        return $this;
    }
}
