"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/home/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {X,Filter,LayoutGrid,Plus,Minus,Check,} from "lucide-react";
import BuyingOptions from "@/components/BuyingOptions";

interface WarrantyItem {
  id: string;
  name: string;
  status: "pending" | "active";
  warrantyLength: number;
  warrantyType: "Extended" | "Limited";
  expirationDate: string;
  imageUrl?: string;
}

const warrantyItems: WarrantyItem[] = [
  {
    id: "1",
    name: 'Apple iMac 27", 1TB HDD, Retina 5K',
    status: "pending",
    warrantyLength: 24,
    warrantyType: "Extended",
    expirationDate: "Friday 16 Jul 2026",
  },
  {
    id: "2",
    name: "Apple iPhone 14",
    status: "active",
    warrantyLength: 12,
    warrantyType: "Limited",
    expirationDate: "Sunday 30 Sep 2025",
  },
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


export default function Page() {

  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <Header />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        {/* Header */}
        <div className="flex items-baseline justify-between pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Nos articles</h1>
          {/* Bouton filtre mobile */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setFilterOpen(true)}>
              <Filter className="size-5" />
              <span className="sr-only">Filtres</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filtres Desktop */}
          <aside className="hidden lg:block space-y-4">
            <h2 className="font-semibold text-lg">Catégories</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Totes</a></li>
              <li><a href="#">Backpacks</a></li>
            </ul>

            <h2 className="font-semibold text-lg">Variante</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Totes</a></li>
              <li><a href="#">Backpacks</a></li>
            </ul>

          </aside>
          

          {/* Produits */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Products.map((product) => (
                <div key={product.id} className="flex flex-col gap-2 cursor-pointer">
                  <Link href={`/product/${product.id}`} passHref>
                    <div className="relative w-full bg-muted rounded-md aspect-video mb-4 overflow-hidden">
                      <div className="absolute top-0 left-0 p-2 text-white bg-orange-400 rounded-tl-md z-10">
                        <p className="italic text-xs">20 %</p>
                      </div>
                      <Image src={product.imageUrl} alt={product.name} className="object-cover rounded-md" fill  />
                    </div>
                    <h3 className="text-sm font-bold">{product.name}</h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <p className="text-muted-foreground text-lg font-bold">{product.price} FCFA</p>
                    </div>
                  </Link>
                  <div className="mt-2">
                    <BuyingOptions product={product} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal filtre mobile */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex justify-center items-start pt-32 px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-medium text-lg">Filtres</h2>
                <Button variant="ghost" size="icon" onClick={() => setFilterOpen(false)}>
                  <X className="size-5" />
                  <span className="sr-only">Fermer</span>
                </Button>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Catégorie</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" /> <span>Totes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" /> <span>Backpacks</span>
                    </label>
                  </div>

                  <label className="block text-sm font-medium mb-1">Variante</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" /> <span>Totes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" /> <span>Backpacks</span>
                    </label>
                  </div>
                  
                </div>
                <Button className="w-full" onClick={() => setFilterOpen(false)}>
                  Appliquer les filtres
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
