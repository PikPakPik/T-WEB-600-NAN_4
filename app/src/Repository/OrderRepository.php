<?php

namespace App\Repository;

use App\DTO\PaginationDTO;
use App\DTO\PaginatorDTO;
use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @extends ServiceEntityRepository<Order>
 *
 * @method Order|null find($id, $lockMode = null, $lockVersion = null)
 * @method Order|null findOneBy(array $criteria, array $orderBy = null)
 * @method Order[]    findAll()
 * @method Order[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, private readonly SerializerInterface $serializer)
    {
        parent::__construct($registry, Order::class);
    }

    public function getOrders(PaginationDTO $paginationDTO): array
    {
        $qb = $this->createQueryBuilder('p')
            ->setFirstResult(($paginationDTO->getPage() - 1) * $paginationDTO->getLimit())
            ->setMaxResults($paginationDTO->getLimit());

        $paginator = new Paginator($qb);
        $items = $qb->getQuery()->getResult();
        $itemsSerialized = $this->serializer->serialize($items, 'json', [
            'json_encode_options' => 15,
            'groups' => [
                'order:read',
                'product:read',
                'date:read',
                'orderall:read',
                'user:read'
            ]
        ]);
        $paginatorDto = new PaginatorDTO();
        $paginatorDto->setItems(json_decode($itemsSerialized, true))
            ->setTotalItems($paginator->count())
            ->setPaginationDTO($paginationDTO);

        return $paginatorDto->toArray();
    }
}
