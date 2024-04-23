<?php

namespace App\Controller;

use App\DTO\CategoryDTO;
use App\DTO\PaginationDTO;
use App\DTO\ProductDTO;
use App\Entity\Category;
use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/categories')]
class CategoryController extends AbstractController
{
    #[Route('', name: 'api_get_categories', methods: ['GET'], format: 'json')]
    public function category(CategoryRepository $categoryRepository, #[MapQueryString] ?PaginationDTO $paginationDTO = new PaginationDTO()): Response
    {
        $category = $categoryRepository->getCategories($paginationDTO);
        return $this->json(
            $category
        );
    }

    #[Route('/{id}', name: 'api_get_category', methods: ['GET'], format: 'json')]
    public function getCategory(Category $category): Response
    {
        return $this->json(
            $category,
            context: [
                'groups' => [
                    'category:read',
                    'date:read',
                ]
            ]
        );
    }


    #[Route('', name: 'app_create_category', methods: ['POST'], format: 'json')]
    public function createProduct(
        #[MapRequestPayload] CategoryDTO $categoryDTO,
        EntityManagerInterface $entityManager
    ): Response {
        $category = new Category();
        $category->withObject($categoryDTO);
        $entityManager->persist($category);
        $entityManager->flush();

        return $this->json(
            $category,
            context: [
                'groups' => [
                    'category:read',
                    'date:read',
                ]
            ]
        );
    }

    #[Route('/{id}', name: 'app_update_category', methods: ['PATCH'], format: 'json')]
    public function updateProduct(
        #[MapRequestPayload] CategoryDTO $categoryDTO,
        Category $category,
        EntityManagerInterface $entityManager
    ): Response {
        $category->withObject($categoryDTO);
        $entityManager->persist($category);
        $entityManager->flush();

        return $this->json(
            $category,
            context: [
                'groups' => [
                    'category:read',
                    'date:read',
                ]
            ]
        );
    }

    #[Route('/{id}', name: 'app_delete_category', methods: ['DELETE'], format: 'json')]
    public function deleteProduct(Category $category, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($category);
        $entityManager->flush();

        return new Response(status: Response::HTTP_NO_CONTENT);
    }
}
