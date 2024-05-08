<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use App\Trait\DateTimeImmutableTrait;
use App\Trait\DtoHydratorTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\Table(name: 'products')]
class Product
{
    use DtoHydratorTrait;
    use DateTimeImmutableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read', 'cart:read', 'order:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read', 'cart:read', 'order:read'])]
    private string $name;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['product:read', 'cart:read', 'order:read'])]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['product:read', 'cart:read', 'order:read'])]
    private ?string $photo = null;

    #[ORM\Column]
    #[Groups(['product:read', 'order:read'])]
    private ?float $price = 0.0;

    #[ORM\Column]
    #[Groups(['product:read'])]

    private ?int $discount = 0;

    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?int $discountPrice = 0;

    #[ORM\Column]
    #[Groups(['product:read', 'cart:read'])]
    private ?bool $active = false;

    #[ORM\Column]
    #[Groups(['product:read', 'cart:read'])]
    private ?int $stock = 0;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[Groups(['product:read'])]
    private ?Category $category = null;

    /**
     * @var Collection<int, OrderProduct>
     */
    #[ORM\OneToMany(targetEntity: OrderProduct::class, mappedBy: 'product')]
    private Collection $orderProducts;

    public function __construct()
    {
        $this->orderProducts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): static
    {
        $this->photo = $photo;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getDiscount(): ?int
    {
        return $this->discount;
    }

    public function setDiscount(int $discount): static
    {
        $this->discount = $discount;

        return $this;
    }

    public function getDiscountPrice(): ?int
    {
        return $this->discountPrice;
    }

    public function setDiscountPrice(int $discountPrice): static
    {
        $this->discountPrice = $discountPrice;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    /**
     * @return Collection<int, OrderProduct>
     */
    public function getOrderProducts(): Collection
    {
        return $this->orderProducts;
    }

    public function addOrderProduct(OrderProduct $orderProduct): static
    {
        if (!$this->orderProducts->contains($orderProduct)) {
            $this->orderProducts->add($orderProduct);
            $orderProduct->setProduct($this);
        }

        return $this;
    }

    public function removeOrderProduct(OrderProduct $orderProduct): static
    {
        if ($this->orderProducts->removeElement($orderProduct)) {
            // set the owning side to null (unless already changed)
            if ($orderProduct->getProduct() === $this) {
                $orderProduct->setProduct(null);
            }
        }

        return $this;
    }
}
