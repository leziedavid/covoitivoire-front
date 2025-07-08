"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/AllTypes";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import BuyingOptions from "@/components/BuyingOptions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Header } from "@/components/home/header";


const products: Product[] = [
    {
        id: "1a2b3c4d-0001-0000-0000-000000000001",
        name: "CONCOMBRE",
        description: "Concombre frais",
        price: 630,
        stock: 100,
        sku: "CONC-001",
        imageUrl: "/images/concombre.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "cat-uuid-001",
        serviceId: "srv-uuid-001",
        addedById: "user-uuid-001",
    },
    {
        id: "1a2b3c4d-0002-0000-0000-000000000002",
        name: "TOMATE",
        description: "Tomates SODEFEL bien juteuses",
        price: 368,
        stock: 80,
        sku: "TOMA-001",
        imageUrl: "/images/tomate.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "cat-uuid-002",
        serviceId: "srv-uuid-001",
        addedById: "user-uuid-001",
    },
    {
        id: "1a2b3c4d-0003-0000-0000-000000000003",
        name: "SALADE",
        description: "Salade croquante",
        price: 120,
        stock: 10,
        sku: "SALA-001",
        imageUrl: "/images/salade.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "cat-uuid-003",
        serviceId: "srv-uuid-001",
        addedById: "user-uuid-001",
    },
    {
        id: "1a2b3c4d-0004-0000-0000-000000000004",
        name: "SALADE",
        description: "Salade verte",
        price: 120,
        stock: 10,
        sku: "SALA-002",
        imageUrl: "/images/salade.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "cat-uuid-003",
        serviceId: "srv-uuid-001",
        addedById: "user-uuid-001",
    },
    {
        id: "1a2b3c4d-0005-0000-0000-000000000005",
        name: "SALADE",
        description: "Salade bio",
        price: 120,
        stock: 10,
        sku: "SALA-003",
        imageUrl: "/images/salade.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "cat-uuid-003",
        serviceId: "srv-uuid-001",
        addedById: "user-uuid-001",
    },
    {
        id: "1a2b3c4d-0006-0000-0000-000000000006",
        name: "SALADE",
        description: "Salade locale",
        price: 120,
        stock: 10,
        sku: "SALA-004",
        imageUrl: "/images/salade.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: "cat-uuid-003",
        serviceId: "srv-uuid-001",
        addedById: "user-uuid-001",
    },
];


export default function Page() {


    // État pour les valeurs sélectionnées
    const [selectedCategory, setSelectedCategory] = useState<string>("default");
    const [selectedSize, setSelectedSize] = useState<string>("small");
    const [selectedPrice, setSelectedPrice] = useState<string>("low");
    const [selectedShoeSize, setSelectedShoeSize] = useState<string>("38");

    const categories = [
        { value: "default", label: "Catégorie 1" },
        { value: "comfortable", label: "Catégorie 2" },
        { value: "compact", label: "Catégorie 3" },
    ];

    const sizes = [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
    ];

    const prices = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
    ];

    const shoeSizes = [
        { value: "38", label: "38" },
        { value: "39", label: "39" },
        { value: "40", label: "40" },
        { value: "41", label: "41" },
        { value: "42", label: "42" },
    ];

    const Products = [
        {
            id: "1",
            name: "Tomate",
            description: "Tomate fraîche, idéale pour les salades.",
            price: 1.50,
            stock: 100,
            sku: "TOMA-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-001",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "2",
            name: "Piment",
            description: "Piment frais et piquant.",
            price: 2.00,
            stock: 150,
            sku: "PIME-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-002",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "3",
            name: "Oignon",
            description: "Oignon blanc, idéal pour assaisonner vos plats.",
            price: 0.80,
            stock: 200,
            sku: "OIGN-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-003",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "4",
            name: "Ail",
            description: "Ail frais, pour relever vos recettes.",
            price: 1.00,
            stock: 50,
            sku: "AIL-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-004",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "5",
            name: "Feuille d'oignon",
            description: "Feuilles d'oignon fraîches, idéales pour les soupes.",
            price: 1.20,
            stock: 30,
            sku: "FEUO-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-005",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "6",
            name: "Aubergine Violet",
            description: "Aubergine de couleur violette, douce et savoureuse.",
            price: 2.50,
            stock: 120,
            sku: "AUBV-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-006",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "7",
            name: "Aubergine",
            description: "Aubergine fraîche, parfaite pour vos recettes de cuisine.",
            price: 2.00,
            stock: 100,
            sku: "AUB-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-006",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "8",
            name: "Manioc",
            description: "Manioc frais, un aliment essentiel dans les cuisines tropicales.",
            price: 1.80,
            stock: 50,
            sku: "MANI-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-007",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "9",
            name: "Igname",
            description: "Igname frais, riche en amidon.",
            price: 2.20,
            stock: 60,
            sku: "IGNA-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-007",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "10",
            name: "Banane Douce",
            description: "Banane douce et sucrée, idéale pour les desserts.",
            price: 1.50,
            stock: 200,
            sku: "BAND-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-008",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "11",
            name: "Bande Plantain",
            description: "Bande de plantain, parfait pour les fritures.",
            price: 2.50,
            stock: 80,
            sku: "BANP-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-008",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "12",
            name: "Pomme",
            description: "Pomme croquante et juteuse.",
            price: 1.20,
            stock: 150,
            sku: "POMM-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-008",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "13",
            name: "Pomme de Terre",
            description: "Pomme de terre fraîche, idéale pour les purées.",
            price: 0.90,
            stock: 300,
            sku: "POMT-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-003",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "14",
            name: "Avocat",
            description: "Avocat mûr, crémeux et délicieux.",
            price: 2.50,
            stock: 50,
            sku: "AVOC-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-008",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        },
        {
            id: "15",
            name: "Orange",
            description: "Orange juteuse et sucrée.",
            price: 1.80,
            stock: 200,
            sku: "ORAN-001",
            imageUrl: "/IMG_5195.png",
            createdAt: new Date(),
            updatedAt: new Date(),
            categoryId: "cat-uuid-008",
            serviceId: "srv-uuid-001",
            addedById: "user-uuid-001",
        }
    ];

    return (


        <>

            <div className="mb-8">
                <Header />
                <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
                    <div>
                        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <section className="pt-6 pb-24">
                                <h2 className="mb-4 text-title-4xl font-bold tracking-tight text-gray-900 uppercase">Produit filter</h2>

                                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                    {/* Filters */}
                                    <form className="hidden lg:block bg-white shadow-sm rounded-sm p-6 border border-gray-100">
                                        {/* Categories */}
                                        <h3 className="mb-4 font-medium text-gray-900">Catégories</h3>
                                        <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                                            <div className="space-y-2">
                                                {categories.map((category) => (
                                                    <div className="flex items-center space-x-2" key={category.value}>
                                                        <RadioGroupItem value={category.value} id={`category-${category.value}`} />
                                                        <Label htmlFor={`category-${category.value}`}>{category.label}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </RadioGroup>

                                        {/* Size */}
                                        <h3 className="mt-6 mb-4 font-medium text-gray-900">Taille</h3>
                                        <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                                            <div className="space-y-2">
                                                {sizes.map((size) => (
                                                    <div className="flex items-center space-x-2" key={size.value}>
                                                        <RadioGroupItem value={size.value} id={`size-${size.value}`} />
                                                        <Label htmlFor={`size-${size.value}`}>{size.label}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </RadioGroup>

                                        {/* Price */}
                                        <h3 className="mt-6 mb-4 font-medium text-gray-900">Prix</h3>
                                        <RadioGroup value={selectedPrice} onValueChange={setSelectedPrice}>
                                            <div className="space-y-2">
                                                {prices.map((price) => (
                                                    <div className="flex items-center space-x-2" key={price.value}>
                                                        <RadioGroupItem value={price.value} id={`price-${price.value}`} />
                                                        <Label htmlFor={`price-${price.value}`}>{price.label}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </RadioGroup>

                                        {/* Pointure */}
                                        <h3 className="mt-6 mb-4 font-medium text-gray-900">Pointure</h3>
                                        <RadioGroup value={selectedShoeSize} onValueChange={setSelectedShoeSize}>
                                            <div className="space-y-2">
                                                {shoeSizes.map((shoeSize) => (
                                                    <div className="flex items-center space-x-2" key={shoeSize.value}>
                                                        <RadioGroupItem value={shoeSize.value} id={`shoe-size-${shoeSize.value}`} />
                                                        <Label htmlFor={`shoe-size-${shoeSize.value}`}>{shoeSize.label}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </form>

                                    {/* Product grid */}
                                    <div className="lg:col-span-3">

                                        <div className="w-full py-2 lg:py-4">
                                            <div className="container mx-auto flex flex-col gap-14">
                                                {/* Header section */}
                                                <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
                                                    <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-bold uppercase">  Nos produits</h4>
                                                </div>

                                                {/* Grid de produits hover:opacity-75  */}

                                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                                    {Products.map((product) => (
                                                        <div key={product.id} className="flex flex-col gap-2 cursor-pointer">

                                                            {/* Lien entourant toute la carte sauf BuyingOptions */}
                                                            <Link href={`/product/${product.id}`} passHref>
                                                                <div className="relative w-full bg-muted rounded-md aspect-video mb-4">
                                                                    <div className="absolute top-0 left-0 p-2 text-white bg-orange-400 rounded-tl-md" style={{ zIndex: 10 }}>
                                                                        <p className="italic text-xs">{`20 %`}</p>
                                                                    </div>
                                                                    <Image src={product.imageUrl} alt="" className="h-full w-full object-cover rounded-md" fill />
                                                                </div>

                                                                {/* Informations du produit */}
                                                                <h3 className="text-sm font-bold ">{product.name}</h3>

                                                                {/* Prix et options d'achat */}
                                                                <div className="flex items-center space-x-3 mt-2">
                                                                    <p className="text-muted-foreground text-lg font-bold">{product.price} FCFA</p>
                                                                </div>
                                                            </Link>

                                                            {/* Options d'achat - pas de lien ici */}
                                                            <div className="mt-2">
                                                                <BuyingOptions product={product} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </>

    );

}
