import { User } from '@/common/types/User';
import { OrderProduct } from "@/common/types/OrderProduct";

export interface Cart {
	id: number;
	user: User;
	products: OrderProduct[];
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}