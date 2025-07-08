"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/dataTable";
import { Button } from "@/components/ui/button";
import { columns as vehicleColumns } from "@/types/columns/vehicle-columns";
import { VehicleForm } from "@/components/form/VehicleForm";
import { Product, VehicleType } from "@/types/AllTypes";
import { VehicleRequest } from "@/types/ApiRequest/VehicleRequest";
import { Link2, Plus } from "lucide-react";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { ProductRequest } from "@/types/ApiRequest/ProductRequest";
import { ProductForm } from "@/components/form/ProductForm";
import { Flame, Send,Users,Heart,Eye} from 'lucide-react';
import { useOrderSocket } from '@/lib/socket/useOrderSocket';

type ProductWithVariantIds = Product & { variantIds?: string[] };

export default function Page() {

    useOrderSocket() // ← Active les sockets seulement ici
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAssignFormOpen, setIsAssignFormOpen] = useState(false);
    const [formInitialValues, setFormInitialValues] = useState<ProductRequest | undefined>(undefined);
    const [product, setProduct] = useState<Product[]>([]);

    function openCreateForm() {

        setFormInitialValues(undefined);
        setIsFormOpen(true);
    }

    function openEditForm(product: Product) {
        const { id, addedById, name, description, price, stock, sku, categoryId, serviceId, variantIds} = product as ProductWithVariantIds;
        const productRequest: ProductRequest = {  id,addedById,name, description: description ?? undefined, price,stock,sku, categoryId, serviceId,variantIds: variantIds ?? [] };
        setFormInitialValues(productRequest);
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
        setFormInitialValues(undefined);
    }

    function handleChangeState(row: Product, newStates: string[]) {
        alert(`Change state of ${row.id} to ${newStates.join(", ")}`);
    }

    function handleUpdate(row: Product) {
        openEditForm(row);
    }

    function handleDelete(row: Product) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer le véhicule "${row.name}" ?`)) {
            alert(`Delete ${row.id}`);
        }
    }

    function handleValidate(row: Product, val: string | number) {
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
    const isDataEmpty = !product || product.length <= 0;

    return (
        <div className="w-full overflow-x-auto">

            <div className="flex justify-end mb-4 space-x-2">
                <Button onClick={openCreateForm} className="bg-gray-600 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Ajouter véhicule
                </Button>
            </div>


            <div className="dark:bg-gray-800">

                <div className="col-span-3 md:col-span-2 flex flex-col items-center md:items-start gap-4 pt-1 px-2">

                    <p className="flex  w-full gap-2 pt-4 font-extrabold text-2xl md:text-3xl dark:text-white ">
                        <span>Lites des produits</span>
                        <Flame className="w-8 h-8 text-red-600" />
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8 pt-4 mx-auto  w-full">

                        <div title="All contributed components"
                            className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                            <div className="flex gap-2 items-center">
                                <span className="font-bold text-3xl md:text-4xl">30</span>
                                <Send className="w-8 h-8" />
                            </div>
                            <span className="font-semibold text-sm text-center">Components contributed</span>
                        </div>

                        <div title="Users got help"
                            className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                            <div className="flex gap-2 items-center">
                                <span className="font-bold text-3xl md:text-4xl">93.9k</span>
                                <Users className="w-8 h-8" />
                            </div>
                            <span className="font-semibold text-sm text-center">Users got help</span>
                        </div>

                        <div title="Total favorites received on components"
                            className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                            <div className="flex gap-2 items-center">
                                <span className="font-bold text-3xl md:text-4xl">60</span>
                                <Heart className="w-8 h-8" />
                            </div>
                            <span className="font-semibold text-sm text-center">Favorites received</span>
                        </div>

                        <div title="component views"
                            className="md:col-start-2 lg:col-auto flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                            <div className="flex gap-2 items-center">
                                <span className="font-bold text-3xl md:text-4xl">3.3k</span>
                                <Eye className="w-8 h-8" />
                            </div>
                            <span className="font-semibold text-sm text-center">Views in last 30 days</span>
                        </div>

                    </div>

                </div>

            </div>

            {isFormOpen && (
                <ProductForm
                    initialValues={formInitialValues}
                    onClose={closeForm}
                    isOpen={isFormOpen}
                    categories={[]}
                    variants={[]}
                />
            )}



        </div>
    );
}

