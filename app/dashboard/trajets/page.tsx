"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/dataTable";

import { fetchAllVehicles, fetchTrips, fetchTripsByDrivers } from "@/api/services/authService";
import { Vehicle, VehicleType } from "@/types/AllTypes"; // Ajuster l'import selon votre structure
import { TripForm } from "@/components/form/TripForm";
import { Button } from "@/components/ui/button";
import { Trip } from "@/types/ApiReponse/trajetResponse";
import { columns as tripColumns } from "@/types/columns/trip-columns";
import { ListesVehicle } from "@/types/ApiReponse/VehicleResponse";
import { Searchs } from "@/components/dash/searchs";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { useOrderSocket } from '@/lib/socket/useOrderSocket';



export default function Page() {

    useOrderSocket() // ← Active les sockets seulement ici
    
    const [trips, setTrips] = useState<Trip[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [vehicleListes, setAllVehicles] = useState<ListesVehicle[]>([]);

    // Pour gérer l'ouverture du formulaire en création ou modification
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formInitialValues, setFormInitialValues] = useState<any | undefined>(undefined);

    const stateMap: Record<string, string> = {
        "EN ATTENTE": "PENDING",
        "VALIDÉ": "VALIDATED",
        "EN COURS": "IN_PROGRESS",
        "DÉMARRÉ": "STARTED",
        "TERMINÉ": "COMPLETED",
        "ANNULÉ": "CANCELLED",
    };


    // Tableau factice de véhicules - À remplacer par un appel API réel
    const vehicles: Vehicle[] = [
        {
            id: "05916f19-b3b9-4483-b0e4-05b109228d7e",
            name: "Véhicule de livraison",
            brand: "Mercedes",
            capacity: 8,
            fuel: "Diesel",
            color: "Blanc",
            model: "Sprinter",
            registration: "AB-123-CD",
            licensePlate: "AB-123-CD",
            serialNumber: "MB2024001",
            type: VehicleType.CONFORT, // Ajuster selon votre enum
            partnerId: "driver-partner-1", // ID du conducteur/partenaire
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-01-15"),
        },
        {
            id: "vehicle-2",
            name: "Berline premium",
            brand: "BMW",
            capacity: 4,
            fuel: "Essence",
            color: "Noir",
            model: "Série 5",
            registration: "EF-456-GH",
            licensePlate: "EF-456-GH",
            serialNumber: "BMW2024002",
            type: VehicleType.LUXE, // Ajuster selon votre enum
            partnerId: "driver-partner-2",
            createdAt: new Date("2024-02-10"),
            updatedAt: new Date("2024-02-10"),
        },
        {
            id: "vehicle-3",
            name: "SUV familial",
            brand: "Audi",
            capacity: 7,
            fuel: "Hybride",
            color: "Gris",
            model: "Q7",
            registration: "IJ-789-KL",
            licensePlate: "IJ-789-KL",
            serialNumber: "AUD2024003",
            type: VehicleType.ECONOMIQUE, // Ajuster selon votre enum
            partnerId: "driver-partner-3",
            createdAt: new Date("2024-03-05"),
            updatedAt: new Date("2024-03-05"),
        },
        {
            id: "vehicle-4",
            name: "Minibus transport",
            brand: "Volkswagen",
            capacity: 12,
            fuel: "Diesel",
            color: "Bleu",
            model: "Crafter",
            registration: "MN-012-OP",
            licensePlate: "MN-012-OP",
            serialNumber: "VW2024004",
            type: VehicleType.UTILITAIRE, // Ajuster selon votre enum
            partnerId: "driver-partner-4",
            createdAt: new Date("2024-04-12"),
            updatedAt: new Date("2024-04-12"),
        },
        {
            id: "vehicle-5",
            name: "Citadine économique",
            brand: "Renault",
            capacity: 4,
            fuel: "Électrique",
            color: "Rouge",
            model: "Zoe",
            registration: "QR-345-ST",
            licensePlate: "QR-345-ST",
            serialNumber: "REN2024005",
            type: VehicleType.ECONOMIQUE, // Ajuster selon votre enum
            partnerId: "driver-partner-5",
            createdAt: new Date("2024-05-20"),
            updatedAt: new Date("2024-05-20"),
        },
    ];

    
    // Récupération des trajets
    const fetchData = async (page: number) => {
        try {
            const res = await fetchTripsByDrivers(page, limit);
            if (res.data) {
                setTrips(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const fetchAllvehicle = async () => {
        try {
            const res = await fetchAllVehicles();
            setAllVehicles(res.data ? res.data : []);
        } catch (e) {
            console.error("Erreur lors de la récupération des véhicules :", e);
            setAllVehicles([]); // Sécurité : vider les véhicules en cas d'erreur
        }
    };

    useEffect(() => {
        fetchAllvehicle();
        fetchData(currentPage);
    }, [currentPage]);

    // Ouverture du formulaire en création
    function openCreateForm() {
        setFormInitialValues(undefined);
        setIsFormOpen(true);
    }

    // Ouverture du formulaire en modification
    function openEditForm(trip: Trip) {
        // S'assurer que la propriété 'date' reste une string au format ISO
        const tripWithDateAsString = {
            ...trip,
            date: trip.date ? new Date(trip.date).toISOString() : "",
        };
        setFormInitialValues(tripWithDateAsString);
        setIsFormOpen(true);
    }

    // Fermeture du formulaire
    function closeForm() {
        setIsFormOpen(false);
        // Optionnel : rafraîchir les données après fermeture
        fetchData(currentPage);
    }

    // Gestion des actions (peut-être adapté selon ta logique)
    function handleChangeState(row: Trip, newStates: string[]) {
        // Remapper les valeurs françaises vers les valeurs backend
        const backendStates = newStates.map((stateFr) => stateMap[stateFr]);
        alert(`Changer l'état du trajet ${row.id} vers : ${backendStates.join(", ")}`);
    }

    function handleUpdate(row: Trip) {
        // Ouvre le formulaire en mode édition
        openEditForm(row);
    }

    function handleDelete(row: Trip) {
        alert(`Delete ${row.id}`);
    }

    function handleNextPage() {
        if (currentPage < Math.ceil(totalItems / limit)) {
            setCurrentPage(currentPage + 1);
        } else {
            alert("Vous êtes déjà sur la dernière page.");
        }
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            alert("Vous êtes déjà sur la première page.");
        }
    }

    const isDataEmpty = !trips || trips.length <= 0;

    return (
        <div className="w-full overflow-x-auto">

            <div className="flex justify-end mb-4">
                <Button onClick={openCreateForm} className="bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                    Créer un nouveau trajet
                </Button>
            </div>

            {/* Formulaire TripForm avec gestion du sheet intégré et véhicules */}
            {isFormOpen && (
                <TripForm initialValues={formInitialValues} isOpen={isFormOpen} onClose={closeForm} vehicles={vehicleListes} />
            )}

            <Searchs />

            {isDataEmpty ? (
                <DataTableSkeleton columnCount={5} rowCount={10} />
            ) : (
                <DataTable
                    columns={tripColumns}
                    data={trips}
                    onChangeState={handleChangeState}
                    onUpdateData={handleUpdate}
                    onDeleteData={handleDelete}
                    stateOptions={["DÉMARRÉ", "TERMINÉ", "ANNULÉ"]}
                    onNextPage={handleNextPage}          // optionnel : gère la page suivante
                    onPreviousPage={handlePreviousPage}  // optionnel : gère la page précédente
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={limit} />
            )}

        </div>
    );
}


