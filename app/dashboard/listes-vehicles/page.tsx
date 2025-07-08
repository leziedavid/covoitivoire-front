"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/dataTable";
import { Button } from "@/components/ui/button";
import { columns as vehicleColumns } from "@/types/columns/vehicle-columns";
import { fetchAllVehicles, fetchVehiclesByPartner } from "@/api/services/authService";
import { ListesVehicle, Vehicle } from "@/types/ApiReponse/VehicleResponse";
import { VehicleForm } from "@/components/form/VehicleForm";
import { VehicleType } from "@/types/AllTypes";
import { VehicleRequest } from "@/types/ApiRequest/VehicleRequest";
import { Link2, Plus, UserPlus } from "lucide-react";
import { AssignDriver } from "@/components/form/AssignDriver";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { AddDriverForm } from "@/components/form/AddDriverForm";
import { User } from "@/components/dash/user";

export default function Page() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAssignFormOpen, setIsAssignFormOpen] = useState(false);
    const [formInitialValues, setFormInitialValues] = useState<VehicleRequest | undefined>(undefined);

    const [isAddDriverFormOpen, setIsAddDriverFormOpen] = useState(false);

    const fetchData = async (page: number) => {
        try {
            const partnerId = "5e126ef3-1e5b-4484-be32-d8c9f83992e2";
            const res = await fetchVehiclesByPartner(partnerId, page, limit);
            if (res.data) {
                setVehicles(res.data.data);
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

    function openCreateForm() {
        setFormInitialValues(undefined);
        setIsFormOpen(true);
    }


    function openAssignForm() {
        setIsAssignFormOpen(true);
    }

    function closeAssignForm() {
        setIsAssignFormOpen(false);
    }

    function openAddDriverForm() {
        setIsAddDriverFormOpen(true);
    }

    function closeAddDriverForm() {
        setIsAddDriverFormOpen(false);
    }

    function openEditForm(vehicle: Vehicle) {
        const {
            id,
            name,
            brand,
            model,
            capacity,
            fuel,
            color,
            registration,
            licensePlate,
            serialNumber,
            type,
            partnerId,
        } = vehicle;

        const vehicleRequest: VehicleRequest = {
            id,
            name,
            brand,
            model,
            capacity,
            fuel,
            color,
            registration,
            licensePlate,
            serialNumber,
            type: type as VehicleType,
            partnerId,
        };

        setFormInitialValues(vehicleRequest);
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
        setFormInitialValues(undefined);
        fetchData(currentPage);
    }

    const handleVehicleSubmit = async (data: VehicleRequest & { file?: File }) => {
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key === "file" && value instanceof File) {
                    formData.append("file", value);
                } else if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            const isUpdate = formInitialValues?.id;
            const url = isUpdate ? `/api/vehicles/${formInitialValues.id}` : "/api/vehicles";
            const method = isUpdate ? "PUT" : "POST";

            // TODO: remplacer par appel API réel
            console.log("Données du véhicule:", data);
            console.log("FormData prête:", formData);

            alert(isUpdate ? "Véhicule modifié avec succès!" : "Véhicule créé avec succès!");

            closeForm();
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error);
            alert("Erreur lors de la sauvegarde du véhicule");
        }
    };

    function handleChangeState(row: Vehicle, newStates: string[]) {
        alert(`Change state of ${row.id} to ${newStates.join(", ")}`);
    }

    function handleUpdate(row: Vehicle) {
        openEditForm(row);
    }

    function handleDelete(row: Vehicle) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer le véhicule "${row.name}" ?`)) {
            alert(`Delete ${row.id}`);
            fetchData(currentPage);
        }
    }

    function handleValidate(row: Vehicle, val: string | number) {
        alert(`Validate ${row.id} with value: ${val}`);
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
    const isDataEmpty = !vehicles || vehicles.length <= 0;

    return (
        <div className="w-full overflow-x-auto">
            <div className="flex justify-end mb-4 space-x-2">
                <Button onClick={openAddDriverForm} className="bg-gray-600 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2" >
                    <UserPlus className="w-4 h-4" />
                    Ajouter un nouveau chauffeur
                </Button>

                <Button onClick={openAssignForm} className="bg-gray-600 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2">
                    <Link2 className="w-4 h-4" />
                    Assigner véhicule
                </Button>

                <Button onClick={openCreateForm} className="bg-gray-600 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Ajouter véhicule
                </Button>
            </div>

            {isFormOpen && (
                <VehicleForm
                    initialValues={formInitialValues}
                    onClose={closeForm}
                    isOpen={isFormOpen}
                />
            )}

            {isAssignFormOpen && (
                <AssignDriver
                    onClose={closeAssignForm}
                    isOpen={isAssignFormOpen}
                />
            )}

            {isAddDriverFormOpen && (
                <AddDriverForm onClose={closeAddDriverForm} isOpen={isAddDriverFormOpen} />
            )}

            {isDataEmpty ? (
                
                <DataTableSkeleton columnCount={5} rowCount={10} />

                ) : (

                    <DataTable
                        columns={vehicleColumns}
                        data={vehicles}
                        onChangeState={handleChangeState}
                        onUpdateData={handleUpdate}
                        onDeleteData={handleDelete}
                        onValidateData={handleValidate}
                        stateOptions={["active", "inactive"]}
                        onNextPage={handleNextPage}
                        onPreviousPage={handlePreviousPage}
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={limit}
                    />

                )}

        </div>
    );
}