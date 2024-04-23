<?php

namespace App\DTO;

class PaginatorDTO
{
    /** @var array<mixed> $items */
    private array $items = [];

    private int $totalItems = 0;

    private PaginationDTO $paginationDTO;

    /**
     * @param array<mixed> $items
     * @return $this
     */
    public function setItems(array $items): static
    {
        $this->items = $items;
        return $this;
    }

    /**
     * @param int $totalItems
     * @return $this
     */
    public function setTotalItems(int $totalItems): static
    {
        $this->totalItems = $totalItems;
        return $this;
    }

    /**
     * @param PaginationDTO $paginationDTO
     * @return $this
     */
    public function setPaginationDTO(PaginationDTO $paginationDTO): static
    {
        $this->paginationDTO = $paginationDTO;
        return $this;
    }

    /**
     * @return array<mixed>
     */
    public function toArray(): array
    {
        $totalPages = (int) ceil($this->totalItems / $this->paginationDTO->getLimit());
        return [
            'items' => $this->items,
            'totalItems' => $this->totalItems,
            'totalPages' => $totalPages,
            'currentPage' => $this->paginationDTO->getPage(),
            'nextPage' => $totalPages > 1 && $this->paginationDTO->getPage() < $totalPages ?
                $this->paginationDTO->getPage() + 1 : null,
            'previousPage' => $this->paginationDTO->getPage() - 1 > 0 ? $this->paginationDTO->getPage() - 1 : null,
        ];
    }
}
