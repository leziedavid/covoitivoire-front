"use client";

import { useState, useEffect } from "react";
import { Truck, ShoppingBag, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceType } from "@/types/AllTypes";
import Header from "@/components/home/header";

// Contenu statique, utilisé comme fallback ou exemple
const serviceDetailsStatic = {

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
  [ServiceType.DELIVERY]: {
    title: "Service de Livraison",
    icon: <Truck className="w-8 h-8 text-blue-600 animate-bounce" />,
    description:
      "Créez facilement une demande de livraison de vos colis. Une fois votre demande envoyée, notre système recherche automatiquement les livreurs disponibles et leur envoie une notification. Si un livreur est disponible et couvre la zone géographique indiquée, il accepte la course et prend en charge la livraison.",
    advantages: [
      "Création simple et rapide d'une demande de livraison",
      "Notification automatique des livreurs disponibles",
      "Aucune gestion manuelle : les livreurs acceptent selon leur disponibilité",
    ],
    billing: ["Mensuel", "Trimestriel", "Semestriel", "Annuel"],
    included:
      "Espace client pour publier vos courses, notifications automatiques aux livreurs, suivi des livraisons et historique complet accessible.",
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

const servicesKeys = Object.keys(serviceDetailsStatic) as (keyof typeof serviceDetailsStatic)[];

interface ServiceDetail {
  title: string;
  icon: React.ReactNode;
  description: string;
  readonly advantages: readonly string[];
  readonly billing: readonly string[];
  included: string;
}


export default function NosServicesPage() {
  const [activeTab, setActiveTab] = useState<ServiceType>(ServiceType.ECOMMERCE);
  const [serviceDetails, setServiceDetails] = useState<
    Record<string, ServiceDetail>
  >(serviceDetailsStatic);

  // ------------------------
  // Simuler un appel API - à remplacer par la vraie API
  // ------------------------
  /*
  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/services"); // Modifier l'URL selon ton API
        if (!response.ok) throw new Error("Erreur API");

        const data = await response.json();

        // Transforme les données API au format attendu ici, par ex :
        const mappedData: Record<string, ServiceDetail> = {};

        data.forEach((svc: any) => {
          mappedData[svc.type] = {
            title: svc.title,
            icon: // Tu peux mapper le type à une icône ici si nécessaire,
              svc.type === "DELIVERY" ? <Truck className="w-8 h-8 text-blue-600 animate-bounce" /> :
              svc.type === "ECOMMERCE" ? <ShoppingBag className="w-8 h-8 text-green-600 animate-pulse" /> :
              <Utensils className="w-8 h-8 text-orange-600 animate-wiggle" />,
            description: svc.description,
            advantages: svc.advantages,
            billing: svc.billing,
            included: svc.included,
          };
        });

        setServiceDetails(mappedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des services", error);
        // Tu peux garder le contenu statique en cas d'erreur
      }
    }

    fetchServices();
  }, []);
  */

  const service = serviceDetails[activeTab];

  return (
    <>
      <Header />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">

        <h1 className="text-3xl font-bold mb-8 text-center">Nos Services</h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {servicesKeys.map((key) => {
            const isActive = key === activeTab;
            const svc = serviceDetails[key];
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key as ServiceType)}
                className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition
                ${isActive
                    ? "border-orange-500 bg-orange-200 bg-opacity-30 text-orange-700 shadow-md"
                    : "border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-600"
                  }
              `}
                aria-current={isActive ? "true" : undefined}
              >
                {svc.icon}
                <span className="whitespace-nowrap">{svc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              {service.icon}
              {service.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <section>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p>{service.description}</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Avantages</h3>
              <ul className="list-disc list-inside space-y-1">
                {service.advantages.map((adv, idx) => (
                  <li key={idx}>{adv}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Options de facturation</h3>
              <div className="flex flex-wrap gap-2">
                {service.billing.map((plan, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium shadow"
                  >
                    {plan}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Inclus dans ce service</h3>
              <p>{service.included}</p>
            </section>
          </CardContent>
        </Card>
      </div>

    </>

  );
}
