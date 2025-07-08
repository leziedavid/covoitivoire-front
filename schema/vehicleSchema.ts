import { z } from "zod";
import { VehicleType } from "@/types/AllTypes"; // Assure-toi que VehicleType est bien importé

export const vehicleSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, "Le nom est requis").max(100, "Le nom ne peut pas dépasser 100 caractères"),
    brand: z.string().min(1, "La marque est requise"),
    model: z.string().min(1, "Le modèle est requis"),
    capacity: z.number().min(1, "La capacité doit être d'au moins 1 passager"),
    fuel: z.string().min(1, "Le type de carburant est requis"),
    color: z.string().min(1, "La couleur est requise"),
    registration: z.string().min(1, "Le numéro d'immatriculation est requis"),
    licensePlate: z.string().min(1, "La plaque d'immatriculation est requise"),
    serialNumber: z.string().min(1, "Le numéro de série est requis"),
    type: z.nativeEnum(VehicleType),
    partnerId: z.string().uuid("ID partenaire invalide"),
    file: z.any().optional(),
});

// ✅ Interface basée sur le schema ci-dessus pour les requêtes de création/modification
export type VehicleRequest = z.infer<typeof vehicleSchema>;
