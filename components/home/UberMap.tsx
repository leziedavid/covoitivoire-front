"use client"

import {
    GoogleMap,
    DirectionsRenderer,
    useJsApiLoader,
} from "@react-google-maps/api"
import { useEffect, useState } from "react"

interface LatLng {
    lat: number
    lng: number
}

interface MapProps {
    points: LatLng[]
}

const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "1rem",
}

const defaultCenter = {
    lat: 5.348,
    lng: -4.003,
}

export default function UberMap({ points }: MapProps) {
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
    const [mapCenter, setMapCenter] = useState(defaultCenter)

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
        libraries: ["places"],
    })

    useEffect(() => {
        if (!isLoaded || !points || points.length < 2) return

        const origin = points[0]
        const destination = points[points.length - 1]
        const waypoints = points.slice(1, -1).map((p) => ({
            location: { lat: p.lat, lng: p.lng },
            stopover: true,
        }))

        setMapCenter(origin)

        const directionsService = new google.maps.DirectionsService()
        directionsService.route(
            {
                origin,
                destination,
                waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === "OK" && result) {
                    setDirections(result)
                } else {
                    console.warn("Échec du calcul d’itinéraire :", status)
                }
            }
        )
    }, [points, isLoaded])

    if (loadError) return <div>Erreur de chargement de la carte</div>
    if (!isLoaded) return <div>Chargement de la carte...</div>

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={13}
        >
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    )
}
