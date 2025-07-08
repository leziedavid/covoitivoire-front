// app/(your-path)/trip-data-file.ts

"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
// On importe le type Trip depuis AllTypes.ts
import {TripStatus } from "@/types/AllTypes"  // ajuste le chemin selon ta structure
import Image from "next/image"
import { Trip } from "../ApiReponse/trajetResponse";

// export const data: Trip[] = [
//     {
//         id: "t1a2b3c4",
//         createdById: "user1",
//         driverId: "driver1",
//         vehicleId: "vehicle1",
//         departure: "Abidjan",
//         departureLatitude: 5.3489,
//         departureLongitude: -4.003,
//         arrival: "Yamoussoukro",
//         arrivalLatitude: 6.8218,
//         arrivalLongitude: -5.2767,
//         date: new Date("2025-06-15T08:30:00Z"),
//         departureTime: "08:30",
//         arrivalTime: "10:30",
//         estimatedArrival: new Date("2025-06-15T10:30:00Z"),
//         availableSeats: 3,
//         distance: 230,
//         price: 45,
//         description: "Trajet quotidien",
//         instructions: "Rendez-vous au parking Carrefour",
//         status: TripStatus.PENDING,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     },
//     {
//         id: "u5v6w7x8",
//         createdById: "user2",
//         driverId: "driver2",
//         vehicleId: "vehicle2",
//         departure: "Bouaké",
//         departureLatitude: 7.6939,
//         departureLongitude: -5.0303,
//         arrival: "Korhogo",
//         arrivalLatitude: 9.4592,
//         arrivalLongitude: -5.6291,
//         date: new Date("2025-06-14T14:00:00Z"),
//         departureTime: "14:00",
//         arrivalTime: "18:00",
//         estimatedArrival: new Date("2025-06-14T18:00:00Z"),
//         availableSeats: 1,
//         distance: 320,
//         price: 60,
//         description: "Trajet exceptionnel",
//         instructions: "Départ gare centrale",
//         status: TripStatus.IN_PROGRESS,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     },
//     {
//         id: "y9z0a1b2",
//         createdById: "user3",
//         driverId: "driver3",
//         vehicleId: "vehicle3",
//         departure: "San Pedro",
//         departureLatitude: 4.7492,
//         departureLongitude: -6.6363,
//         arrival: "Man",
//         arrivalLatitude: 7.4125,
//         arrivalLongitude: -7.5538,
//         date: new Date("2025-06-13T09:15:00Z"),
//         departureTime: "09:15",
//         arrivalTime: "14:30",
//         estimatedArrival: new Date("2025-06-13T14:30:00Z"),
//         availableSeats: 0,
//         distance: 400,
//         price: 75,
//         description: "Complet, aucune place dispo",
//         instructions: "Prévoir de l’eau",
//         status: TripStatus.COMPLETED,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     },
//     {
//         id: "c3d4e5f6",
//         createdById: "user4",
//         driverId: "driver4",
//         vehicleId: "vehicle4",
//         departure: "Korhogo",
//         departureLatitude: 9.4592,
//         departureLongitude: -5.6291,
//         arrival: "Boundiali",
//         arrivalLatitude: 9.5211,
//         arrivalLongitude: -6.4921,
//         date: new Date("2025-06-16T17:45:00Z"),
//         departureTime: "17:45",
//         arrivalTime: "18:45",
//         estimatedArrival: new Date("2025-06-16T18:45:00Z"),
//         availableSeats: 4,
//         distance: 75,
//         price: 55,
//         description: "Navette rapide",
//         instructions: "Présentez votre billet",
//         status: TripStatus.PENDING,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     },
//     {
//         id: "g7h8i9j0",
//         createdById: "user5",
//         driverId: "driver5",
//         vehicleId: "vehicle5",
//         departure: "Yamoussoukro",
//         departureLatitude: 6.8218,
//         departureLongitude: -5.2767,
//         arrival: "Daloa",
//         arrivalLatitude: 6.8774,
//         arrivalLongitude: -6.4502,
//         date: new Date("2025-06-17T06:00:00Z"),
//         departureTime: "06:00",
//         arrivalTime: "08:00",
//         estimatedArrival: new Date("2025-06-17T08:00:00Z"),
//         availableSeats: 2,
//         distance: 150,
//         price: 50,
//         description: "Départ matinal",
//         instructions: "Soyez à l’heure",
//         status: TripStatus.CANCELLED,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     },
// ]


export const columns: ColumnDef<Trip>[] = [
    {
        accessorKey: "departure",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                DÉPART
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) =>
            <div className="flex items-center gap-2">
                <span>{row.getValue("departure")}</span>
                <Image src="/ride.png" alt="Course" width={50} height={50} className="object-contain" />
            </div>,
        },
    {
        accessorKey: "arrival",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                ARRIVÉE
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) =>
        <div>{row.getValue("arrival")}</div>,
    },
    {
        accessorKey: "date",
        header: "DATE DE DÉPART",
        cell: ({ row }) => {
            const date = new Date(row.getValue("date"))
            return (
                <div className="text-right">
                    {date.toLocaleDateString()}{" "}
                    {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            )
        },
    },
    // {
    //     accessorKey: "departureTime",
    //     header: "HEURE DÉPART",
    //     cell: ({ row }) => <div>{row.getValue("departureTime")}</div>,
    // },
    // {
    //     accessorKey: "arrivalTime",
    //     header: "HEURE ARRIVÉE",
    //     cell: ({ row }) => <div>{row.getValue("arrivalTime")}</div>,
    // },
    {
        accessorKey: "estimatedArrival",
        header: "ARRIVÉE ESTIMÉE",
        cell: ({ row }) => {
            const date = new Date(row.getValue("estimatedArrival"))
            return (
                <div>
                    {date.toLocaleDateString()}{" "}
                    {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            )
        },
    },
    {
        accessorKey: "availableSeats",
        header: "PLACES",
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("availableSeats")}</div>
        ),
    },
    {
        accessorKey: "distance",
        header: "DISTANCE (KM)",
        cell: ({ row }) => <div>{row.getValue("distance")} km</div>,
    },
    {
        accessorKey: "instructions",
        header: "INSTRUCTIONS",
        cell: ({ row }) => (
            <div className="italic truncate max-w-[200px]">
                {row.getValue("instructions")}
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">PRIX (USD)</div>,
        cell: ({ row }) => {
            const price = row.getValue("price") as number
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: "STATUT",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
]
