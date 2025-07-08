"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUserId, getUserInfos } from "@/app/middleware";
import { VehicleRequest } from "@/types/ApiRequest/VehicleRequest";
import { vehicleSchema } from "@/schema/vehicleSchema";
import { VehicleType } from "@/types/AllTypes";
import { FileUploader } from "../upload/FileUploader";
import { createVehicle, updateVehicle } from "@/api/services/authService";

type Vehicle = z.infer<typeof vehicleSchema>;

type VehicleFormProps = {
    initialValues?: Partial<VehicleRequest>;
    isOpen: boolean;
    onClose: () => void;
};

export function VehicleForm({ initialValues, isOpen, onClose }: VehicleFormProps) {

    // Pour gérer les fichiers
    const [files, setFiles] = useState<Record<string, File[]>>({});
    const [progresses, setProgresses] = useState<Record<string, Record<string, number>>>({});

    const {register,handleSubmit,setValue,control,reset,formState: { errors, isSubmitting },} = useForm<Vehicle>({ resolver: zodResolver(vehicleSchema),
        defaultValues: {
            ...initialValues,
            name: initialValues?.name || "",
            brand: initialValues?.brand || "",
            model: initialValues?.model || "",
            capacity: initialValues?.capacity || 1,
            fuel: initialValues?.fuel || "",
            color: initialValues?.color || "",
            registration: initialValues?.registration || "",
            licensePlate: initialValues?.licensePlate || "",
            serialNumber: initialValues?.serialNumber || "",
            type: initialValues?.type || VehicleType.ECONOMIQUE,
            partnerId: initialValues?.partnerId || "",
        },
    });

    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            if (id) {
                setUserID(id);
                    if (!initialValues?.partnerId) { setValue("partnerId", id);
                }
            }
        };
        fetchUserId();
    }, [initialValues?.partnerId, setValue]);

    const handleValueChange = (name: string, fileList: File[]) => {
        setFiles((prev) => ({ ...prev, [name]: fileList }));
        setValue(name as any, fileList, { shouldValidate: true }); // cast pour éviter l'erreur de typage
    };

    const handleUpload = async (name: string, files: File[]) => {

        const fileProgress: Record<string, number> = {};

        for (const file of files) {
            fileProgress[file.name] = 0;
            setProgresses((prev) => ({
                ...prev,
                [name]: { ...(prev[name] || {}), ...fileProgress },
            }));

            await new Promise((res) => setTimeout(res, 300)); // simulation
            fileProgress[file.name] = 100;

            setProgresses((prev) => ({
                ...prev,
                [name]: { ...(prev[name] || {}), ...fileProgress },
            }));
        }
    };


    const handleFormSubmit = async (data: Vehicle) => {
        try {
            const formData = new FormData();

            // Préparer les champs texte
            formData.append("name", data.name);
            formData.append("brand", data.brand);
            formData.append("model", data.model);
            formData.append("capacity", data.capacity.toString());
            formData.append("fuel", data.fuel);
            formData.append("color", data.color);
            formData.append("registration", data.registration);
            formData.append("licensePlate", data.licensePlate);
            formData.append("serialNumber", data.serialNumber);
            formData.append("type", data.type);
            formData.append("partnerId", data.partnerId);

            // Ajouter le fichier (si présent)
            const uploadedFiles = files["file"];
            if (uploadedFiles && uploadedFiles.length > 0) {
                formData.append("file", uploadedFiles[0]); // 1 seul fichier
            }

            let response;
            if (initialValues?.id) {
                // Si c’est une modification
                response = await updateVehicle(initialValues.id, formData);
            } else {
                // Sinon, c’est une création
                response = await createVehicle(formData);
            }

            if (!response || response.statusCode >= 400) {
                throw new Error(response.message || "Erreur serveur.");
            }

            alert(initialValues?.id ? "Véhicule mis à jour avec succès." : "Véhicule créé avec succès.");
            onClose();
            reset();

        } catch (error) {
            console.error("Erreur lors de l’envoi du véhicule :", error);
            alert("Une erreur est survenue lors de l’enregistrement.");
        }
    };



    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-50">
                <div className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0 w-full md:w-[50vw] shadow-xl' : 'translate-x-full w-100' } bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out`}
                    aria-labelledby="drawer-right-label"  >
                    <h5 id="drawer-right-label"
                        className="inline-flex items-center mb-4 text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase" >
                        {initialValues?.id ? 'Modifier un véhicule' : 'Nouveau véhicule'}
                    </h5>

                    <Button type="button"  className="text-gray-400 bg-red-500 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose} >
                        <X className="w-3 h-3 text-white" aria-hidden="true" />
                        <span className="sr-only">Fermer</span>
                    </Button>

                    <div className="mt-4">
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4" noValidate  >
                            {/* Nom du véhicule */}
                            <div className="sm:col-span-2">
                                <Label>Nom personnalisé</Label>
                                <Input  className="w-full py-6" placeholder="Ex: Véhicule personnel de Jean" {...register("name")} />
                                {errors.name && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Marque */}
                            <div>
                                <Label>Marque</Label>
                                <Input className="w-full py-6"  placeholder="Ex: Toyota" {...register("brand")} />
                                {errors.brand && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.brand.message}
                                    </p>
                                )}
                            </div>

                            {/* Modèle */}
                            <div>
                                <Label>Modèle</Label>
                                <Input className="w-full py-6" placeholder="Ex: Corolla"  {...register("model")} />
                                {errors.model && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.model.message}
                                    </p>
                                )}
                            </div>

                            {/* Capacité */}
                            <div>
                                <Label>Capacité (nombre de passagers)</Label>
                                <Input className="w-full py-6" type="number" min="1" placeholder="4" {...register("capacity", { valueAsNumber: true })} />
                                {errors.capacity && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.capacity.message}
                                    </p>
                                )}
                            </div>

                            {/* Type de véhicule */}
                            <div>
                                <Label>Type de véhicule</Label>
                                <Controller name="type" control={control} render={({ field }) => (
                                        <Select  onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="py-6">
                                                <SelectValue placeholder="Sélectionner un type" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                {Object.values(VehicleType).map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.type && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.type.message}
                                    </p>
                                )}
                            </div>

                            {/* Carburant */}
                            <div>
                                <Label>Type de carburant</Label>
                                <Input className="w-full py-6"  placeholder="Ex: essence, diesel, électrique" {...register("fuel")} />
                                {errors.fuel && (
                                    <p className="text-sm text-red-600 mt-1"> {errors.fuel.message} </p>
                                )}
                            </div>

                            {/* Couleur */}
                            <div>
                                <Label>Couleur</Label>
                                <Input className="w-full py-6" placeholder="Ex: bleu" {...register("color")}  />
                                {errors.color && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.color.message}
                                    </p>
                                )}
                            </div>

                            {/* Numéro d'immatriculation */}
                            <div>
                                <Label>Numéro d'immatriculation (carte grise)</Label>
                                <Input className="w-full py-6" placeholder="Ex: 123456789XYZ" {...register("registration")} />
                                {errors.registration && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.registration.message}
                                    </p>
                                )}
                            </div>

                            {/* Plaque d'immatriculation */}
                            <div>
                                <Label>Plaque d'immatriculation</Label>
                                <Input className="w-full py-6"  placeholder="Ex: AB-123-CD" {...register("licensePlate")} />
                                {errors.licensePlate && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.licensePlate.message}
                                    </p>
                                )}
                            </div>

                            {/* Numéro de série */}
                            <div className="sm:col-span-2">
                                <Label>Numéro de série (châssis)</Label>
                                <Input className="w-full py-6" placeholder="Ex: VF1ABCDE123456789" {...register("serialNumber")} />
                                {errors.serialNumber && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.serialNumber.message}
                                    </p>
                                )}
                            </div>

                            {/* Image du véhicule */}
                            <div className="sm:col-span-2">
                                <Label>Image du véhicule (optionnel)</Label>
                                <FileUploader name="file" multiple={false} value={files} onValueChange={handleValueChange} onUpload={handleUpload} progresses={progresses} />
                                <p className="text-sm text-red-500">
                                    {typeof errors.file?.message === 'string' ? errors.file.message : ''}
                                </p>
                            </div>

                            {/* Bouton de soumission */}
                            <Button type="submit" className="sm:col-span-2 w-full mt-4 cursor-pointer" disabled={isSubmitting} >
                                {isSubmitting ? "Enregistrement..." : initialValues?.id ? "Modifier le véhicule" : "Créer le véhicule" }
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )

}
