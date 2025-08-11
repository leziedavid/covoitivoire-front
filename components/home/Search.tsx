'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import GooglePlacesAutocompleteInput from "./GooglePlacesAutocompleteInput"
import { z } from "zod"
import { toast } from "sonner"

const rideSchema = z.object({
    pickup: z.string().min(1),
    dropoff: z.string().min(1),
    pickupLat: z.number().min(-90).max(90),
    pickupLng: z.number().min(-180).max(180),
    dropoffLat: z.number().min(-90).max(90),
    dropoffLng: z.number().min(-180).max(180),
    date: z.date(),
    time: z.string().min(1),
})

type SearchProps = {
    defaultValues?: {
        pickup?: string
        pickupLat?: number
        pickupLng?: number
        dropoff?: string
        dropoffLat?: number
        dropoffLng?: number
        date?: string | Date
        time?: string
    }
    onSearch: (params: any) => void
}

export default function Search({ defaultValues, onSearch }: SearchProps) {
    const [pickup, setPickup] = useState<string>(defaultValues?.pickup ?? "")
    const [pickupCoords, setPickupCoords] = useState<{ lat: number; lon: number }>({
        lat: defaultValues?.pickupLat ?? 0,
        lon: defaultValues?.pickupLng ?? 0,
    })
    const [dropoff, setDropoff] = useState<string>(defaultValues?.dropoff ?? "")
    const [dropoffCoords, setDropoffCoords] = useState<{ lat: number; lon: number }>({
        lat: defaultValues?.dropoffLat ?? 0,
        lon: defaultValues?.dropoffLng ?? 0,
    })
    const [rideDate, setRideDate] = useState<Date | undefined>(
        defaultValues?.date ? new Date(defaultValues.date) : undefined
    )
    const [rideTime, setRideTime] = useState<string>(defaultValues?.time ?? "")

    // Efface le localStorage dès qu’un champ change
    useEffect(() => {
        if (localStorage.getItem("rideData")) {
            localStorage.removeItem("rideData")
        }
    }, [pickup, dropoff, rideDate, rideTime])

    const handleSubmitRide = (e: React.FormEvent) => {
        e.preventDefault()

        const result = rideSchema.safeParse({
            pickup,
            dropoff,
            pickupLat: pickupCoords.lat,
            pickupLng: pickupCoords.lon,
            dropoffLat: dropoffCoords.lat,
            dropoffLng: dropoffCoords.lon,
            date: rideDate,
            time: rideTime,
        })

        if (!result.success) {
            toast.error("Tous les champs sont requis pour réserver une course.")
            return
        }

        // Lance la recherche
        onSearch(result.data)
    }

    return (
        <section
            className="py-20 bg-cover bg-center mb-4"
            style={{ backgroundImage: "url('/voiture.jpg')" }}
        >
            <div className="container mx-auto px-6 flex flex-col items-center space-y-8">
                {/* Titre */}
                <div className="text-center text-white">
                    <h1 className="text-3xl sm:text-6xl font-bold mb-2 leading-tight uppercase">
                        Trouver un trajet
                    </h1>
                    <p className="text-base sm:text-lg">
                        Trouvez un trajet rapidement et facilement avec Covoit'Ivoire
                    </p>
                </div>

                {/* Formulaire */}
                <div className="bg-white rounded-xl shadow-lg py-10 px-8 w-full max-w-6xl">
                    <form
                        onSubmit={handleSubmitRide}
                        className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0"
                    >
                        <div className="flex-1">
                            <GooglePlacesAutocompleteInput
                                value={pickup}
                                onChange={(val) => setPickup(val)}
                                onLocationSelect={(coords) => setPickupCoords(coords)}
                                placeholder="Adresse de départ"
                            />
                        </div>

                        <div className="flex-1">
                            <GooglePlacesAutocompleteInput
                                value={dropoff}
                                onChange={(val) => setDropoff(val)}
                                onLocationSelect={(coords) => setDropoffCoords(coords)}
                                placeholder="Adresse d’arrivée"
                            />
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "flex-1 justify-start text-left font-normal bg-white text-black py-4 h-[56px]",
                                        !rideDate && "text-muted-foreground"
                                    )}
                                >
                                    {rideDate ? format(rideDate, "PPP", { locale: fr }) : "Sélectionner une date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={rideDate}
                                    onSelect={(date) => setRideDate(date!)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        <Input
                            type="time"
                            value={rideTime}
                            onChange={(e) => setRideTime(e.target.value)}
                            className="flex-1 bg-white text-black py-4 h-[56px]"
                        />

                        <Button
                            type="submit"
                            className="bg-orange-500 text-white hover:bg-gray-900 px-6 whitespace-nowrap h-[50px]"
                        >
                            Voir les prix
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}
