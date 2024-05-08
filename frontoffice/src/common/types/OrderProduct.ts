import { Order } from "@/common/types/Order";
import { Product } from "@/common/types/Product";

export interface OrderProduct {
	id: number;
	order: Order;
	product: Product;
	quantity: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

