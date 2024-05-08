<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class PaginationDTO
{
    #[Assert\Type('integer')]
    #[Assert\GreaterThan(value: 0)]
    public int $page = 1;

    #[Assert\Type('integer')]
    #[Assert\GreaterThan(value: 0)]
    public int $limit = 20;

    /**
     * @return int
     */
    public function getPage(): int
    {
        return $this->page;
    }

    /**
     * @return int
     */
    public function getLimit(): int
    {
        return $this->limit;
    }
}
