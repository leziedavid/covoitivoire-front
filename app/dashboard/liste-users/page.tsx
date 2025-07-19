"use client";

import { DataTable } from "@/components/table/dataTable";
import { getUserColumns} from "@/types/columns/users-columns";
import { useOrderSocket } from '@/lib/socket/useOrderSocket';
import { User } from "@/types/ApiReponse/UsersResponse";
import { useEffect, useState } from "react";
import { getAllUser } from "@/api/services/authService";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { UserForm } from "@/components/form/userForm";
import FilesPreviewDialog from "@/components/form/filesPreviewDialog";


export default function Page() {

    useOrderSocket() // ← Active les sockets seulement ici
    

        const [user, setUser] = useState<User[]>([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [totalItems, setTotalItems] = useState(0);
        const [limit] = useState(10);
    
        const [isFormOpen, setIsFormOpen] = useState(false);
        const [isAssignFormOpen, setIsAssignFormOpen] = useState(false);
        const [initialValues, setInitialValues] = useState<User>();
        const [isAddDriverFormOpen, setIsAddDriverFormOpen] = useState(false);

        const [previewUrl, setPreviewUrl] = useState("");
        const [dialogOpen, setDialogOpen] = useState(false);


    const handlePreview = (url: string, isImg: boolean) => {
        if (isImg) {
            setPreviewUrl(url);
            setDialogOpen(true);
        } else {
            window.open(url, "_blank");
        }
    };
    
        const fetchData = async (page: number) => {
            try {
                const res = await getAllUser(page, limit);
                if (res.data) {
                    setUser(res.data.data);
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






    function handleChangeState(row: User, newStates: string[]) {
        alert(`Change state of ${row.id} to ${newStates.join(", ")}`);
    }

    function handleUpdate(row: User) {
        setIsFormOpen(true);
        setInitialValues(row);
    }

    function handleDelete(row: User) {
        alert(`Delete ${row.id}`);
    }

    function handleValidate(row: User, val: string | number) {
        alert(`Validate ${row.id} with value: ${val}`);
    }

    // Exemple : si tu souhaites gérer la pagination manuellement (sinon, tu peux omettre ces fonctions)
    function handleNextPage() {
        alert("Next page requested");
    }
    function handlePreviousPage() {
        alert("Previous page requested");
    }

    function openUserForm() {
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
        setInitialValues(undefined);
        fetchData(currentPage);
    }


    const isDataEmpty = !user || user.length <= 0;

    return (

        <div className="w-full overflow-x-auto">

            <div className="flex justify-end mb-4 space-x-2">
                <Button onClick={openUserForm} className="bg-gray-600 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2" >
                    <UserPlus className="w-4 h-4" />
                    Ajouter un compte
                </Button>
            </div>


                {isDataEmpty ? (

                    <DataTableSkeleton columnCount={5} rowCount={10} />

                ) : (

                // <DataTable
                //     columns={userscolumns}
                //     data={user}
                //     onChangeState={handleChangeState}
                //     onUpdateData={handleUpdate}
                //     onDeleteData={handleDelete}
                //     // onValidateData={handleValidate}
                //     // stateOptions={["pending", "processing", "success", "failed"]}
                //     onNextPage={handleNextPage}          // optionnel : gère la page suivante
                //     onPreviousPage={handlePreviousPage}  // optionnel : gère la page précédente
                // />

                    <>
                        <DataTable
                            columns={getUserColumns(handlePreview)}
                            data={user}
                            onChangeState={handleChangeState}
                            onUpdateData={handleUpdate}
                            onDeleteData={handleDelete}
                            // onValidateData={handleValidate}
                            // stateOptions={["pending", "processing", "success", "failed"]}
                            onNextPage={handleNextPage}          // optionnel : gère la page suivante
                            onPreviousPage={handlePreviousPage}  // optionnel : gère la page précédente
                        />
                        <FilesPreviewDialog imageUrl={previewUrl} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>

                )}

            {isFormOpen && (
                <UserForm
                    initialValues={initialValues}
                    onClose={closeForm}
                    isOpen={isFormOpen}
                />
            )}

        </div>
    );
}


