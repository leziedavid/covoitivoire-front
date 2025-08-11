import { FileManager, Role, ServiceType, UserStatus, VariantType } from "../AllTypes";

export interface ProduitsResponse {
    data: Product[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    sku: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    categoryId: string;
    serviceId: string;
    addedById: string;
    VariantType: VariantType;
    category: Category;
    addedBy: User;
    service: Service;
    variants: Variant[];
    files: FileManager[];
}

export interface Category {
    id: string;
    name: string;
    addedById: string;
}

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
}

export interface Service {
    id: string;
    name: string;
    description: string;
    type:ServiceType;
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

export interface Variant {
    id: string;
    name: string;
    value: string;
    price: number;
    variantType: string;
    createdAt: string;
    updatedAt: string;
    addedById: string;
}

export interface ProductFile {
    id: number;
    fileCode: string;
    fileName: string;
    fileMimeType: string;
    fileSize: number;
    fileUrl: string;
    fileType: 'productFiles' | string;
    targetId: string;
    createdAt: string;
    updatedAt: string;
}
