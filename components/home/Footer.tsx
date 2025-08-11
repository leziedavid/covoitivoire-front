"use client";
import Link from "next/link";
import Image from 'next/image';  // Import de Image de Next.js
import { Truck, ShoppingBag, Utensils, CarFront, AlertTriangle, CloudRain, Shield, Banknote, MessageCircle, Phone, MapPin, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';


export const Footer = () => {
    const services = [
        {
            icon: <CarFront className="h-8 w-8" />,
            title: "Déplacez-vous avec covoitivoire",
            href: "/",
        },
        {
            icon: <ShoppingBag className="h-8 w-8" />,
            title: "Vendre et acheter sur covoitivoire",
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

        <div className="bg-gradient-to-b from-[#000000] to-[#9ecdd6] text-white py-14 md:py-28  w-full">
            
            <div className="max-w-6xl mx-auto px-6 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Colonne 1 : Logo + description */}
                    <div className="space-y-4">
                        <Image
                            src="/logoHome.png"
                            alt="logo"
                            className="h-20 md:h-20"
                            width={200}
                            height={250}
                            layout="intrinsic"
                        />
                        <p className="text-lg break-words">
                            Conduisez quand vous voulez, générez des revenus sur mesure.
                        </p>
                        <p className="text-lg break-words">
                            Covoitivoire est une plateforme de covoiturage connectée qui vous
                            permet de gérer vos trajets, livraisons, ventes et repas.
                        </p>
                    </div>

                    {/* Colonne 2 : Services */}
                    <div className="space-y-4">
                        <h3 className="uppercase text-xl font-bold">Services</h3>
                        <div className="flex flex-col gap-y-3 text-base font-normal">
                            {services.map(({ title, href, icon }) => (
                                <Link href={href} key={title} className="hover:underline">
                                    {title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Colonne 3 : Contact + Réseaux */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="uppercase text-xl font-bold">Contact</h3>
                            <div className="flex flex-col gap-y-3 text-base font-normal mt-3">
                                <div>
                                    Ligne d’assistance
                                    <br />
                                    <span className="text-[#BFC1BF]">0176898765</span>
                                </div>
                                <div>
                                    Emplacement
                                    <br />
                                    <span className="text-[#BFC1BF]">COTE D'IVOIRE</span>
                                </div>
                                <div>
                                    Email
                                    <br />
                                    <span className="text-[#BFC1BF]">info@covoitivoire.com</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="uppercase text-xl font-bold">Suivez-nous sur ...</h3>
                            <div className="flex space-x-5 mt-3">
                                <Instagram size={30} strokeWidth={3} absoluteStrokeWidth />
                                <Linkedin size={30} strokeWidth={3} absoluteStrokeWidth />
                                <Facebook strokeWidth={3} absoluteStrokeWidth />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};
