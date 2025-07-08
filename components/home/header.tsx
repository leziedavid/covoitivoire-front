"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';  // Import de Image de Next.js
import { LucideBell, LucideLoader, LucideMail, LucideUser2, LucideLogIn, LucideMenu, LucideTrash2, LucideHome, LucidePackage, LucideImage, LucideInfo, ShoppingBag, ShoppingBasket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, } from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useCart } from '@/app/context/CartProvider';
import SideCart from '../SideCart';

// Composant Header principal
const Header: React.FC = ({ }) => {

    const { countAllItems } = useCart();
    const [showSideCart, setShowSideCart] = useState(false);
    const cartItems = countAllItems();
    const [isOpen, setOpen] = useState(false);

    const navigationItems = [
        {
            title: "ACCUEIL",
            href: "/",
            description: "",
            icon: <LucideHome className="w-4 h-4 mr-2" /> // Icône pour ACCUEIL
        },
        {
            title: "TRAJETS",
            href: "/trajets",
            description: "",
            icon: <LucidePackage className="w-4 h-4 mr-2" /> // Icône pour PRODUITS
        },
        {
            title: "BOUTIQUE",
            href: "/boutique",
            description: "",
            icon: <LucideImage className="w-4 h-4 mr-2" /> // Icône pour REALISATIONS
        },
        {
            title: "A PROPOS",
            href: "/apropos",
            description: "",
            icon: <LucideInfo className="w-4 h-4 mr-2" /> // Icône pour A PROPOS
        },
    ];

    return (
        <header className="flex flex-col items-center fixed top-0 z-50 w-full shadow-sm">

            <div className="py-4 md:py-2 items-center w-full bg-black text-white">

                <div className="max-w-7xl mx-4 px-4 lg:mx-auto flex justify-between items-center gap-x-10">

                    <div className="flex justify-start items-center gap-4 ">
                        <Link href="/" className="flex items-center">
                            <Image src="/logoHome.png" alt="Logo" className="h-10" width={100} height={100} />
                        </Link>
                    </div>

                    {/* Navigation pour les écrans plus grands */}
                    <nav className="hidden md:flex gap-3">
                        <NavigationMenu className="flex justify-start items-start">
                            <NavigationMenuList className="flex justify-start gap-4 flex-row">
                                {navigationItems.map((item) => (

                                    <NavigationMenuItem key={item.title}>
                                        {item.href ? (
                                            <>
                                                <NavigationMenuLink href={item.href}>
                                                    {item.title}
                                                </NavigationMenuLink>
                                            </>
                                        ) : (
                                            <>
                                                <NavigationMenuTrigger className="font-medium text-sm font-extrabold font-title tracking-tight text-lg">
                                                    {/* {item.icon} */}
                                                    {item.title}
                                                </NavigationMenuTrigger>
                                            </>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    <div className="flex  gap-x-2">
                        {/* Icône du panier */}
                        <div className="flex  gap-x-2">
                            <div>

                                <button
                                    onClick={() => setShowSideCart(true)}
                                    className="relative bg-gray-200 p-2 rounded-full"
                                >
                                    <ShoppingBasket className="w-5 h-5 text-white" />
                                    {cartItems > 0 && (
                                        <div className="font-semibold absolute text-white bg-orange-600 text-xs w-4 h-4 rounded-full flex items-center justify-center -top-2 -right-2">
                                            {cartItems >= 9 ? "9+" : cartItems}
                                        </div>
                                    )}
                                </button>
                                {/* <ShoppingBasket className="w-5 h-5 text-white" /> */}
                            </div>
                        </div>
                    </div>

                    <div className="flex w-12 shrink lg:hidden items-end justify-end">

                        <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </Button>

                        {isOpen && (
                            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
                                {navigationItems.map((item) => (
                                    <div key={item.title}>
                                        <div className="flex flex-col gap-2">
                                            {item.href ? (
                                                <Link href={item.href} className="flex justify-between items-center" >
                                                    <span onClick={() => setOpen(!isOpen)} className="text-sm font-extrabold font-title tracking-tighter flex items-center text-black">
                                                        {item.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                                </Link>
                                            ) : (
                                                <p onClick={() => setOpen(!isOpen)} className="text-sm font-extrabold font-title tracking-tighter flex items-center text-black cursor-pointer">
                                                    {/* {item.icon} */}
                                                    {item.title}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                </div>

            </div>

            <SideCart visible={showSideCart} onRequestClose={() => setShowSideCart(false)} />

        </header>
    );
};

export default Header;
