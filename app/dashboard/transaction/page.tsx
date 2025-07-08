"use client";

import { DataTable } from "@/components/table/dataTable";
import { columns as paymentColumns, Payment, data as paymentData } from "../../../types/data-file";
import { useOrderSocket } from '@/lib/socket/useOrderSocket';


export default function Page() {

    useOrderSocket() // ← Active les sockets seulement ici
    
    function handleChangeState(row: Payment, newStates: string[]) {
        alert(`Change state of ${row.id} to ${newStates.join(", ")}`);
    }

    function handleUpdate(row: Payment) {
        alert(`Update ${row.id}`);
    }

    function handleDelete(row: Payment) {
        alert(`Delete ${row.id}`);
    }

    function handleValidate(row: Payment, val: string | number) {
        alert(`Validate ${row.id} with value: ${val}`);
    }

    // Exemple : si tu souhaites gérer la pagination manuellement (sinon, tu peux omettre ces fonctions)
    function handleNextPage() {
        alert("Next page requested");
    }
    function handlePreviousPage() {
        alert("Previous page requested");
    }

    return (
        <DataTable
            columns={paymentColumns}
            data={paymentData}
            onChangeState={handleChangeState}
            onUpdateData={handleUpdate}
            onDeleteData={handleDelete}
            onValidateData={handleValidate}
            stateOptions={["pending", "processing", "success", "failed"]}
            onNextPage={handleNextPage}          // optionnel : gère la page suivante
            onPreviousPage={handlePreviousPage}  // optionnel : gère la page précédente
        />
    );
}


