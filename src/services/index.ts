import { CartService } from "./cart.service";
import { UserService } from "./user.service";

export const services: any[] = [CartService, UserService];

export * from "./cart.service";
export * from "./base.service";
export * from "./user.service";
