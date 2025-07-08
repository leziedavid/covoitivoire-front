"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Bell, House, Menu, MoveRight, ShoppingBag, ShoppingCart, X } from "lucide-react"; // <- Ajout de ShoppingBag
import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';  // Import de Image de Next.js

export const Header = () => {
    const navigationItems = [
        {
            title: "Trajets",
            href: "/trajets",
        },
        {
            title: "Boutique",
            href: "/boutique",
        },
        {
            title: "À propos",
            description: "En savoir plus sur l’entreprise Covoitivoire",
            items: [
                { title: "À propos", href: "/a-propos" },
                { title: "Investisseurs", href: "/investisseurs" },
                { title: "Contact", href: "/contact" },
            ],
        },
    ];

    const [isOpen, setOpen] = useState(false);

    return (
        <>

                  <nav className="flex justify-between items-center py-4 mb-8">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <Link href="/" className="text-2xl font-black">
                Lama Shop
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <House className="w-5 h-5" />
              <Bell className="w-5 h-5" />
              <ShoppingCart className="w-5 h-5" />
              <Image
                src="/avatar.png"
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full border border-gray-300"
              />
            </div>
          </nav>


            <header className="w-full z-40 fixed top-0 left-0 bg-black ">
                {/* Desktop Header */}
                <div className="container mx-auto hidden lg:flex items-center justify-between min-h-20 px-4 py-2 bg-black text-white">
                    {/* Logo */}
                    <div className="font-extrabold text-xl sm:text-xl">Covoitivoire</div>

                    {/* Desktop Menu */}
                    <div className="flex gap-6 items-center">
                        <NavigationMenu>
                            <NavigationMenuList className="flex gap-4">
                                {navigationItems.map((item) => (
                                    <NavigationMenuItem key={item.title}>
                                        {item.href ? (
                                            <NavigationMenuLink asChild>
                                                <Link href={item.href} className="px-4 py-2 text-sm font-bold text-white rounded-md hover:bg-[#ffb44b] transition-colors" >
                                                    {item.title}
                                                </Link>
                                            </NavigationMenuLink>
                                        ) : (
                                            <>
                                                <NavigationMenuTrigger className="px-4 py-2 text-sm font-bold text-black rounded-md transition-colors">
                                                    {item.title}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent className="!w-[400px] p-4 shadow-lg bg-white border rounded-md text-black">
                                                    <div className="flex flex-col gap-2">
                                                        <p className="text-base font-semibold mb-2">{item.description}</p>
                                                        {item.items?.map((subItem) => (
                                                            <NavigationMenuLink href={subItem.href} key={subItem.title} className="flex justify-between gap-2 px-4 py-2 font-medium text-black rounded-md transition-colors" >
                                                                <span>{subItem.title}</span>
                                                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </div>
                                                </NavigationMenuContent>
                                            </>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                        <Button variant="outline" className="font-semibold border-white text-black hover:bg-white hover:text-black">
                            Se connecter
                        </Button>

                        <Button variant="ghost" className="text-white hover:bg-white">
                            <ShoppingBag className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Header (style inchangé, en clair) */}
                <div className="container mx-auto lg:hidden flex items-center justify-between min-h-20 px-4">
                    {/* Logo */}
                    <div className="font-extrabold text-xl sm:text-2xl">Covoitivoire</div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost">
                            <ShoppingBag className="w-8 h-8 text-white" />
                        </Button>
                        <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-5 h-5 text-white" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile menu panel */}

                {/* Mobile menu panel */}
                {isOpen && (
                    <div className="fixed top-0 left-0 w-full h-full z-50 bg-white p-4 animate-in slide-in-from-top duration-300 flex flex-col gap-0 overflow-y-auto">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-extrabold text-2xl">Covoitivoire</span>
                            <Button variant="ghost" onClick={() => setOpen(false)} className="p-1">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {navigationItems.map((item) => (
                            <div key={item.title} className="flex flex-col gap-0">
                                {item.href ? (
                                    <Link href={item.href} className="flex justify-between items-center px-4 py-4 text-lg font-extrabold rounded-md hover:bg-[#f6f6f6] transition">
                                        <span>{item.title}</span>
                                        <MoveRight className="w-4 h-4 text-muted-foreground" />
                                    </Link>
                                ) : (
                                    <>
                                        <p className="text-xl font-extrabold px-4 py-1">{item.title}</p>
                                        {item.items?.map((subItem) => (
                                            <Link
                                                key={subItem.title}
                                                href={subItem.href}
                                                className="flex justify-between px-4 py-1 text-base font-semibold text-muted-foreground rounded-md hover:bg-[#f6f6f6] transition"
                                            >
                                                <span>{subItem.title}</span>
                                                <MoveRight className="w-4 h-4" />
                                            </Link>
                                        ))}
                                    </>
                                )}
                            </div>
                        ))}

                        {/* Connexion dans menu mobile */}
                        <div className="flex flex-col gap-0 pt-2 mt-2 border-t">
                            <Button variant="outline" className="font-semibold py-1.5">Se connecter</Button>
                        </div>
                    </div>
                )}

            </header>
        </>


    );
};
