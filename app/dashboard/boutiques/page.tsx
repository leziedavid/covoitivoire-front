"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/dataTable";
import { Button } from "@/components/ui/button";
import { columns as vehicleColumns } from "@/types/columns/vehicle-columns";
import { VehicleForm } from "@/components/form/VehicleForm";
import { Category} from "@/types/AllTypes";
import { VehicleRequest } from "@/types/ApiRequest/VehicleRequest";
import { Link2, Plus, ShoppingCart, StretchHorizontal, SwatchBook } from "lucide-react";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { ProductRequest } from "@/types/ApiRequest/ProductRequest";
import { ProductForm } from "@/components/form/ProductForm";
import { Flame, Send,Users,Heart,Eye} from 'lucide-react';
import { useOrderSocket } from '@/lib/socket/useOrderSocket';
import { getAllProducts, getAllValidProducts, getCategories, getGlobalProductStats, getOrdersAndRevenueStats, getUserProductStats } from "@/api/services/authService";
import { Product } from "@/types/ApiReponse/ProduitsResponse";
import { getUserRole } from "@/app/middleware";
import { columns as produitsColumns } from "@/types/columns/produits-columns";
import {StatistiquesDesProduitsResponse } from "@/types/ApiReponse/StatistiquesDesProduitsResponse";
import { StatistiquesCommandesResponse } from "@/types/ApiReponse/StatistiquesCommandesResponse";
import LineChart from "@/components/chart/LineChart";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    const [categories, setCategories] = useState<Category[]>([]);
    const [roles, setRoles] = useState<string>("");
    const [userProductStats, setUserProductStats] = useState<StatistiquesDesProduitsResponse | null>(null);
    const [globalProductStats, setGlobalProductStats] = useState<StatistiquesDesProduitsResponse | null>(null);
    const [ordersAndRevenueStats, setOrdersAndRevenueStats] = useState<StatistiquesCommandesResponse | null>(null);
    // startDate
    const [startDate, setStartDate] = useState<string | null>(null);
    // endDate
    const [endDate, setEndDate] = useState<string | null>(null);

    const router = useRouter();
    const [tab, setTab] = useState<'products' | 'orders'>('products');

    // getUserroles
    const fetchroles = async () => {
        const roles = await getUserRole();
    }

    // Liste des produits
    const getAllProduct = async () => {
        try {
            const res = await getAllProducts(currentPage,limit);
            if (res.data) {
                setProduct(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
            }
        } catch (e) {
            console.error(e);
        }
    };
    // liste des produit d'un utilisateur connnecté getAllValidProducts

    const getUserValidProducts = async () => {
        try {
            const res = await getAllValidProducts(currentPage,limit);
            if (res.data) {
                setProduct(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
            }
        } catch (e) {
            console.error(e);
        }
    };

    
    // getUserProductStats
    const fetchUserProductStats = async () => {
        try {
            const res = await getUserProductStats();
            if (res.data) {
                setUserProductStats(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };
    
    // getGlobalProductStats
    const fetchGlobalProductStats = async () => {
        try {
            const res = await getGlobalProductStats();
            if (res.data) {
                setGlobalProductStats(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };
    
    // getOrdersAndRevenueStats
    const fetchOrdersAndRevenueStats = async ( startDate?: string, endDate?: string) => {
        try {
            const res = await getOrdersAndRevenueStats(startDate, endDate);
            if (res.data) {
                setOrdersAndRevenueStats(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };
    
    // get category
    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            if (res.data) {
                setCategories(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchroles();
        fetchCategories();

        if (roles === "ADMIN") {
            getAllProduct();
            fetchGlobalProductStats();
            fetchOrdersAndRevenueStats();
        }
        else {
            getUserValidProducts();
            fetchUserProductStats();
            fetchOrdersAndRevenueStats();

        }

    }, [roles, startDate, endDate]);

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

    const handleTabChange = (value: string) => {
        setTab(value as 'products' | 'orders');
        if (value === 'products') router.push('/dashboard/boutiques');
        if (value === 'orders') router.push('/dashboard/ecommandes');
    };

    const isDataEmpty = !product || product.length <= 0;

    return (
        <div className="w-full overflow-x-auto">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                {/* Tabs à gauche */}
                <Tabs value={tab} onValueChange={handleTabChange}>
                    <TabsList className="bg-gray-100 rounded-xl p-1">
                        <TabsTrigger value="products" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg px-4 py-2" >
                            Mes produits
                        </TabsTrigger>
                        <TabsTrigger value="orders" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg px-4 py-2" >
                            Mes commandes
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Bouton à droite */}
                <Button
                    onClick={openCreateForm}
                    className="bg-gray-600 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2 self-end md:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    Nouveau produit
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
                                <span className="font-bold text-xl md:text-2xl">{userProductStats?.totalOrders} </span>
                                <ShoppingCart className="w-6 h-6" />
                            </div>
                            <span className="font-semibold text-sm text-center"> Total Commandes</span>
                        </div>
  
                        <div title="Users got help"
                            className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                            <div className="flex gap-2 items-center">
                                <span className="font-bold text-xl md:text-2xl">{userProductStats?.totalSoldProducts} </span>
                                <Heart className="w-6 h-6" />
                            </div>
                            <span className="font-semibold text-sm text-center"> Total Vendus</span>
                        </div>

                        <div title="Total favorites received on components"
                            className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                            <div className="flex gap-2 items-center">
                                <span className="font-bold text-xl md:text-2xl"> {userProductStats?.totalProducts} </span>
                                <SwatchBook className="w-6 h-6" />
                            </div>
                            <span className="font-semibold text-sm text-center"> Total Produits</span>
                        </div>

                        <div title="component views"
                            className="md:col-start-2 lg:col-auto flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32 dark:text-gray-200">
                            <div className="flex gap-2 items-center">
                                <span className="font-bold text-xl md:text-2xl"> {userProductStats?.totalStock} </span>
                                <StretchHorizontal className="w-6 h-6" />
                                
                            </div>
                            <span className="font-semibold text-sm text-center"> Stock Total</span>
                        </div>

                    </div>

                </div>

            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <LineChart data={ordersAndRevenueStats ?? null} />
            </div>

            {isDataEmpty ? (

                <DataTableSkeleton columnCount={5} rowCount={10} />

            ) : (

                <DataTable
                    columns={produitsColumns}
                    data={product}
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

            {isFormOpen && (
                <ProductForm
                    initialValues={formInitialValues}
                    onClose={closeForm}
                    isOpen={isFormOpen}
                    categories={categories}
                    variants={[]}
                />
            )}

        </div>
    );
}

