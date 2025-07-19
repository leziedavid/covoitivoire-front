import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "../ApiReponse/ProduitsResponse"; // Assure-toi que ce chemin est correct

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "imageUrl",
        header: "IMAGE",
        cell: ({ row }) => {
            const imageUrl = row.original.imageUrl;
            return imageUrl ? (
                <div className="w-16 h-16 relative rounded overflow-hidden" >
                    <Image
                        src={imageUrl}
                        alt="Image produit"
                        fill
                        sizes="64px"
                        style={{ objectFit: "cover" }
                        }
                    />
                </div>
            ) : (
                <Badge className="bg-gray-100 text-gray-600" > Pas d'image</Badge>
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                NOM
                < ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium" > {row.original.name} </div>,
    },
    {
        accessorKey: "price",
        header: "PRIX",
        cell: ({ row }) => <div>{row.original.price.toLocaleString()} FCFA </div>,
    },
    {
        accessorKey: "stock",
        header: "STOCK",
        cell: ({ row }) => <div>{row.original.stock} </div>,
    },
    {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => <div className="text-sm" > {row.original.sku} </div>,
    },
    {
        accessorKey: "category.name",
        header: "CATÉGORIE",
        cell: ({ row }) => <div>{row.original.category?.name ?? "N/A"} </div>,
    },
    {
        accessorKey: "service.name",
        header: "SERVICE",
        cell: ({ row }) => <div>{row.original.service?.name ?? "N/A"} </div>,
    },
    {
        accessorKey: "createdAt",
        header: "AJOUTÉ LE",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);
            return (
                <span>
                    {date.toLocaleDateString()} - {" "}
                    {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
            );
        },
    },
];
