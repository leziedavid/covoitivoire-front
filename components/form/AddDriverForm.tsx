"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUserId, getUserInfos } from "@/app/middleware";
import { VehicleRequest } from "@/types/ApiRequest/VehicleRequest";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterDriverSchema } from '@/schema/RegisterDriverSchema';
import { Role, RoleLabels } from '@/types/roles';
import { FileUploader } from '@/components/upload/FileUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { PhoneInput } from '@/components/phone/phone-input';
import { Mail, User, Lock, UserCheck, Globe, Phone, Camera, FileText, CreditCard, EyeOff, Eye, X } from "lucide-react"
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { toast } from 'sonner';
import { addDriverByPartner, signUp } from "@/api/services/auth";


const roles: Role[] = Object.values(Role);


type AddDriverFormProps = {
    initialValues?: Partial<VehicleRequest>;
    isOpen: boolean;
    onClose: () => void;
    fetchData: () => void;
};

export function AddDriverForm({ initialValues, isOpen, onClose, fetchData }: AddDriverFormProps) {


    const {register,handleSubmit,setValue,watch,formState: { errors },} = useForm<z.infer<typeof RegisterDriverSchema>>({
        resolver: zodResolver(RegisterDriverSchema),
        mode: 'onChange',
    });

    // Pour gérer la valeur du phone dans PhoneInput
    const [phoneValue, setPhoneValue] = useState('');
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [passwordGenerate, setPasswordGenerate] = useState('');


    // Pour gérer les fichiers
    const [files, setFiles] = useState<Record<string, File[]>>({});
    const [progresses, setProgresses] = useState<Record<string, Record<string, number>>>({});
        // Pour désactiver le select role si rôle en localStorage
    const [fixedRole, setFixedRole] = useState<Role | null>(Role.DRIVER);

    const generatePassword = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!&*';
        const length = 6;
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };
    
    useEffect(() => {
    const newPassword = generatePassword();
    setPasswordGenerate(newPassword);
    }, []);


        // Chargement initial du role depuis localStorage
        // useEffect(() => {

        //     if (typeof window !== 'undefined') {
        //         const storedRole = localStorage.getItem('role') as Role | null;
        //         if (storedRole && roles.includes(storedRole)) {
        //             setFixedRole(storedRole);
        //             setValue('role', storedRole, { shouldValidate: true, shouldDirty: true });
        //         }
        //     }

        //     const newPassword = generatePassword();
        //     setPasswordGenerate(newPassword);

        // }, [setValue]);
    
        // Synchroniser la valeur du téléphone dans react-hook-form à chaque changement valide
        useEffect(() => {
            setValue('phoneNumber', phoneValue, { shouldValidate: true });
        }, [phoneValue, setValue]);
    
        // Extraire et mettre à jour automatiquement le code pays (exemple: "+33")
        useEffect(() => {
            const countryCode = phoneValue.startsWith('+') ? phoneValue.split(' ')[0] : '';
            if (countryCode) {
                setValue('phoneCountryCode', countryCode, { shouldValidate: true });
            }
        }, [phoneValue, setValue]);
    
    
        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                setPhoneValue(e.target.value)
                setPhoneValid(true);
                if (!phoneTouched) setPhoneTouched(true)
        }


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
    
        const onSubmit = async (data: z.infer<typeof RegisterDriverSchema>) => {
            // Validation du téléphone avant soumission
            if (!phoneValid) {
                toast.error('Numéro de téléphone invalide');
                return;
            }
    
            try {
                // Destructurer pour enlever confirmPassword et préparer les données
                const formData = data;
                // Créer FormData pour gérer les fichiers
                const payload = new FormData();
    
                // Ajouter les données textuelles
                payload.append('email', formData.email);
                payload.append('name', formData.name);
                payload.append('phoneCountryCode', formData.phoneCountryCode ?? '');
                payload.append('phoneNumber', formData.phoneNumber ?? '');
                payload.append('password', passwordGenerate);
                payload.append('role', "DRIVER");
                payload.append('status', "INACTIVE");
    
                // Ajouter les fichiers
                if (formData.file && formData.file.length > 0) {
                    // Photo de profil (un seul fichier)
                    payload.append('file', formData.file[0]);
                }
    
                    if (formData.permis && formData.permis.length > 0) {
                        payload.append('carte', formData.permis[0]);
                    }
    
                    if (formData.carte && formData.carte.length > 0) {
                        payload.append('permis', formData.carte[0]);
                    }
        
                for (let [key, value] of payload.entries()) {
                    if (value instanceof File) {
                        console.log(`${key}: ${value.name} (${value.size} bytes)`);
                    } else {
                        console.log(`${key}: ${value}`);
                    }
                }
    
                // Appel API (remplacez par votre endpoint)
                // const response = await fetch('/api/registerade', {
                //     method: 'POST',
                //     body: payload, // Ne pas définir Content-Type, le navigateur le fera automatiquement
                // });
                // if (!response.ok) {
                //     toast.error('Erreur lors de l\'inscription. Veuillez réessayer.');
                //     throw new Error(`HTTP error! status: ${response.status}`);
                // }
                // const result = await response.json();
                // console.log('✅ Inscription réussie:', result);
                
                // signUp
                console.log('✅ Inscription en cours...', payload);
                const response = await addDriverByPartner(payload);
                console.log('✅ Inscription réussie:', response);
                
                if (response.statusCode === 201) {
                    toast.success('Inscription réussie');
                    fetchData();
                    // fermer le modal de login
                    onClose();

                } else {
                    toast.error( response.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');

                }
    

            } catch (error) {
                console.error('❌ Erreur lors de l\'inscription:', error);
                toast.error('Erreur lors de l\'inscription. Veuillez réessayer.');
            }
        };
    
    
        // Récupérer la valeur du role dans le form (pour afficher les fichiers conditionnels)
    //     const selectedRole = watch('role');
    //     // Roles qui doivent afficher permis + cni
    //     const showDocuments = ['DRIVER', 'PARTNER', 'LIVREUR'];

    // useEffect(() => {
    //     if (!fixedRole) {
    //         setValue('role', Role.DRIVER, { shouldValidate: true, shouldDirty: true });
    //     }
    // }, [fixedRole, setValue]);



    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-50">
                <div className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0 w-full md:w-[50vw] shadow-xl' : 'translate-x-full w-100'} bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out`}
                    aria-labelledby="drawer-right-label"  >
                    <h5 id="drawer-right-label"
                        className="inline-flex items-center mb-4 text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase" >
                        {initialValues?.id ? 'Modifier un véhicule' : 'Nouveau véhicule'}
                    </h5>

                    <Button type="button" className="text-gray-400 bg-red-500 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose} >
                        <X className="w-3 h-3 text-white" aria-hidden="true" />
                        <span className="sr-only">Fermer</span>
                    </Button>

                    <div className="mt-4">

                        <form onSubmit={handleSubmit(onSubmit)}   className="mt-8 mb-2 w-full max-w-screen-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                <div>
                                    <Label htmlFor="email mb-2">Email</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input id="email" type="email"  {...register('email')} className="w-full py-2 pl-12 pr-4 text-base rounded-md border-1 outline-none focus:border-orange-600 focus:ring-0 bg-white"
                                        />
                                    </div>
                                    {errors.email?.message && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="name">Nom complet</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input id="name" type="text" {...register('name')} className="w-full py-2 pl-12 pr-4 text-base rounded-md border-1 outline-none focus:border-orange-600 focus:ring-0 bg-white" />
                                    </div>
                                    {errors.name?.message && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="phoneCountryCode">Code pays</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Globe className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input id="phoneCountryCode" type="text" {...register('phoneCountryCode')} disabled className="bg-gray-100 cursor-not-allowed pl-10  py-5 block w-full rounded-sm borderbg-white focus:border-black-900 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-orange-600" />
                                    </div>
                                    {errors.phoneCountryCode?.message && (
                                        <p className="text-sm text-red-500">{errors.phoneCountryCode.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="block mb-2">Numéro de téléphone</Label>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <PhoneInput value={phoneValue} onChange={handlePhoneChange} placeholder="Numéro de téléphone"
                                            className="pl-10 focus:border-orange-600" />
                                    </div>

                                    {phoneTouched && !phoneValid && (
                                        <p className="text-red-500 text-sm mt-1">Numéro invalide</p>
                                    )}

                                    {errors.phoneNumber?.message && (
                                        <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                                    )}

                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Camera className="h-5 w-5 text-gray-600" />
                                        <h3 className="font-semibold">Photo de profil</h3>
                                    </div>
                                    <FileUploader
                                        name="file"
                                        multiple={false}
                                        value={files}
                                        onValueChange={handleValueChange}
                                        onUpload={handleUpload}
                                        progresses={progresses}
                                    />
                                    <p className="text-sm text-red-500">
                                        {typeof errors.file?.message === 'string' ? errors.file.message : ''}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CreditCard className="h-5 w-5 text-gray-600" />
                                        <h3 className="font-semibold">Permis de conduire</h3>
                                    </div>
                                    <FileUploader
                                        name="permis"
                                        multiple={false}
                                        value={files}
                                        onValueChange={handleValueChange}
                                        onUpload={handleUpload}
                                        progresses={progresses}
                                    />
                                    {typeof errors.permis?.message === 'string' && (
                                        <p className="text-sm text-red-500">{errors.permis.message}</p>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText className="h-5 w-5 text-gray-600" />
                                        <h3 className="font-semibold">Pièce d'identité (CNI)</h3>
                                    </div>
                                    <FileUploader
                                        name="carte"
                                        multiple={false}
                                        value={files}
                                        onValueChange={handleValueChange}
                                        onUpload={handleUpload}
                                        progresses={progresses}
                                    />
                                    {typeof errors.carte?.message === 'string' && (
                                        <p className="text-sm text-red-500">{errors.carte.message}</p>
                                    )}
                                </div>

                            </div>
                            <Button className="mt-6 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  type="submit">Créer un compte</Button>
                            {/* <button type="submit" className="mt-6 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >
                                Sign Up
                            </button> */}
                        </form>

                    </div>
                </div>
            </div>

        </>
    )

}
