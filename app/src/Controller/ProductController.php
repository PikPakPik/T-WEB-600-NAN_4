<?php

namespace App\Controller;

use App\DTO\PaginationDTO;
use App\DTO\ProductDTO;
use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/products')]
class ProductController extends AbstractController
{
    #[Route('', name: 'api_get_products', methods: ['GET'], format: 'json')]
    public function product(ProductRepository $productRepository, #[MapQueryString] ?PaginationDTO $paginationDTO = new PaginationDTO()): Response
    {
        $product = $productRepository->getProducts($paginationDTO);
        return $this->json(
            $product
        );
    }

    #[Route('/{id}', name: 'api_get_product', methods: ['GET'], format: 'json')]
    public function getProduct(Product $product): Response
    {
        return $this->json(
            $product,
            context: [
                'groups' => [
                    'product:read',
                    'date:read',
                    "category:read",
                ]
            ]
        );
    }


    #[Route('', name: 'app_create_product', methods: ['POST'], format: 'json')]
    public function createProduct(
        #[MapRequestPayload] ProductDTO $productdto,
        EntityManagerInterface $entityManager
    ): Response {
        $product = new Product();
        $product->withObject($productdto);
        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json(
            $product
        );
    }

    #[Route('/{id}', name: 'app_update_product', methods: ['PATCH'], format: 'json')]
    public function updateProduct(
        #[MapRequestPayload] ProductDTO $productDTO,
        Product $product,
        EntityManagerInterface $entityManager
    ): Response {
        $product->withObject($productDTO);
        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json(
            $product
        );
    }

    #[Route('/{id}', name: 'app_delete_product', methods: ['DELETE'], format: 'json')]
    public function deleteProduct(Product $product, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($product);
        $entityManager->flush();

        return new Response(status: Response::HTTP_NO_CONTENT);
    }
}
