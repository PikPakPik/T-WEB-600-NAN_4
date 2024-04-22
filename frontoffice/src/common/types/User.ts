
export interface User {
	id: number;
	login: string;
	name: string;
	email: string;
	password: string;
	admin: boolean;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}
