"use client";

import { X, Truck, ShoppingBag, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServiceType } from "@/types/AllTypes";

type ServicesInfosProps = {
    servicesTypes: string | null;
    isOpen: boolean;
    onClose: () => void;
};

const serviceDetails = {
    [ServiceType.DELIVERY]: {
        title: "Service de Livraison",
        icon: <Truck className="w-8 h-8 text-blue-600 animate-bounce" />,
        description:
            "Optimisez vos livraisons grâce à notre solution professionnelle. Gérez les courses, suivez vos chauffeurs en temps réel et offrez une expérience client fluide.",
        advantages: [
            "Suivi GPS en temps réel",
            "Gestion des chauffeurs et véhicules",
            "Notifications automatisées (SMS/Email)",
        ],
        billing: ["Mensuel", "Trimestriel", "Semestriel", "Annuel"],
        included: "Accès au tableau de bord de gestion des livraisons et notifications automatiques.",
    },
    [ServiceType.ECOMMERCE]: {
        title: "Service e-Commerce",
        icon: <ShoppingBag className="w-8 h-8 text-green-600 animate-pulse" />,
        description:
            "Créez votre boutique en ligne et laissez-nous vous apporter de la clientèle. Vous ajoutez vos produits depuis votre espace boutique, nous assurons la visibilité et vous mettons en relation avec des acheteurs qualifiés.",
        advantages: [
            "Mise en ligne rapide de vos produits",
            "Visibilité garantie sur notre marketplace",
            "Accès à un tableau de bord de gestion",
        ],
        billing: ["Mensuel", "Trimestriel", "Semestriel", "Annuel"],
        included:
            "Espace boutique dédié, gestion complète des commandes, tableaux de suivi des ventes, support client et outils marketing intégrés.",
    },

    [ServiceType.RESTAURANT]: {
        title: "Service Restauration",
        icon: <Utensils className="w-8 h-8 text-orange-600 animate-wiggle" />,
        description:
            "Digitalisez votre restaurant et gagnez en visibilité. Nous vous mettons en relation avec de nouveaux clients, mais la gestion des menus, des commandes et du suivi des livraisons se fait directement depuis votre espace restaurant.",
        advantages: [
            "Création simple de votre menu en ligne",
            "Visibilité renforcée auprès des clients locaux",
            "Gestion des commandes depuis votre interface",
        ],
        billing: ["Mensuel", "Trimestriel", "Semestriel", "Annuel"],
        included:
            "Espace restaurant personnalisé, QR code menu, gestion autonome des commandes et des livraisons, assistance client, statistiques avancées.",
    },

} as const;

export function ServicesInfos({ isOpen, onClose, servicesTypes }: ServicesInfosProps) {
    const service = servicesTypes && serviceDetails[servicesTypes as ServiceType];

    if (!service) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50">
            <div
                className={`fixed top-0 right-0 z-40 h-screen p-6 overflow-y-auto transition-transform transform ${isOpen ? "translate-x-0 w-full md:w-[50vw]" : "translate-x-full"
                    } bg-white rounded-l-xl shadow-xl`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                        {service.icon}
                        {service.title}
                    </h2>
                    <Button onClick={onClose} className="bg-red-500 text-white rounded-full w-8 h-8">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">{service.description}</p>
                    </CardContent>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>Avantages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc ml-5 space-y-1 text-gray-700">
                            {service.advantages.map((adv, idx) => (
                                <li key={idx}>{adv}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>Options de facturation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {service.billing.map((plan, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 shadow"
                                >
                                    {plan}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Inclus dans ce service</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700">{service.included}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
