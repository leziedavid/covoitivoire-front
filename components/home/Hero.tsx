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

const packageBaseSchema = z.object({
    pickup: z.string().min(1),
    dropoff: z.string().min(1),
    pickupLat: z.number().min(-90).max(90),
    pickupLng: z.number().min(-180).max(180),
    dropoffLat: z.number().min(-90).max(90),
    dropoffLng: z.number().min(-180).max(180),
    date: z.date(),
})

export function Hero() {
    const [pickup, setPickup] = useState("")
    const [pickupCoords, setPickupCoords] = useState({ lat: 0, lon: 0 })

    const [dropoff, setDropoff] = useState("")
    const [dropoffCoords, setDropoffCoords] = useState({ lat: 0, lon: 0 })

    const [rideDate, setRideDate] = useState<Date | undefined>(undefined)
    const [rideTime, setRideTime] = useState("")

    const [packagePickup, setPackagePickup] = useState("")
    const [packagePickupCoords, setPackagePickupCoords] = useState({ lat: 0, lon: 0 })

    const [packageDropoff, setPackageDropoff] = useState("")
    const [packageDropoffCoords, setPackageDropoffCoords] = useState({ lat: 0, lon: 0 })

    const [packageDate, setPackageDate] = useState<Date | undefined>(undefined)

    const [showPackageDetails, setShowPackageDetails] = useState(false)
    const [packages, setPackages] = useState([{ name: "", description: "" }])
    const [serviceId, setServiceId] = useState("livraison")

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

    const handleSubmitPackageBase = () => {
        const result = packageBaseSchema.safeParse({
            pickup: packagePickup,
            dropoff: packageDropoff,
            pickupLat: packagePickupCoords.lat,
            pickupLng: packagePickupCoords.lon,
            dropoffLat: packageDropoffCoords.lat,
            dropoffLng: packageDropoffCoords.lon,
            date: packageDate,
        })

        if (!result.success) {
            toast.error("Veuillez remplir correctement tous les champs pour la livraison.")
            return
        }

        if (isAuthenticated) {
            setShowPackageDetails(true)
        } else {
            toast.error("Vous devez être connecté pour envoyer un colis.")
        }
    }

    const handleSubmitFinalPackage = () => {
        const payload = {
            pickupAddress: packagePickup,
            pickupLat: packagePickupCoords.lat,
            pickupLng: packagePickupCoords.lon,
            dropAddress: packageDropoff,
            dropLat: packageDropoffCoords.lat,
            dropLng: packageDropoffCoords.lon,
            description: "Envoi de colis",
            scheduledAt: packageDate?.toISOString(),
            serviceId,
            customerId: "mock-user-id",
            addedById: "mock-user-id",
            packages,
        }

        console.log("Payload final:", payload)
        toast.success("Colis prêt à être envoyé !")
    }

    const updatePackage = (index: number, field: string, value: string) => {
        const updated = [...packages]
        updated[index] = { ...updated[index], [field]: value }
        setPackages(updated)
    }

    const addPackage = () => setPackages([...packages, { name: "", description: "" }])
    const removePackage = (index: number) => setPackages(packages.filter((_, i) => i !== index))

    return (

        <section className="pt-32 px-6 pb-10 text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <Tabs defaultValue="ride" className="w-full">
                        <TabsList className="mb-6">
                            <TabsTrigger value="ride">Allez où vous voulez avec Uber</TabsTrigger>
                            <TabsTrigger value="package">Faites livrer un colis</TabsTrigger>
                        </TabsList>

                        {/* Tab Ride */}
                        <TabsContent value="ride">
                            <div className="space-y-4">
                                <GooglePlacesAutocompleteInput
                                    value={pickup}
                                    onChange={setPickup}
                                    onLocationSelect={(coords) => setPickupCoords(coords)}
                                    placeholder="Adresse de départ"
                                    className="bg-white text-black"
                                />
                                <GooglePlacesAutocompleteInput
                                    value={dropoff}
                                    onChange={setDropoff}
                                    onLocationSelect={(coords) => setDropoffCoords(coords)}
                                    placeholder="Adresse d’arrivée"
                                    className="bg-white text-black"
                                />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-white text-black", !rideDate && "text-muted-foreground")}>
                                            {rideDate ? format(rideDate, "PPP", { locale: fr }) : "Sélectionner une date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={rideDate} onSelect={setRideDate} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                <Input type="time" value={rideTime} onChange={(e) => setRideTime(e.target.value)} className="w-full bg-white text-black" />
                                <Button className="w-full bg-white text-black" onClick={handleSubmitRide}>
                                    Réserver une course
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Tab Package */}
                        <TabsContent value="package">
                            <div className="space-y-4">
                                <GooglePlacesAutocompleteInput value={packagePickup}
                                    onChange={setPackagePickup}
                                    onLocationSelect={(coords) => setPackagePickupCoords(coords)}
                                    placeholder="Lieu d’envoi du colis"
                                    className="bg-white text-black"
                                />
                                <GooglePlacesAutocompleteInput value={packageDropoff}
                                    onChange={setPackageDropoff}
                                    onLocationSelect={(coords) => setPackageDropoffCoords(coords)}
                                    placeholder="Lieu de réception"
                                    className="bg-white text-black"
                                />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-white text-black", !packageDate && "text-muted-foreground")}>
                                            {packageDate ? format(packageDate, "PPP", { locale: fr }) : "Sélectionner une date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={packageDate} onSelect={setPackageDate} initialFocus />
                                    </PopoverContent>
                                </Popover>

                                {!showPackageDetails && (
                                    <>
                                        <Button className="w-full bg-white text-black" onClick={handleSubmitPackageBase}>
                                            Envoyer un colis
                                        </Button>
                                        {!isAuthenticated && (
                                            <p className="text-sm text-gray-400 text-center">Connectez-vous pour consulter votre activité récente</p>
                                        )}
                                    </>
                                )}

                                {showPackageDetails && (
                                    <>
                                        <SelectServices value={serviceId} onValueChange={setServiceId} isDisabled={true} />

                                        {packages.map((pkg, index) => (
                                            <div key={index} className="grid grid-cols-12 gap-2 items-end bg-white p-4 rounded-lg mb-2">
                                                
                                                <div className="col-span-5">
                                                    <Input value={pkg.name} onChange={(e) => updatePackage(index, "name", e.target.value)}
                                                        placeholder="Nom du colis"
                                                        className="text-black"
                                                    />
                                                </div>

                                                <div className="col-span-5">
                                                    <Input value={pkg.description}  onChange={(e) => updatePackage(index, "description", e.target.value)}
                                                        placeholder="Description"
                                                        className="text-black" />
                                                </div>

                                                <div className="col-span-2 flex gap-2 justify-end">
                                                    <Button type="button" size="icon" variant="outline" onClick={addPackage}>
                                                        <Plus className="w-4 h-4 text-black" />
                                                    </Button>
                                                    {packages.length > 1 && (
                                                        <Button type="button" size="icon" variant="outline" onClick={() => removePackage(index)}>
                                                            <Minus className="w-4 h-4 text-black" />
                                                        </Button>
                                                    )}
                                                </div>

                                            </div>
                                        ))}

                                        <Button className="w-full bg-white text-black" onClick={handleSubmitFinalPackage}>
                                            Valider la livraison
                                        </Button>
                                    </>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* MAP À RÉACTIVER SI BESOIN */}
                <div className="rounded-lg overflow-hidden h-[400px]">
                    {/* <UberMap pickup={pickup || packagePickup} dropoff={dropoff || packageDropoff} /> */}
                </div>
            </div>
        </section>


    )
}
