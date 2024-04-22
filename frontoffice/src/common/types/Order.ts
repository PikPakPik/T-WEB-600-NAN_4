import { User } from "@/common/types/User";
import { OrderProduct } from "@/common/types/OrderProduct";

export interface Order {
	id: number;
	user: User;
	status: string;
	totalPrice: number;
	products: OrderProduct[];
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}
