
export interface User {
	id: number;
	login: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	admin: boolean;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}
