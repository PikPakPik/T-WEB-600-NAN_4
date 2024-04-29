<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Bridge\Doctrine\Security\User\UserLoaderInterface;
use Throwable;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements UserLoaderInterface
{
    public function __construct(
        ManagerRegistry $registry,
        private readonly LoggerInterface $logger,
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
}
