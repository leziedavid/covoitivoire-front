import { Badge } from "@/components/ui/badge"
import { Vehicle } from "../ApiReponse/VehicleResponse";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { FileManager } from "../AllTypes";
import Image from "next/image"


export const columns: ColumnDef<Vehicle>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                NOM DU VÉHICULE
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "files",
        header: "IMAGE",
        cell: ({ row }) => {
            const files = row.getValue("files") as FileManager[];
            const firstImage = files?.[0]?.fileUrl;
            const imageUrl = firstImage || "/ride.png";

            return (
                <div className="flex items-center">
                    <div className="w-10 h-10 overflow-hidden rounded">
                        <Image src={imageUrl} alt="Image" width={80} height={80} className="w-full h-full object-cover"/>
                    </div>
                </div>
            );
        },
    },


    {
        accessorKey: "brand",
        header: "MARQUE",
        cell: ({ row }) => <div>{row.getValue("brand")}</div>,
    },
    {
        accessorKey: "model",
        header: "MODÈLE",
        cell: ({ row }) => <div>{row.getValue("model")}</div>,
    },
    {
        accessorKey: "licensePlate",
        header: "IMMATRICULATION",
        cell: ({ row }) => <div>{row.getValue("licensePlate")}</div>,
    },
    {
        accessorKey: "fuel",
        header: "CARBURANT",
        cell: ({ row }) => <div className="capitalize">{row.getValue("fuel")}</div>,
    },
    {
        accessorKey: "capacity",
        header: "CAPACITÉ",
        cell: ({ row }) => <div>{row.getValue("capacity")} places</div>,
    },
    {
        accessorKey: "color",
        header: "COULEUR",
        cell: ({ row }) => <div className="capitalize">{row.getValue("color")}</div>,
    },
    {
        accessorKey: "type",
        header: "TYPE",
        cell: ({ row }) => <div className="uppercase font-semibold">{row.getValue("type")}</div>,
    },

    {
        accessorKey: "partner",  // Accéder à l'objet partenaire
        header: "PROPRIÉTAIRE",
        cell: ({ row }) => {
            const partner = row.getValue("partner") as { name?: string } | undefined;
            return (
                <Badge className="bg-gray-500 text-white">
                    {partner?.name || "Nom non disponible"}
                </Badge>
            );
        },
    },
    // {
    //     accessorKey: "drivers",  // Accéder à la liste des conducteurs
    //     header: "CONDUCTEUR(S)",
    //     cell: ({ row }) => {
    //         const drivers = (row.getValue("drivers") as { name: string }[]) || [];
    //         return (
    //             <div>
    //                 {drivers.length > 0 ? (
    //                     drivers.map((driver, index) => (
    //                         <Badge key={index} variant="secondary" className="mr-1">
    //                             {driver.name}
    //                         </Badge>
    //                     ))
    //                 ) : (
    //                     <span className="text-muted-foreground">Aucun conducteur</span>
    //                 )}
    //             </div>
    //         );
    //     },
    // },
    {
        accessorKey: "createdAt",
        header: "DATE DE CREATION",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))
            return (
                <div className="text-sm text-muted-foreground">
                    {date.toLocaleDateString()} - {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            )
        },
    },
];
