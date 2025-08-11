// components/RideShareCard.tsx
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Car } from "lucide-react";
import { FC } from "react";

type Passenger = {
    id: string;
    avatarUrl: string;
};

export const RideShareCard: FC = () => {
    // 📌 Données fictives intégrées pour le covoiturage
    const imageUrl = "/voiture.jpg"; // image du trajet
    const title = "Abidjan → Yamoussoukro";
    const totalSeats = 5;
    const reservedSeats = 3;
    const passengers: Passenger[] = [
        { id: "1", avatarUrl: "/avatars/user1.png" },
        { id: "2", avatarUrl: "/avatars/user2.png" },
        { id: "3", avatarUrl: "/avatars/user3.png" },
    ];

    const percentage = Math.min(
        Math.round((reservedSeats / totalSeats) * 100),
        100
    );

    return (
        <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Image + progress */}
            <div className="relative rounded-2xl overflow-hidden w-full max-w-md">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={500}
                    height={300}
                    className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-4 rounded-t-2xl">
                    <div className="flex justify-between text-sm font-medium">
                        <span>{title}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>Places totales</span>
                        <span>Réservées</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold">
                        <span>{totalSeats}</span>
                        <span>
                            {reservedSeats}{" "}
                            <span className="text-green-500">({percentage}%)</span>
                        </span>
                    </div>

                    <Progress value={percentage} className="h-2 mt-2" />

                    {/* Avatars */}
                    <div className="flex items-center mt-3">
                        {passengers.slice(0, 4).map((p) => (
                            <Image
                                key={p.id}
                                src={p.avatarUrl}
                                alt="passenger"
                                width={28}
                                height={28}
                                className="rounded-full border-2 border-white -ml-1 first:ml-0"
                            />
                        ))}
                        {passengers.length > 4 && (
                            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 text-xs font-semibold -ml-1">
                                +{passengers.length - 4}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Texte */}
            <div className="max-w-lg">
                <Badge className="bg-blue-500 hover:bg-blue-600">
                    <Car className="w-3 h-3 mr-1" />
                    Covoiturage
                </Badge>

                <h2 className="text-2xl font-bold mt-3">
                    Réservez votre place pour le prochain trajet
                </h2>

                <ul className="mt-4 space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>
                            Choisissez votre trajet, le nombre de places que vous souhaitez
                            réserver et confirmez votre participation.
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>
                            Partagez le lien du trajet avec vos amis pour covoiturer ensemble
                            et réduire les frais.
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Paiement et confirmation instantanés.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
