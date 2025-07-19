"use client";

import Link from "next/link";
import { Truck, ShoppingBag, Utensils, CarFront } from "lucide-react";

export const Footer = () => {
    const services = [
        {
            icon: <CarFront className="h-8 w-8" />,
            title: "Covoiturage",
            href: "/",
        },
        {
            icon: <ShoppingBag className="h-8 w-8" />,
            title: "E-Commerce",
            href: "/boutique",
        },
        {
            icon: <Truck className="h-8 w-8" />,
            title: "Livraison",
            href: "/",
        },
        {
            icon: <Utensils className="h-8 w-8" />,
            title: "Restauration",
            href: "/",
        },
    ];

    const company = [
        { title: "À propos", href: "/about" },
        { title: "Contact", href: "/contact" },
        { title: "Presse", href: "/press" },
        { title: "Investisseurs", href: "/investors" },
    ];

    const legal = [
        { title: "Conditions d'utilisation", href: "/terms" },
        { title: "Politique de confidentialité", href: "/privacy" },
        { title: "Cookies", href: "/cookies" },
    ];

    return (
        <footer className="bg-foreground text-background py-20 px-6 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div>
                    <h2 className="text-3xl font-bold mb-6 tracking-tight">COVOITIVOIRE</h2>
                    <p className="text-lg text-background/80 leading-relaxed">
                        La plateforme de covoiturage et de services connectés pour faciliter vos trajets, livraisons, ventes et repas.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-4">Nos Services</h3>
                    <ul className="space-y-3 text-lg">
                        {services.map(({ title, href, icon }) => (
                            <li key={title}>
                                <Link href={href} className="flex items-center gap-3 hover:underline">
                                    {icon}
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-4">Entreprise</h3>
                    <ul className="space-y-3 text-lg">
                        {company.map(({ title, href }) => (
                            <li key={title}>
                                <Link href={href} className="hover:underline">
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-4">Légal</h3>
                    <ul className="space-y-3 text-lg">
                        {legal.map(({ title, href }) => (
                            <li key={title}>
                                <Link href={href} className="hover:underline">
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-16 border-t border-background/30 pt-6 text-center text-base text-background/60">
                &copy; {new Date().getFullYear()} Covoitivoire. Tous droits réservés.
            </div>
        </footer>
    );
};
