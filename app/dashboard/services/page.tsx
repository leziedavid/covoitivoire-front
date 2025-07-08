'use client'

import React, { useEffect, useState } from 'react'
import { LucideIcon, Utensils, Truck,Boxes,Store,} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { getAllServices } from '@/api/services/authService'
import { Service } from '@/types/ApiReponse/ServicesResponse'
import { Button } from '@/components/ui/button'
import { useOrderSocket } from '@/lib/socket/useOrderSocket';

export interface Product { }
export interface MenuItem { }
export interface Delivery { }
export interface ServiceSubscription { }

// export interface Service {
//     id: string
//     name: string
//     description?: string
//     type: 'RESTAURANT' | 'DELIVERY' | 'OTHER'
//     imageUrl?: string
//     icon?: LucideIcon
//     partnerId: string
//     createdAt: string
//     updatedAt: string
//     price: number
//     promoPrice: number
//     isActivePromo: boolean
//     statusService: boolean
//     products: Product[]
//     menuItems: MenuItem[]
//     deliveries: Delivery[]
//     subscriptions: ServiceSubscription[]
// }

export default function ServicesPage() {

    useOrderSocket() // ← Active les sockets seulement ici
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [services, setService] = useState<Service[]>([]);


        const fetchData = async (page: number) => {
            try {
                const res = await getAllServices(page, limit);
                if (res.data) {
                    setService(res.data.data);
                    setTotalItems(res.data.total);
                    setCurrentPage(res.data.page);
                }
            } catch (e) {
                console.error(e);
            }
        };
    
        useEffect(() => {
            fetchData(currentPage);
        }, [currentPage]);
    
    // getAllServices

    const handleSubscribe = async (serviceId: string) => {
        try {
            // Appel API ici
            // await fetch(`/api/subscribe/${serviceId}`, { method: 'POST' })
            toast.success('Souscription réussie')
        } catch (error) {
            toast.error('Échec de la souscription')
        }
    }

    return (
        <section className="bg-gray-50 py-8 dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Nos services
                    </h2>
                </div>


                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {services.map((service) => {
                        const Icon = service.icon
                        return (
                            <div key={service.id} className={`flex flex-col justify-between h-full gap-2 rounded-lg border border-gray-200 p-4 transition ${service.statusService ? 'bg-white hover:bg-gray-50 cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700' : 'bg-gray-100 opacity-50 pointer-events-none dark:bg-gray-700'  }`} >
                                
                                <div className="flex items-center gap-2">
                                    {Icon && (
                                        <Icon className="h-5 w-5 text-gray-900 dark:text-white"/>
                                    )}
                                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate uppercase">
                                        {service.name}
                                    </p>
                                </div>

                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                    {service.description}
                                </p>
                                {service.statusService && (
                                    <Button onClick={() => handleSubscribe(service.id)} className="mt-2 w-full text-xs sm:text-sm font-semibold text-black bg-gray-100 hover:bg-primary-700 rounded px-3 py-1 transition cursor-pointer">
                                        CONSULTER
                                    </Button>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Politique */}
                <div className="mt-10">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Notre politique de service
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        Nous nous engageons à offrir des services de qualité, sécurisés et adaptés à vos besoins. Chaque service est vérifié et suivi pour garantir une satisfaction maximale. Notre équipe reste à votre écoute pour toute assistance concernant votre souscription ou l'utilisation des services.
                    </p>
                </div>
            </div>
        </section>
    )
}


