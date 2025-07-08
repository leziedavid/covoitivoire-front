import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Share2, Car, MapPin, CalendarDays, Clock } from "lucide-react";
import rideImage from "/public/ride.png";

// Types adaptés au schéma fourni
interface Vehicle {
    name: string;
}

interface Trip {
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

const mockTrips: Trip[] = [
    {
        id: "1",
        departure: "Abidjan",
        arrival: "Yamoussoukro",
        date: "2025-06-20",
        departureTime: "08:00",
        arrivalTime: "11:00",
        price: 7500,
        availableSeats: 3,
        vehicle: { name: "Toyota Corolla" },
    },
    {
        id: "2",
        departure: "Bouaké",
        arrival: "Korhogo",
        date: "2025-06-21",
        departureTime: "09:30",
        arrivalTime: "13:00",
        price: 9500,
        availableSeats: 2,
        vehicle: { name: "Hyundai Accent" },
    },
    {
        id: "3",
        departure: "Daloa",
        arrival: "Man",
        date: "2025-06-22",
        departureTime: "07:15",
        arrivalTime: "10:45",
        price: 8500,
        availableSeats: 4,
        vehicle: { name: "Kia Rio" },
    },
    {
        id: "4",
        departure: "San Pedro",
        arrival: "Gagnoa",
        date: "2025-06-23",
        departureTime: "06:30",
        arrivalTime: "09:15",
        price: 6800,
        availableSeats: 1,
        vehicle: { name: "Peugeot 301" },
    },
];

export default function TripList() {
    return (
        <div className="bg-gray-200 min-h-screen p-6">
            <div className="max-w-3xl mx-auto space-y-4">
                {mockTrips.map((trip) => (
                    <Card key={trip.id} className="p-4">
                        <div className="flex items-start gap-4">
                            <Image
                                src={rideImage}
                                alt="Ride"
                                width={60}
                                height={60}
                                className="rounded"
                            />
                            <CardContent className="flex-1 space-y-2 p-0">
                                <h2 className="text-lg font-semibold">Trajet disponible</h2>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span><strong>Départ :</strong> {trip.departure}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span><strong>Arrivée :</strong> {trip.arrival}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="w-4 h-4 text-primary" />
                                        <span><strong>Date :</strong> {trip.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-primary" />
                                        <span><strong>Départ à :</strong> {trip.departureTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-primary" />
                                        <span><strong>Arrivée prévue :</strong> {trip.arrivalTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Car className="w-4 h-4 text-primary" />
                                        <span><strong>Véhicule :</strong> {trip.vehicle.name}</span>
                                    </div>
                                    <div className="col-span-2 flex justify-between mt-2">
                                        <span className="text-base font-bold text-green-600">
                                            {trip.price} FCFA
                                        </span>
                                        <span className="text-sm">{trip.availableSeats} places disponibles</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Button variant="default">Réserver</Button>
                                    <Button variant="outline" className="flex items-center gap-1">
                                        <Heart className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-1">
                                        <MessageSquare className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-1 ">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
