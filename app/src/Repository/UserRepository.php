<?php

namespace App\Repository;

use App\DTO\PaginationDTO;
use App\DTO\PaginatorDTO;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Bridge\Doctrine\Security\User\UserLoaderInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Throwable;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User|null findOneByEmail(string $email)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements UserLoaderInterface
{
    public function __construct(
        ManagerRegistry $registry,
        private readonly LoggerInterface $logger,
        private readonly SerializerInterface $serializer
    ) {
        parent::__construct($registry, User::class);
    }

    /**
     * @param string $identifier
     * @return User|null
     */
    public function loadUserByIdentifier(string $identifier): ?User
    {
        try {
            return $this->createQueryBuilder('u')
                ->where('u.email = :username')
                ->setParameter('username', $identifier)
                ->getQuery()
                ->getOneOrNullResult();
        } catch (Throwable $e) {
            $this->logger->error($e->getMessage());
            return null;
        }
    }

    public function getUsers(PaginationDTO $paginationDTO): array
    {
        $qb = $this->createQueryBuilder('p')
            ->setFirstResult(($paginationDTO->getPage() - 1) * $paginationDTO->getLimit())
            ->setMaxResults($paginationDTO->getLimit());

        $paginator = new Paginator($qb);
        $items = $qb->getQuery()->getResult();
        $itemsSerialized = $this->serializer->serialize($items, 'json', [
            'json_encode_options' => 15,
            'groups' => [
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
