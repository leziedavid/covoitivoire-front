"use client";

import Image from "next/image";

const infos = [
    {
        src: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_220,h_220/v1613701626/assets/ba/f5f44a-909a-42c1-bac6-dba64b3d38f1/original/Driver-vehicle-icon.png",
        alt: "Véhicule inspecté",
        title: "Véhicule inspecté",
        description: "Tous les véhicules sont inspectés et doivent répondre aux normes de sécurité strictes.",
    },
    {
        src: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_220,h_220/v1613701632/assets/26/9ac4c4-7b1a-48a4-9888-9a6f4bf52924/original/Police-background-check-icon.png",
        alt: "Vérification de sécurité",
        title: "Vérification de sécurité",
        description: "Tous les chauffeurs sont soumis à des vérifications rigoureuses avant de rejoindre notre plateforme.",
    },
    {
        src: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_220,h_220/v1613701637/assets/07/5e4b24-5c2e-4b2f-b5e0-785c0b263450/original/Insurance-icon.png",
        alt: "Assurance complète",
        title: "Assurance complète",
        description: "Nous fournissons une couverture d'assurance complète pour tous les trajets effectués via Uber.",
    },
    {
        src: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_220,h_220/v1613701642/assets/2c/c9be24-7a61-4cc1-bd0e-d099e0cfc57c/original/Available-in-cities-icon.png",
        alt: "Disponible dans les villes",
        title: "Disponible dans les villes",
        description: "Uber est disponible dans plus de 100 villes à travers le pays.",
    },
];

export function SafetyInfoSection() {
    return (
        <section className="py-20 bg-white text-black">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {infos.map(({ src, alt, title, description }) => (
                        <div key={title} className="flex flex-col items-center gap-4 text-center">
                            <Image src={src} alt={alt} width={220} height={220} className="rounded-full object-cover" />
                            <h3 className="font-semibold text-lg">{title}</h3>
                            <p className="text-sm opacity-80">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
