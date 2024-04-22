<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $totalPrice = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $creationDate = null;

    /**
     * @var Collection<int, product>
     */
    #[ORM\OneToMany(targetEntity: product::class, mappedBy: 'command')]
    private Collection $product;

    #[ORM\OneToOne(mappedBy: 'products', cascade: ['persist', 'remove'])]
    private ?Cart $products = null;

    public function __construct()
    {
        $this->product = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(\DateTimeInterface $creationDate): static
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    /**
     * @return Collection<int, product>
     */
    public function getProduct(): Collection
    {
        return $this->product;
    }

    public function addProduct(product $product): static
    {
        if (!$this->product->contains($product)) {
            $this->product->add($product);
            $product->setCommand($this);
        }

        return $this;
    }

    public function removeProduct(product $product): static
    {
        if ($this->product->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getCommand() === $this) {
                $product->setCommand(null);
            }
        }

        return $this;
    }

    public function getProducts(): ?Cart
    {
        return $this->products;
    }

    public function setProducts(?Cart $products): static
    {
        // unset the owning side of the relation if necessary
        if ($products === null && $this->products !== null) {
            $this->products->setProducts(null);
        }

        // set the owning side of the relation if necessary
        if ($products !== null && $products->getProducts() !== $this) {
            $products->setProducts($this);
        }

        $this->products = $products;

        return $this;
    }
}
