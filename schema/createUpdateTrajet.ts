// schema/createUpdateTrajet.ts
import { TripStatus } from '@/types/AllTypes';
import { z } from 'zod';

export const stopPointSchema = z.object({
    label: z.string().optional(),
    latitude: z.number({ required_error: 'Latitude requise' }),
    longitude: z.number({ required_error: 'Longitude requise' }),
    order: z.number().int().min(0, "L'ordre doit être >= 0"),
});

export const createUpdateTripSchema = z.object({
    id: z.string().optional(),
    createdById: z.string().uuid(),
    driverId: z.string().uuid(),
    vehicleId: z.string().uuid(),
    departure: z.string().min(1, 'Champ requis'),
    departureLatitude: z.number(),
    departureLongitude: z.number(),
    arrival: z.string().min(1, 'Champ requis'),
    arrivalLatitude: z.number(),
    arrivalLongitude: z.number(),
    date: z.date(),
    estimatedArrival: z.date(),
    description: z.string().optional(),
    instructions: z.string().optional(),
    distance: z.number(),
    availableSeats: z.number().min(1),
    price: z.number().min(0),
    status: z.nativeEnum(TripStatus).optional(),
    stopPoints: z.array(stopPointSchema).optional(),
});