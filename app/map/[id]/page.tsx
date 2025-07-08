"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fetchTripById } from "@/api/services/authService"
import { Trip } from "@/types/ApiReponse/trajetResponse"
import UberMap from "@/components/home/UberMap"
import Header from "@/components/home/header"

export default function Page() {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const id = params?.id as string

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetchTripById(id)
        if (res.data) {
          setTrip(res.data)
        }
      } catch (e) {
        console.error("Erreur lors du chargement du trajet :", e)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchData()
  }, [id])

  // Création des points GPS
  const mapPoints =
    trip?.departureLatitude && trip?.arrivalLatitude
      ? [
        { lat: trip.departureLatitude, lng: trip.departureLongitude },
        ...(trip.stopPoints?.map((p) => ({ lat: p.latitude, lng: p.longitude })) || []),
        { lat: trip.arrivalLatitude, lng: trip.arrivalLongitude },
      ]
      : []

  return (
    <>
      <div className="mb-8">
        <Header />
        <div className="min-h-[calc(100vh_-_56px)] py-20 px-4">
          {/* Loader Skeleton Google Map */}
          {loading && (
            <div className="w-full h-[600px] bg-gray-200 animate-pulse rounded-xl" />
          )}

          {/* Affichage de la carte quand les points sont prêts */}
          {!loading && trip && mapPoints.length >= 2 && (
            <div className="w-full h-[600px]">
              <UberMap points={mapPoints} />
            </div>
          )}

          {/* Message d'erreur si les données GPS sont incomplètes */}
          {!loading && mapPoints.length < 2 && (
            <div className="text-center text-red-500">
              Données GPS incomplètes pour afficher la carte.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
