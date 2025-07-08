"use client";

import { useEffect, useState } from "react";
import { fetchTrips } from "@/api/services/authService";
import { Trip } from "@/types/ApiReponse/trajetResponse";
import TripList from "@/components/home/TripList";
import { TripStatus, VehicleType } from "@/types/AllTypes";
import { Footer } from "@/components/home/Footer";
import Search from "@/components/home/Search";
import Header from "@/components/home/header";

export const mockTrips: Trip[] = [
  {
    id: "1",
    createdById: "user-1",
    driverId: "driver-1",
    vehicleId: "veh-1",
    departure: "Abidjan",
    departureLatitude: 5.3481,
    departureLongitude: -4.0075,
    arrival: "Yamoussoukro",
    arrivalLatitude: 6.8276,
    arrivalLongitude: -5.2893,
    date: "2025-06-20",
    departureTime: "08:00",
    arrivalTime: "11:00",
    estimatedArrival: "2025-06-20T11:00:00",
    availableSeats: 3,
    distance: 230,
    price: 7500,
    description: "Voyage confortable avec climatisation.",
    instructions: "Présentez-vous 15 min avant le départ.",
    status: TripStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
    vehicle: {
      id: "veh-1",
      name: "Toyota Corolla",
      brand: "Toyota",
      model: "Corolla",
      capacity: 5,
      fuel: "Essence",
      color: "Gris",
      registration: "RC-ABJ-123",
      licensePlate: "AB-123-CD",
      serialNumber: "SN123456789",
      type: VehicleType.CONFORT, // remplace par la valeur correcte de ton enum VehicleType
      partnerId: "partner-1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    stopPoints: [],
    orders: [],
  },
  {
    id: "2",
    createdById: "user-2",
    driverId: "driver-2",
    vehicleId: "veh-2",
    departure: "Bouaké",
    departureLatitude: 7.6848,
    departureLongitude: -5.0303,
    arrival: "Korhogo",
    arrivalLatitude: 9.4608,
    arrivalLongitude: -5.6396,
    date: "2025-06-21",
    departureTime: "09:30",
    arrivalTime: "13:00",
    estimatedArrival: "2025-06-21T13:00:00",
    availableSeats: 2,
    distance: 340,
    price: 9500,
    description: "Trajet rapide et sécurisé.",
    instructions: "Contactez le chauffeur en cas de retard.",
    status: TripStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
    vehicle: {
      id: "veh-2",
      name: "Hyundai Accent",
      brand: "Hyundai",
      model: "Accent",
      capacity: 5,
      fuel: "Diesel",
      color: "Noir",
      registration: "RC-BKE-456",
      licensePlate: "BK-456-EF",
      serialNumber: "SN987654321",
      type: VehicleType.CONFORT,
      partnerId: "partner-2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    stopPoints: [],
    orders: [],
  },
  // Ajoute d'autres trajets ici...
];

export default function Page() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit] = useState(10);

    // Récupération des trajets
    const fetchData = async (page: number) => {
        try {
            setLoading(true);
            const res = await fetchTrips(page, limit);
            if (res.data) {
                setTrips(res.data.data);
                setTotalItems(res.data.total);
                setCurrentPage(res.data.page);
                setLoading(false);
            }
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };


  useEffect(() => {

    fetchData(currentPage);
    async function loadTrips() {
      try {
        // const response = await fetchTrips();
        // setTrips(response.data.data);

        // temporairement, utiliser les données mock
        setTrips(mockTrips);

      } catch (error) {
        console.error("Erreur lors du chargement des trajets :", error);
      } finally {
        setLoading(false);
      }
    }

    loadTrips();

  }, [currentPage]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Chargement des trajets...</div>;
  }


  return (


    <>

      <div className="mb-8">
        <Header />
        <div className={`min-h-[calc(100vh_-_56px)] py-20`}>
          <Search />
          <TripList trips={trips} />;
        </div>
        {/* <Footer /> */}
      </div>
    </>

  );

}
