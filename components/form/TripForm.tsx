"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUpdateTripSchema } from "@/schema/createUpdateTrajet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent,} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import GooglePlacesAutocompleteInput from "../home/GooglePlacesAutocompleteInput";
import { Menu, Minus, Plus, Trash2, X } from "lucide-react";
import RichTextEditor from "../rich-text-editor";
import { fr } from "date-fns/locale";
import { Vehicle } from "@/types/AllTypes";
import SelectVehicle from "../select/SelectVehicle";
import { getUserId } from "@/app/middleware";
import { ListesVehicle } from "@/types/ApiReponse/VehicleResponse";
import { createTrip, updateTrip } from "@/api/services/authService";


const AVERAGE_SPEED_KMH = 60;
type Trip = z.infer<typeof createUpdateTripSchema>;

type TripFormProps = {
    initialValues?: Partial<Trip>;
    isOpen: boolean;
    onClose: () => void;
    vehicles: ListesVehicle[];
};

export function TripForm({ initialValues, isOpen, onClose, vehicles }: TripFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Trip>({
        resolver: zodResolver(createUpdateTripSchema),
        defaultValues: {
            ...initialValues,
            createdById: initialValues?.createdById || "",
            driverId: initialValues?.driverId || "",
            vehicleId: initialValues?.vehicleId || "",
            departure: initialValues?.departure || "",
            arrival: initialValues?.arrival || "",
            departureLatitude: initialValues?.departureLatitude || 0,
            departureLongitude: initialValues?.departureLongitude || 0,
            arrivalLatitude: initialValues?.arrivalLatitude || 0,
            arrivalLongitude: initialValues?.arrivalLongitude || 0,
            distance: initialValues?.distance || 0,
            availableSeats: initialValues?.availableSeats || 1,
            price: initialValues?.price || 0,
            stopPoints: initialValues?.stopPoints || [],
            date: initialValues?.date ? new Date(initialValues.date) : new Date(),
            estimatedArrival: initialValues?.estimatedArrival ? new Date(initialValues.estimatedArrival) : new Date(),
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "stopPoints" });

    const [selectedVehicleId, setSelectedVehicleId] = useState<string>(initialValues?.vehicleId || "");
    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        
        const fetchUserId: () => Promise<void> = async () => {
            const id = await getUserId();
            if (id) {
                setUserID(id);
                setValue("createdById", id);
                setValue("driverId", id);
            }
        };
        fetchUserId();
    }, []);

    const handleVehicleChange = (vehicleId: string) => {
        setSelectedVehicleId(vehicleId);
        setValue("vehicleId", vehicleId);
        const selectedVehicle = vehicles.find((v) => v.id === vehicleId);
    };

    const [pickup, setPickup] = useState(initialValues?.departure || "");
    const [pickupCoords, setPickupCoords] = useState({
        lat: initialValues?.departureLatitude || 0,
        lon: initialValues?.departureLongitude || 0,
    });
    const [dropoff, setDropoff] = useState(initialValues?.arrival || "");
    const [dropoffCoords, setDropoffCoords] = useState({
        lat: initialValues?.arrivalLatitude || 0,
        lon: initialValues?.arrivalLongitude || 0,
    });
    const [rideDate, setRideDate] = useState<Date | undefined>(initialValues?.date ? new Date(initialValues.date) : undefined);
    const [rideTime, setRideTime] = useState<string>(() => {
        if (initialValues?.date) {
            const d = new Date(initialValues.date);
            return d.toISOString().slice(11, 16);
        }
        return "";
    });

    const combineDateTime = (date: Date, time: string): Date => {
        const [hours, minutes] = time.split(":").map(Number);
        const combined = new Date(date);
        combined.setHours(hours, minutes, 0, 0);
        return combined;
    };

    function toRad(deg: number) {
        return (deg * Math.PI) / 180;
    }

    function haversineDistance(coord1: { lat: number; lon: number }, coord2: { lat: number; lon: number }) {
        const R = 6371;
        const dLat = toRad(coord2.lat - coord1.lat);
        const dLon = toRad(coord2.lon - coord1.lon);
        const lat1 = toRad(coord1.lat);
        const lat2 = toRad(coord2.lat);

        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    useEffect(() => {
        setValue("departure", pickup);
        setValue("arrival", dropoff);
        setValue("departureLatitude", pickupCoords.lat);
        setValue("departureLongitude", pickupCoords.lon);
        setValue("arrivalLatitude", dropoffCoords.lat);
        setValue("arrivalLongitude", dropoffCoords.lon);

        if (pickupCoords.lat && dropoffCoords.lat && rideDate && rideTime) {
            const distanceKm = haversineDistance(pickupCoords, dropoffCoords);
            const durationHours = distanceKm / AVERAGE_SPEED_KMH;
            const departureDateTime = combineDateTime(rideDate, rideTime);
            const estimatedArrival = new Date(departureDateTime.getTime() + durationHours * 3600 * 1000);

            setValue("distance", Number(distanceKm.toFixed(2)));
            setValue("date", departureDateTime);
            setValue("estimatedArrival", estimatedArrival);
        }
    }, [pickupCoords, dropoffCoords, rideDate, rideTime]);


    const onSubmit = async (data: Trip) => {

        try {
            if (!rideDate || !rideTime) return alert("Merci de choisir la date et l'heure de départ.");
            if (!selectedVehicleId) return alert("Merci de sélectionner un véhicule.");
            if (!pickup || pickupCoords.lat === 0) return alert("Adresse de départ invalide.");
            if (!dropoff || dropoffCoords.lat === 0) return alert("Adresse d'arrivée invalide.");

            if (!data.createdById && userID) data.createdById = userID;
            if (!data.driverId && userID) data.driverId = userID;

            // if (!data.driverId && selectedVehicleId) {
            //     const vehicle = vehicles.find((v) => v.id === selectedVehicleId);
            //     if (vehicle) data.driverId = vehicle.partnerId;
            // }

            if (!data.createdById) return alert("Utilisateur non identifié.");
            if (!data.driverId) return alert("Conducteur non défini.");

            const departureDateTime = combineDateTime(rideDate, rideTime);

            const validatedData = createUpdateTripSchema.parse({
                ...data,
                date: departureDateTime,
                estimatedArrival: data.estimatedArrival || departureDateTime,
            });

            const payload = {
                ...validatedData,
                date: validatedData.date.toISOString(),
                estimatedArrival: validatedData.estimatedArrival.toISOString(),
            };

            // ✅ Création ou modification
            let response;
            if (initialValues?.id) {

                response = await updateTrip(initialValues.id, payload);

            } else {

                response = await createTrip(payload);
            }

            if (!response || response.statusCode >= 400) {
                throw new Error(response.message || "Erreur lors de l'enregistrement du trajet.");
            }

            alert(initialValues?.id ? "Trajet mis à jour avec succès." : "Trajet créé avec succès.");
            onClose();
            reset();

        } catch (error: any) {
            console.error("Erreur de validation ou d'envoi:", error);
            if (error.errors) {
                const errorMessages = error.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join('\n');
                alert(`Erreurs:\n${errorMessages}`);
            } else {
                alert(`Erreur: ${error.message}`);
            }
        }
    };


    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-50">
                <div
                    id="drawer-right-example"
                    className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform  ${isOpen ? 'translate-x-0 w-full md:w-[50vw] shadow-xl' : 'translate-x-full w-100'}  bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out`}
                    aria-labelledby="drawer-right-label" >
                    <h5 id="drawer-right-label"
                        className="inline-flex items-center mb-4 text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase" >
                        {initialValues?.id ? 'Modifier un trajet' : 'Nouveau trajet'}
                    </h5>

                    <Button type="button" aria-controls="drawer-right-example" className="text-gray-400 bg-red-500 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose} >
                        <X className="w-3 h-3 text-white" aria-hidden="true" />
                        <span className="sr-only">Close menu</span>
                    </Button>

                    {/* Contenu du modal */}
                    <div className="mt-4">

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            noValidate
                        >
                            {/* Sélection du véhicule avec SelectVehicle */}
                            <div className="sm:col-span-2">
                                <Label>Véhicule</Label>
                                <SelectVehicle value={selectedVehicleId} onValueChange={handleVehicleChange} isDisabled={isSubmitting} vehicles={vehicles} />
                                {errors.vehicleId && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.vehicleId.message}
                                    </p>
                                )}
                                {selectedVehicleId && (
                                    <div className="mt-2 text-sm text-gray-600">
                                        Capacité: {vehicles.find(v => v.id === selectedVehicleId)?.capacity} places
                                    </div>
                                )}
                            </div>

                            {/* Adresse de départ */}
                            <div className="flex-1 sm:col-span-2">
                                <Label>Adresse de départ</Label>
                                <GooglePlacesAutocompleteInput value={pickup} onChange={setPickup} onLocationSelect={(coords) => setPickupCoords(coords)} placeholder="Adresse de départ" />
                                {errors.departure && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.departure.message}
                                    </p>
                                )}
                            </div>

                            {/* Adresse d'arrivée */}
                            <div className="flex-1 sm:col-span-2">
                                <Label>Adresse d'arrivée</Label>
                                <GooglePlacesAutocompleteInput value={dropoff} onChange={setDropoff} onLocationSelect={(coords) => setDropoffCoords(coords)} placeholder="Adresse d’arrivée" />
                                {errors.arrival && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.arrival.message}
                                    </p>
                                )}
                            </div>

                            {/* Sélecteur de date */}
                            <div className="sm:col-span-1">
                                <Label>Date de départ</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "justify-start text-left font-normal bg-white text-black py-6 w-full",
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
                                            onSelect={setRideDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                {errors.date && (
                                    <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
                                )}
                            </div>

                            {/* Sélecteur d'heure */}
                            <div className="sm:col-span-1">
                                <Label>Heure de départ</Label>
                                <Input
                                    type="time"
                                    value={rideTime}
                                    onChange={(e) => setRideTime(e.target.value)}
                                    className="py-6"
                                    required
                                />
                            </div>

                            {/* Places disponibles */}
                            <div>
                                <Label>Places disponibles</Label>
                                <Input
                                    className="w-full py-6"
                                    type="number"
                                    min="1"
                                    {...register("availableSeats", { valueAsNumber: true })}
                                />
                                {errors.availableSeats && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.availableSeats.message}
                                    </p>
                                )}
                            </div>

                            {/* Prix */}
                            <div>
                                <Label>Prix (€)</Label>
                                <Input
                                    className="w-full py-6"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    {...register("price", { valueAsNumber: true })}
                                />
                                {errors.price && (
                                    <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>
                                )}
                            </div>

                            {/* Instructions */}
                            <div className="sm:col-span-2">
                                <Label>Instructions</Label>
                                <Input
                                    className="w-full py-6"
                                    {...register("instructions")}
                                    placeholder="Éviter l'autoroute A7"
                                />
                                {errors.instructions && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.instructions.message}
                                    </p>
                                )}
                            </div>

                            {/* Points d'arrêt */}
                            <div className="sm:col-span-2 mt-4">
                                <h3 className="text-md font-semibold mb-2">Points d'arrêt (Optionnel)</h3>

                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2 items-center mb-2">
                                        <div className="flex-1">
                                            <Controller
                                                name={`stopPoints.${index}.label`}
                                                control={control}
                                                defaultValue={field.label}
                                                render={({ field: labelField }) => (
                                                    <GooglePlacesAutocompleteInput value={labelField.value ?? ""}
                                                        onChange={(newValue) => labelField.onChange(newValue)}
                                                        onLocationSelect={(coords) => {
                                                            setValue(`stopPoints.${index}.latitude`, coords.lat);
                                                            setValue(`stopPoints.${index}.longitude`, coords.lon);
                                                            setValue(`stopPoints.${index}.order`, index);
                                                        }}
                                                        placeholder={`Point d'arrêt ${index + 1}`}
                                                    />
                                                )}
                                            />
                                            {errors.stopPoints?.[index]?.label && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.stopPoints[index].label?.message}
                                                </p>
                                            )}
                                        </div>

                                        <Button type="button" variant="destructive" onClick={() => remove(index)} className="h-full px-3" >
                                            <Trash2 className="w-4 h-4 text-white" />
                                        </Button>
                                    </div>
                                ))}

                                <Button type="button" variant="outline" onClick={() => append({ label: "", latitude: 0, longitude: 0, order: fields.length, })} >
                                    Ajouter un point d'arrêt <Plus className="w-4 h-4 text-black ml-2" />
                                </Button>
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-2">
                                <Label>Description</Label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <RichTextEditor content={field.value || ""} onChange={field.onChange} />
                                    )}
                                />

                                {errors.description && (
                                    <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Bouton de soumission */}
                            <Button type="submit" className="sm:col-span-2 w-full mt-4 cursor-pointer" disabled={isSubmitting}>
                                {isSubmitting ? "Enregistrement..." : "Enregistrer le trajet"}
                            </Button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}