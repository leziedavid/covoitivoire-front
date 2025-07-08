'use client'

import { useState } from 'react'
import {OrderStatus,PaymentMethod,Role,VehicleType,UserStatus,TripStatus,} from '@/types/AllTypes'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, FileText, Filter, CarFront } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Order } from '@/types/ApiReponse/OrderResponse'
import Image from "next/image";

// 🧪 Exemple de données enrichies
const fakeOrders: Order[] = [

    {
        id: '1',
        orderNumber: 'CMD-2023-001',
        userId: 'u1',
        tripId: 't1',
        vehicleId: 'v1',
        vehicle: {
            id: 'v1',
            name: 'Renault Clio',
            brand: 'Renault',
            capacity: 4,
            fuel: 'Essence',
            color: 'Rouge',
            model: '2020',
            registration: 'CL-2020',
            licensePlate: 'AB-123-CD',
            serialNumber: 'XYZ1234567',
            type: VehicleType.ECONOMIQUE,
            partnerId: 'partner1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        user: {
            id: 'u1',
            name: 'Jean Dupont',
            email: '',
            role: Role.USER,
            status: UserStatus.ACTIVE,
            password: '',
            phoneCountryCode: null,
            phoneNumber: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            partnerId: null,
        },
        trip: {
            id: 't1',
            createdById: 'admin1',
            driverId: 'd1',
            vehicleId: 'v1',
            departure: 'Paris',
            arrival: 'Lyon',
            departureLatitude: 48.8566,
            departureLongitude: 2.3522,
            arrivalLatitude: 45.75,
            arrivalLongitude: 4.85,
            date: new Date(),
            estimatedArrival: new Date(),
            availableSeats: 3,
            status: TripStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
            price: 35,
            vehicle: {
                id: 'v1',
                name: 'Renault Clio',
                brand: 'Renault',
                capacity: 4,
                fuel: 'Essence',
                color: 'Rouge',
                model: '2020',
                registration: 'CL-2020',
                licensePlate: 'AB-123-CD',
                serialNumber: 'XYZ1234567',
                type: VehicleType.ECONOMIQUE,
                partnerId: 'partner1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            departureTime: '',
            arrivalTime: '',
            distance: null,
            description: '',
            instructions: '',

        },
        status: OrderStatus.PENDING,
        paymentMethod: PaymentMethod.MOBILE_MONEY,
        amount: 25.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        canceledAt: null,
        completedAt: null,
    },

    {
        id: '2',
        orderNumber: 'CMD-2023-002',
        userId: 'u1',
        tripId: 't1',
        vehicleId: 'v1',
        vehicle: {
            id: 'v1',
            name: 'Renault Clio',
            brand: 'Renault',
            capacity: 4,
            fuel: 'Essence',
            color: 'Rouge',
            model: '2020',
            registration: 'CL-2020',
            licensePlate: 'AB-123-CD',
            serialNumber: 'XYZ1234567',
            type: VehicleType.ECONOMIQUE,
            partnerId: 'partner1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        user: {
            id: 'u1',
            name: 'Jean Dupont',
            email: '',
            role: Role.USER,
            status: UserStatus.ACTIVE,
            password: '',
            phoneCountryCode: null,
            phoneNumber: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            partnerId: null,
        },
        trip: {
            id: 't1',
            createdById: 'admin1',
            driverId: 'd1',
            vehicleId: 'v1',
            departure: 'Paris',
            arrival: 'Lyon',
            departureLatitude: 48.8566,
            departureLongitude: 2.3522,
            arrivalLatitude: 45.75,
            arrivalLongitude: 4.85,
            date: new Date(),
            estimatedArrival: new Date(),
            availableSeats: 3,
            status: TripStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
            price: 35,
            vehicle: {
                id: 'v1',
                name: 'Renault Clio',
                brand: 'Renault',
                capacity: 4,
                fuel: 'Essence',
                color: 'Rouge',
                model: '2020',
                registration: 'CL-2020',
                licensePlate: 'AB-123-CD',
                serialNumber: 'XYZ1234567',
                type: VehicleType.ECONOMIQUE,
                partnerId: 'partner1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            departureTime: '',
            arrivalTime: '',
            distance: null,
            description: '',
            instructions: '',

        },
        status: OrderStatus.PENDING,
        paymentMethod: PaymentMethod.MOBILE_MONEY,
        amount: 25.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        canceledAt: null,
        completedAt: null,
    },

    {
        id: '',
        orderNumber: 'CMD-2023-003',
        userId: 'u1',
        tripId: 't1',
        vehicleId: 'v1',
        vehicle: {
            id: 'v1',
            name: 'Renault Clio',
            brand: 'Renault',
            capacity: 4,
            fuel: 'Essence',
            color: 'Rouge',
            model: '2020',
            registration: 'CL-2020',
            licensePlate: 'AB-123-CD',
            serialNumber: 'XYZ1234567',
            type: VehicleType.ECONOMIQUE,
            partnerId: 'partner1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        user: {
            id: 'u1',
            name: 'Jean Dupont',
            email: '',
            role: Role.USER,
            status: UserStatus.ACTIVE,
            password: '',
            phoneCountryCode: null,
            phoneNumber: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            partnerId: null,
        },
        trip: {
            id: 't1',
            createdById: 'admin1',
            driverId: 'd1',
            vehicleId: 'v1',
            departure: 'Paris',
            arrival: 'Lyon',
            departureLatitude: 48.8566,
            departureLongitude: 2.3522,
            arrivalLatitude: 45.75,
            arrivalLongitude: 4.85,
            date: new Date(),
            estimatedArrival: new Date(),
            availableSeats: 3,
            status: TripStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
            price: 35,
            vehicle: {
                id: 'v1',
                name: 'Renault Clio',
                brand: 'Renault',
                capacity: 4,
                fuel: 'Essence',
                color: 'Rouge',
                model: '2020',
                registration: 'CL-2020',
                licensePlate: 'AB-123-CD',
                serialNumber: 'XYZ1234567',
                type: VehicleType.ECONOMIQUE,
                partnerId: 'partner1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            departureTime: '',
            arrivalTime: '',
            distance: null,
            description: '',
            instructions: '',

        },
        status: OrderStatus.PENDING,
        paymentMethod: PaymentMethod.MOBILE_MONEY,
        amount: 25.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        canceledAt: null,
        completedAt: null,
    },

]

const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    VALIDATED: 'bg-blue-100 text-blue-800',
    IN_PROGRESS: 'bg-purple-100 text-purple-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
}

export default function TripOrderList({ orders = fakeOrders }: { orders?: Order[] }) {

    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL')

    const filtered = statusFilter === 'ALL' ? orders : orders.filter((o) => o.status === statusFilter)

    const exportPDF = () => {

        const doc = new jsPDF()

        doc.text('Liste des commandes de trajet', 14, 16)
        autoTable(doc, {
            startY: 22,
            head: [['Nom', 'Montant (Fcfa)', 'Paiement', 'Statut']],
            body: filtered.map((o) => [
                o.user.name,
                `${o.amount} Fcfa`,
                o.paymentMethod,
                o.status,
            ]),
        })
        doc.save('trip-orders.pdf')
    }

    const formatDateTime = (date: Date) =>
        new Intl.DateTimeFormat('fr-FR', {
            dateStyle: 'full',
            timeStyle: 'short',
        }).format(new Date(date));


    return (

        <Card className="mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">Commandes de trajet</CardTitle>
                <Button variant="outline" size="sm" onClick={exportPDF}>
                    <FileText className="w-4 h-4 mr-2" /> Export PDF
                </Button>
            </CardHeader>

            <CardContent>
                
                <div className="flex items-center gap-3 mb-4">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <select className="border rounded px-3 py-1 text-sm" value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'ALL')} >
                        <option value="ALL">Tous les statuts</option>
                        {Object.values(OrderStatus).map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-4">
                    {filtered.map((order) => (
                        <div key={order.id} className="p-4 border bg-gray-100 rounded-lg flex justify-between items-start gap-4 relative overflow-hidden" >
                            <div>

                                <p className="font-semibold">{order.user.name}</p>
                                <p className="text-xs text-orange-500 font-bold">N° : {order.orderNumber}</p>
                                <p className="text-sm sm:text-xs text-muted-foreground">
                                    {order.amount} Fcfa • {order.paymentMethod}
                                </p>

                                <p className="text-sm sm:text-xs text-muted-foreground">
                                    <span className="font-medium block"> </span>
                                    {formatDateTime(order.trip.date)}
                                </p>

                                {order.trip?.vehicle && (
                                    <div className="mt-2 text-sm flex items-start gap-2">
                                        <CarFront className="w-4 h-4 mt-1 text-orange-500" />
                                        <div>
                                            <p>
                                                <span className="vtext-sm sm:text-xs font-medium">Véhicule:</span>{' '}
                                                {order.trip.vehicle.name} • {order.trip.vehicle.brand}
                                            </p>
                                            <p className=" text-sm sm:text-xs text-muted-foreground text-xs font-bold">
                                                Plaque: {order.trip.vehicle.licensePlate}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-3 flex flex-row gap-2">
                                    <Button className="flex-1 w-auto bg-green-600 text-white text-[10px] px-2 py-1 h-auto" >
                                        ACCEPTER
                                    </Button>
                                    <Button  className="flex-1 w-auto bg-red-600 text-white text-[10px] px-2 py-1 h-auto">
                                        REJETER
                                    </Button>
                                </div>

                            </div>

                            <div className="flex items-center gap-4">
                                <Badge className={statusColors[order.status]}>
                                    {order.status}
                                </Badge>
                                <Button variant="ghost" size="icon">
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* 🚗 Petite voiture ride */}
                            <Image src="/ride.png"  alt="ride" width={64} height={64} className="absolute -bottom-4 -right-4 opacity-20 pointer-events-none"/>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center">
                            Aucune commande trouvée.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>

    )
}
