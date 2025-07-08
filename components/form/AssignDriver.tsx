"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, EyeOff, Trash2, X } from "lucide-react";
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem,} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ListesVehicle } from "@/types/ApiReponse/VehicleResponse";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { assignDriver, getAlldriversByPartner, getAllVehiclesByPartner, getVehiclesWithDrivers, removeDriver } from "@/api/services/authService";
import Image from "next/image";
import { DriverInfo, VehicleWithDrivers } from "@/types/ApiReponse/Vehicle-with-drivers";
import { DataTableSkeleton } from "../table/data-table-skeleton";


type AssignDriverProps = {
    isOpen: boolean;
    onClose: () => void;
};

// Zod Schema
const assignSchema = z.object({
    driverId: z.string().min(1, "Conducteur requis"),
    vehicleId: z.string().min(1, "Véhicule requis"),
});

export function AssignDriver({ isOpen, onClose }: AssignDriverProps) {

    const [drivers, setDrivers] = useState<DriverInfo[]>([]);
    const [vehicles, setVehicles] = useState<ListesVehicle[]>([]);
    const [assignments, setAssignments] = useState<VehicleWithDrivers[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const itemsPerPage = limit; // pour affichage dans l’UI


    const { control, handleSubmit, reset, formState: { isSubmitting }, } = useForm<z.infer<typeof assignSchema>>({
        resolver: zodResolver(assignSchema),defaultValues: {
            driverId: "",
            vehicleId: "",
        },
    });


    const fetchData = async (page: number) => {
        try {

            const res = await getVehiclesWithDrivers(page, limit);
            if (res.data) {
                setAssignments(res.data.data);
            }

        } catch (e) {
            toast.error("Erreur lors de la récupération des assignations");
            console.error(e);
        }
    };

    const getAllVehicles = async () => {
        try {
            const res= await getAllVehiclesByPartner();
            if (res.data) {
                setVehicles(res.data);
            }
        } catch (e) {
            toast.error("Erreur lors de la récupération des véhicules");
            console.error(e);
        }
    };

    const getAlldrivers = async () => {
        try {
            const res= await getAlldriversByPartner();
            if (res.data) {
                setDrivers(res.data);
            }
        } catch (e) {
            toast.error("Erreur lors de la récupération des conducteurs");
            console.error(e);
        }
    };

    // Simule les fetchs réels
    useEffect(() => {
        // Fetch assignations existantes
        fetchData(currentPage);
        // Fetch véhicules
        getAllVehicles();
        // Fetch conducteurs
        getAlldrivers();

    }, [currentPage]);


    async function onSubmit(data: z.infer<typeof assignSchema>) {
        try {

            const res = await assignDriver(data.vehicleId, data.driverId);
            if (res.statusCode === 200) {
                toast.success("Conducteur assigné au véhicule avec succès");
                reset(); // 👈 vide le formulaire ici
            }
            // Rafraîchir la liste
            fetchData(currentPage);

        } catch (err) {
            toast.error("Erreur lors de l'assignation");
        }
    }

    async function handleUnassign(vehicleId: string, driverId: string) {
        try {
            const res = await removeDriver(vehicleId, driverId);
            if (res.statusCode === 200) {
                toast.success("Conducteur retiré");
                fetchData(currentPage);
            }
        } catch {
            toast.error("Erreur lors du retrait");
        }
    }

    function onPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }

    function onNextPage() {
        if (currentPage < Math.ceil(totalItems / limit)) {
            setCurrentPage((prev) => prev + 1);
        }
    }

    const isDataEmpty = !assignments || assignments.length <= 0;

    return (

        <div className="fixed inset-0 bg-black/50 z-50">
            <div className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0 w-full md:w-[50vw] shadow-xl' : 'translate-x-full w-100'} bg-white dark:bg-gray-800`}>
                <h5 className="inline-flex items-center mb-4 text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    GESTION DES VÉHICULES ET DES CONDUCTEURS
                </h5>

                <Button type="button" className="absolute top-2.5 end-2.5 text-white bg-red-500 hover:bg-red-600 w-8 h-8 rounded-full" onClick={onClose}>
                    <X className="w-4 h-4" />
                </Button>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 mt-6 w-full">
                    {/* Select Conducteur */}
                    <div className="w-full">
                        <Label>Conducteur</Label>
                        <Controller name="driverId" control={control} render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionner un conducteur" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {drivers.map((driver) => (
                                            <SelectItem key={driver.id} value={driver.id}>
                                                {driver.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/* Select Véhicule */}
                    <div className="w-full">
                        <Label>Véhicule</Label>
                        <Controller
                            name="vehicleId"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionner un véhicule" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vehicles.map((veh) => (
                                            <SelectItem key={veh.id} value={veh.id}>
                                                {veh.model}-{veh.brand}-{veh.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className=" w-full">
                        <Button type="submit" className="mt-4 w-fit px-6" disabled={isSubmitting} >
                            {isSubmitting ? "Assignation..." : "Assigner"}
                        </Button>
                    </div>

                </form>

                {/* Tableau des assignations */}
                <div className="mt-8">
                    <h3 className="text-lg font-bold mb-2">Véhicules assignés</h3>

                    {isDataEmpty ? (

                        <DataTableSkeleton columnCount={5} rowCount={5} />
                            ) : (
                                
                                <>
                                    {assignments.length > 0 ? (

                                        <>

                                        <div className="rounded-md border">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Véhicule</TableHead>
                                                        <TableHead>Conducteur</TableHead>
                                                        <TableHead>Mot de passe</TableHead>
                                                        <TableHead>Action</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {assignments.map((a) => (
                                                        <TableRow key={`${a.id}-${a.drivers?.[0]?.id ?? "no-driver"}`}>
                                                            <TableCell>{a.name}-{a.model}-{a.brand}</TableCell>

                                                            <TableCell>
                                                                {a.drivers?.length > 0 ? (
                                                                    <div className="flex flex-col gap-2">
                                                                        {a.drivers.map((driver) => (
                                                                            <div key={driver.id} className="flex items-center gap-2">
                                                                                <Image
                                                                                    src={driver.image ?? "/placeholder-avatar.png"}
                                                                                    alt={driver.name}
                                                                                    width={32}
                                                                                    height={32}
                                                                                    className="rounded-full object-cover border"
                                                                                />
                                                                                <span>{driver.name}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    "Aucun conducteur"
                                                                )}
                                                            </TableCell>

                                                                {/* passwordGenerate */}
                                                            <TableCell>
                                                                {a.drivers?.length > 0 && a.drivers[0].passwordGenerate ? (
                                                                    <div className="flex items-center gap-2">
                                                                        <EyeOff className="w-4 h-4" />
                                                                        <span className="text-sm text-muted-foreground">
                                                                            {a.drivers[0].passwordGenerate}
                                                                        </span>
                                                                    </div>

                                                                ) : (  " " )}
                                                            </TableCell>
                                                            
                                                            <TableCell>
                                                                {a.drivers?.length > 0 && (
                                                                    <Button variant="destructive" size="sm" onClick={() => handleUnassign(a.id, a.drivers?.[0]?.id ?? "")}  >
                                                                        <Trash2 className="w-2 h-2 cursor-pointer" />
                                                                    </Button>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>

                                            {/* Pagination */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 py-4">
                                                <div className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left">
                                                    Page {currentPage} sur {Math.ceil(totalItems / itemsPerPage)}
                                                </div>
                                                <div className="flex justify-center sm:justify-end space-x-2">
                                                    <Button variant="outline" size="sm" onClick={onPreviousPage} disabled={currentPage <= 1} className="text-xs sm:text-sm" >
                                                        <ChevronLeft className="h-4 w-4 sm:mr-1" />
                                                        <span className="hidden sm:inline">Précédent</span>
                                                    </Button>
                                                    <Button variant="outline" size="sm" onClick={onNextPage} disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)} className="text-xs sm:text-sm" >
                                                        <span className="hidden sm:inline">Suivant</span>
                                                        <ChevronRight className="h-4 w-4 sm:ml-1" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </>

                                    ) : (
                                        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
                                            <Image src="/empty_1.svg" alt="Aucune donnée" width={100} height={100} />
                                            <p className="text-sm text-muted-foreground">Aucune assignation trouvée</p>
                                        </div>
                                    )}
                                </>
                            )}

                </div>

            </div>
        </div>

    );
}
