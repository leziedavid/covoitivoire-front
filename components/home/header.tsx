"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';  // Import de Image de Next.js
import { LucideBell, LucideLoader, LucideMail, LucideUser2, LucideLogIn, LucideMenu, LucideTrash2, LucideHome, LucidePackage, LucideImage, LucideInfo, ShoppingBag, ShoppingBasket, PanelLeftClose, PanelLeftOpen, ShieldCheck, LifeBuoy, Settings, Wallet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, } from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useCart } from '@/app/context/CartProvider';
import SideCart from '../SideCart';
import { motion } from "framer-motion";
import Securite from '../securite/Securite';
import SupportServiceApp from '../securite/SupportServiceApp';
import { isSessionStillValid } from '@/app/middleware';
import Parametres from '../parametres/Parametres';

// Composant Header principal
const Header: React.FC = ({ }) => {

    const { countAllItems } = useCart();
    const [showSideCart, setShowSideCart] = useState(false);
    const cartItems = countAllItems();
    const [isOpen, setOpen] = useState(false);
    const [openSecurite, setOpenSecurite] = useState(false);
    const [openServiceApp, setOpenServiceApp] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [openParametres, setOpenParametres] = useState(false);

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
        //  service

        {
            title: "SERVICE",
            href: "/services",
            description: "",
            icon: <LucidePackage className="w-4 h-4 mr-2" /> // Icône de service
        },

        {
            title: "A PROPOS",
            href: "/apropos",
            description: "",
            icon: <LucideInfo className="w-4 h-4 mr-2" /> // Icône pour A PROPOS
        },
    ];

    // openSecurite fonction pour ouvrir la sécurité
    const openSecuriteSheet = () => {
        setOpen(false);
        setOpenSecurite(true);
    };

    const openServiceAppSheet = () => {
        setOpen(false);
        setOpenSecurite(false);
        setOpenServiceApp(true);

    };

    const openParametresSheet = () => {
        setOpen(false);
        setOpenSecurite(false);
        setOpenServiceApp(false);
        setOpenParametres(true);
    };

    const getIsAuthenticated = async () => {
        const res = await isSessionStillValid()
        setIsAuthenticated(res)
    }

    useEffect(() => {
        getIsAuthenticated()
    }, [])

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

                        <Button variant="ghost" className='bg-white' onClick={() => setOpen(!isOpen)}>
                            {isOpen ? <X className="w-8 h-8 text-black" /> : <Menu className="w-8 h-8 text-black" />}
                        </Button>

                        {isOpen && (
                            <motion.div className="fixed bottom-0 inset-x-0 z-50 bg-white rounded-t-2xl shadow-xl h-[95vh] sm:h-[85vh] overflow-y-auto"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                drag="y"
                                dragConstraints={{ top: 0, bottom: 0 }}
                                onDragEnd={(event, info) => {
                                    if (info.point.y > 100) setOpen(false); // glissement vers le bas
                                }} >

                                {/* Barre de glissement */}
                                <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto my-4 cursor-pointer hover:bg-gray-400 transition" onClick={() => setOpen(false)} />

                                {/* Modes de paiement */}
                                <div className="flex items-center justify-between mb-6 px-8">
                                    <div>
                                        <div className="text-sm font-semibold text-black">Modes de paiement</div>
                                        <div className="text-xs text-muted-foreground">Espèces</div>
                                    </div>
                                    <Wallet className="h-8 w-8 text-black" />
                                </div>


                                {/* Sécurité / Assistance / Paramètres */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="flex flex-col items-center justify-center text-center text-xs text-muted-foreground">
                                        <div onClick={() => openSecuriteSheet()}  className="bg-gray-100 rounded-full p-2">
                                            <ShieldCheck className="h-8 w-8 text-black" />
                                        </div>
                                        Sécurité
                                    </div>

                                    <div className="flex flex-col items-center justify-center text-center text-xs text-muted-foreground">
                                        <div onClick={isAuthenticated ? () => openServiceAppSheet() : undefined} className={`rounded-full p-2 ${isAuthenticated ? 'bg-gray-100 cursor-pointer' : 'bg-gray-200 cursor-not-allowed opacity-50' }`} >
                                            <LifeBuoy className="h-8 w-8 text-black" />
                                        </div>
                                        Assistance
                                    </div>

                                    <div className="flex flex-col items-center justify-center text-center text-xs text-muted-foreground">
                                        <div onClick={isAuthenticated ? () => openParametresSheet() : undefined}  className={`rounded-full p-2 ${isAuthenticated ? 'bg-gray-100 cursor-pointer' : 'bg-gray-200 cursor-not-allowed opacity-50' }`} >
                                            <Settings className="h-8 w-8 text-black" />
                                        </div>
                                        Paramètres
                                    </div>

                                </div>

                                {/* Navigation */}
                                <div className="border-t pt-4 pb-2 px-4">
                                    <div className="flex flex-col gap-4">
                                        {navigationItems.map((item) => (
                                            <Link key={item.title} href={item.href} onClick={() => setOpen(false)}>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-semibold text-black">{item.title}</span>
                                                    <MoveRight className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Déconnexion */}
                                <div className="border-t mt-4 pt-4 pb-6 px-4">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-2 text-sm text-red-600 font-medium"
                                    >
                                        <LucideLogIn className="h-4 w-4" />
                                        Se déconnecter
                                    </button>
                                </div>

                            </motion.div>
                        )}

                    </div>

                </div>

            </div>

            <SideCart visible={showSideCart} onRequestClose={() => setShowSideCart(false)} />
            <Securite onClose={() => setOpenSecurite(false)} isOpen={openSecurite} />
            <SupportServiceApp onClose={() => setOpenServiceApp(false)} isOpen={openServiceApp} />
            <Parametres onClose={() => setOpenParametres(false)} isOpen={openParametres} />
            

        </header>
    );
};

export default Header;
