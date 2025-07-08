"use client";

import { Truck, Coffee, Car, DollarSign } from "lucide-react";

const data = [
    {
        icon: <Truck className="w-6 h-6 text-black" />,
        title: "Toujours plus proche de vous",
        description: "Notre réseau s’étend rapidement sur tout le territoire, y compris en dehors des grandes villes.",
    },
    {
        icon: <Coffee className="w-6 h-6 text-black" />,
        title: "Travaillez quand vous voulez",
        description: "La flexibilité est au cœur de nos valeurs, que vous soyez chauffeur ou livreur.",
    },
    {
        icon: <Car className="w-6 h-6 text-black" />,
        title: "Devenez chauffeur",
        description: "Profitez d’une expérience utilisateur intuitive pour gérer vos courses et trajets.",
    },
    {
        icon: <DollarSign className="w-6 h-6 text-black" />,
        title: "Gagnez de l’argent facilement",
        description: "Des paiements rapides et fiables pour vous assurer un revenu régulier.",
    },
];

export function EngagementsSection() {
    return (
        <section className="py-16 bg-white text-black" data-aos="zoom-in" >
            <div className="container mx-auto max-w-7xl px-4">
                <h3 className="text-4xl pb-12 font-semibold">
                    Où que vous alliez, votre sécurité est notre priorité
                </h3>
                <div className="flex flex-col md:flex-row gap-10">
                    <EngagementCard icon={<Truck className="w-14 h-14 text-black" />} title="Conduite sans contact"
                        description="Votre sécurité est primordiale, c’est pourquoi nos partenaires adoptent des mesures strictes pour limiter les contacts."
                    />
                    <EngagementCard
                        icon={<Coffee className="w-14 h-14 text-black" />}
                        title="La propreté avant tout"
                        description="Nos partenaires font le maximum pour que les véhicules soient propres et désinfectés, y compris les surfaces que vous touchez."
                    />
                    <EngagementCard
                        icon={<Car className="w-14 h-14 text-black" />}
                        title="Vérification de vos partenaires"
                        description="Tous nos partenaires passent un contrôle rigoureux avant de pouvoir exercer, pour vous garantir une expérience de qualité."
                    />
                </div>
            </div>
        </section>
    );
}

function EngagementCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <article className="flex flex-col items-start gap-4 max-w-sm">
            <div>{icon}</div>
            <h4 className="text-xl font-semibold">{title}</h4>
            <p className="opacity-70">{description}</p>
        </article>
    );
}