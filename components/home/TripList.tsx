import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Share2, Car, MapPin, CalendarDays, Clock, MapPinned } from "lucide-react";
import { Vehicle } from "@/types/AllTypes";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {getUserId, isUserAuthenticated } from "@/app/middleware";
import { toast } from 'sonner';
import { createOrder } from "@/api/services/authService";

export interface Trip {
    id: string;
    departure: string;
    arrival: string;
    date: string;
    departureTime: string | null;
    arrivalTime: string | null;
    price: number;
    availableSeats: number;
    vehicle: Vehicle;
}

interface TripListProps {
    trips: Trip[];
}

export default function TripList({ trips }: TripListProps) {

    const [loadingId, setLoadingId] = useState<string | null>(null);
    const router = useRouter();

    const submitOrder = async (tripId: string) => {
        const isLoggedIn = await isUserAuthenticated();

        if (!isLoggedIn) {
            
            // 👉 Stocker l’action à effectuer après connexion
            localStorage.setItem("action", "createOrder");

            toast("Connexion requise", {
                description: "Veuillez vous connecter avant de réserver.",
                action: {
                    label: "Se connecter",
                    onClick: () => router.push("/auth/login"),
                },
            });

            setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
            return;
        }

        const userId = await getUserId();

        if (!userId) {

            toast("Erreur", {
                description: "Utilisateur non identifié.",
            });
            return;
        }

        try {
            setLoadingId(tripId);
            const response = await createOrder(tripId, userId);

            if (response.statusCode === 201) {
                toast("Réservation confirmée", {
                    description: "Votre commande a été passée avec succès !",
                });
                console.log("✅ Commande créée :", response.data);
            } else {
                toast("Erreur lors de la commande", {
                    description: response.message || "Échec de la commande.",
                });
                console.warn("⚠️ Commande non acceptée :", response);
            }
        } catch (error: any) {
            toast("Erreur serveur", {
                description: error?.message || "Une erreur inattendue est survenue.",
            });
            console.error("❌ Erreur lors de la commande :", error);
        } finally {
            setLoadingId(null);
        }
    };

    return (

        <div className="p-2 sm:p-4">
            <div className="max-w-3xl mx-auto space-y-2 w-full sm:max-w-4xl">
                {trips.map((trip) => (
                    <Card key={trip.id} className="p-2 sm:p-4">
                        <div className="flex items-start gap-2 sm:gap-4">
                            <Image src="/ride.png" alt="Ride" width={40} height={40} className="rounded w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]" />
                            <CardContent className="flex-1 space-y-1 p-0">
                                <h2 className="text-base sm:text-lg font-semibold">
                                    Trajet disponible
                                </h2>

                                <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm text-gray-700">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                                        <span><strong>Départ :</strong> {trip.departure}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                                        <span><strong>Arrivée :</strong> {trip.arrival}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                                        <span><strong>Date départ :</strong> {trip.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                                        <span><strong>Départ :</strong> {trip.departureTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                                        <span><strong>Arrivée :</strong> {trip.arrivalTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Car className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                                        <span><strong>Véhicule :</strong> {trip.vehicle.name}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-sm sm:text-base font-bold text-green-600">
                                        {trip.price} FCFA
                                    </span>
                                    <span className="text-sm sm:text-base">
                                        {trip.availableSeats} places
                                    </span>
                                </div>

                                <div className="flex gap-1 sm:gap-2 mt-2">
                                    <Button size="sm" className="text-xs sm:text-sm px-2 sm:px-4 bg-orange-500" onClick={() => submitOrder(trip.id)} disabled={loadingId === trip.id} >
                                        {loadingId === trip.id ? "Réservation..." : "Réserver"}
                                    </Button>

                                    <Button size="sm" variant="outline" className="p-1 sm:p-2">
                                        <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </Button>

                                    <Button size="sm" variant="outline" className="p-1 sm:p-2">
                                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </Button>

                                    <Link href={`/map/${trip.id}`}>
                                        <Button size="sm" variant="outline" className="p-1 sm:p-2">
                                            <MapPinned className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

