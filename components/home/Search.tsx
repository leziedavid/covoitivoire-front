"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import GooglePlacesAutocompleteInput from "./GooglePlacesAutocompleteInput"
import { z } from "zod"
import { toast } from "sonner"
import { Plus, Minus } from "lucide-react"
import SelectServices from "../select/SelectServices"
import UberMap from "./UberMap"

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


export default function Search() {

    const [pickup, setPickup] = useState("")
    const [pickupCoords, setPickupCoords] = useState({ lat: 0, lon: 0 })
    const [dropoff, setDropoff] = useState("")
    const [dropoffCoords, setDropoffCoords] = useState({ lat: 0, lon: 0 })
    const [rideDate, setRideDate] = useState<Date | undefined>(undefined)
    const [rideTime, setRideTime] = useState("")
    const isAuthenticated = true // À remplacer par ta logique réelle

    const handleSubmitRide = () => {
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

        console.log("Course validée:", result.data)
        toast.success("Course enregistrée !")
    }


    return (
        <section className="py-20 bg-cover bg-center mb-4" style={{ backgroundImage: "url('/update.png')" }} >
            <div className="container mx-auto px-6 flex flex-col items-center space-y-8">
                {/* Titre et sous-texte centré et en blanc */}
                <div className="text-center text-white">
                    <h1 className="text-3xl sm:text-6xl font-bold mb-2 leading-tight uppercase"> Trouver un trajet </h1>
                    <p className="text-base sm:text-lg">
                        Trouvez un trajet rapidement et facilement avec Covoit'Ivoire
                    </p>
                </div>

                {/* Carte blanche avec le formulaire */}
                <div className="bg-white rounded-xl shadow-lg py-10 px-8 w-full max-w-6xl">
                    <form className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                        
                        <div className="flex-1">
                            <GooglePlacesAutocompleteInput value={pickup} onChange={setPickup} onLocationSelect={(coords) => setPickupCoords(coords)}  placeholder="Adresse de départ"  />
                        </div>

                        <div className="flex-1">
                            <GooglePlacesAutocompleteInput  value={dropoff} onChange={setDropoff} onLocationSelect={(coords) => setDropoffCoords(coords)} placeholder="Adresse d’arrivée" />
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={cn( "flex-1 justify-start text-left font-normal bg-white text-black py-4 h-[56px]", !rideDate && "text-muted-foreground" )}  >
                                    {rideDate ? format(rideDate, "PPP", { locale: fr })  : "Sélectionner une date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={rideDate} onSelect={setRideDate} initialFocus  />
                            </PopoverContent>
                        </Popover>

                        <Input type="time" value={rideTime} onChange={(e) => setRideTime(e.target.value)} className="flex-1 bg-white text-black py-4 h-[56px]" />

                        <Button className="bg-orange-500 text-white hover:bg-gray-900 px-6 whitespace-nowrap h-[50px]">
                            Voir les prix
                        </Button>
                    </form>

                </div>
            </div>
        </section>
    );

}
