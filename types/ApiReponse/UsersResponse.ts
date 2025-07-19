// types/user.ts

import { EcommerceOrder, Role, Transaction, Trip, UserStatus, Vehicle, Wallet } from "../AllTypes";
import { Order } from "./OrderResponse";
import { ServiceSubscription } from "./ServiceSubscriptionResponse";


export interface User {
    id: string;
    email: string;
    password: string;
    passwordGenerate: string | null;
    name: string;
    role: Role;
    status: UserStatus;
    phoneCountryCode: string | null;
    phoneNumber: string | null;
    createdAt: string;
    updatedAt: string;
    partnerId: string | null;
    image: string | null;
    carte: string | null;
    permis: string | null;

    wallet: Wallet;
    vehiclesOwned: Vehicle[];
    vehiclesDriven: Vehicle[];
    trips: Trip[]; // Remplace `any` si tu as une structure pour `Trip`
    tripsAsDriver: any[];
    partner: User | null; // Idem si tu as un modèle
    drivers: User[];
    transactions: Transaction[];
    serviceSubscriptions: ServiceSubscription[];
    orders: Order[];
    ecommerceOrders: EcommerceOrder[];
}


export interface Service {
    id: string;
    name: string;
    description: string;
    type: string;
    imageUrl: string | null;
    icon: string;
    partnerId: string;
    createdAt: string;
    updatedAt: string;
    price: number;
    promoPrice: number;
    isActivePromo: boolean;
    statusService: boolean;
}
