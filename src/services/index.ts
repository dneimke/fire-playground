import { CartService } from "./cart.service";
import { CategoryService } from "./category.service";
import { ProductService } from "./product.service";
import { UserService } from "./user.service";

export const services: any[] = [CartService, CategoryService, ProductService, UserService];

export * from "./base.service";
export * from "./cart.service";
export * from "./category.service";
export * from "./product.service";
export * from "./user.service";
