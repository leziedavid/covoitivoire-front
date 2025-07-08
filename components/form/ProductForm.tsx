import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { X, Plus } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { ProductRequest, VariantType } from '@/types/ApiRequest/ProductRequest';
import { FileUploader } from '../upload/FileUploader';

type ProductFormProps = {
    initialValues?: Partial<ProductRequest>;
    isOpen: boolean;
    onClose: () => void;
    categories: { id: string; name: string }[];
    variants: { type: VariantType; options: { id: string; label: string }[] }[];
};

export function ProductForm({ initialValues, isOpen,onClose, categories, variants, }: ProductFormProps) {
    const { register, handleSubmit, control, setValue, watch, formState: { isSubmitting } } = useForm<ProductRequest>({
        defaultValues: initialValues as any,
    });
    
    const [files, setFiles] = useState<Record<string, File[]>>({});
    const [progresses, setProgresses] = useState<Record<string, Record<string, number>>>({});

    const selectedVariantType = watch('variantType');
    const selectedVariantIds = watch('variantIds') || [];

    const variantOptions = useMemo(() => {

        if (!selectedVariantType) return [];
        const group = variants.find(v => v.type === selectedVariantType);
        return group ? group.options : [];
    }, [selectedVariantType, variants]);

    const addVariant = (id: string) => {
        if (!selectedVariantIds.includes(id))
            setValue('variantIds', [...selectedVariantIds, id]);
    };
    const removeVariant = (id: string) => {
        setValue('variantIds', selectedVariantIds.filter(v => v !== id));
    };

    const onSubmit = (data: ProductRequest) => {
        console.log('submit', data);
        onClose();
    };

    // Gestion FileUploader
    const handleValueChange = (name: string, fileList: File[]) => {
        setFiles((prev) => ({ ...prev, [name]: fileList }));
        setValue(name as any, fileList, { shouldValidate: true });
    };

    /**
     * Simule l'upload de fichiers et met à jour la progression
     */
    const handleUpload = async (name: string, fileList: File[]) => {
        const progressMap: Record<string, number> = {};

        for (const file of fileList) {
            progressMap[file.name] = 0;

            setProgresses((prev) => ({
                ...prev,
                [name]: {
                    ...(prev[name] || {}),
                    ...progressMap,
                },
            }));

            // Simule une attente d'upload
            await new Promise((res) => setTimeout(res, 300));

            progressMap[file.name] = 100;

            setProgresses((prev) => ({
                ...prev,
                [name]: {
                    ...(prev[name] || {}),
                    ...progressMap,
                },
            }));
        }
    };


    return isOpen ? (
        <div className="fixed inset-0 bg-black/50 z-50">
            <div
                id="drawer-right-example"
                className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transform ${isOpen ? 'translate-x-0 w-full md:w-[50vw] shadow-xl' : 'translate-x-full w-0'} bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out`}
                aria-labelledby="drawer-right-label" >
                <h5 id="drawer-right-label" className="inline-flex items-center mb-4 text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase" >
                    {initialValues?.id ? 'Modifier un produit' : 'Nouveau produit'}
                </h5>

                <Button
                    type="button"
                    className="text-gray-400 bg-red-500 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={onClose}
                >
                    <X className="w-3 h-3 text-white" aria-hidden="true" />
                    <span className="sr-only">Fermer</span>
                </Button>

                <div className="mt-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        noValidate
                    >
                        {/* Name */}
                        <div className="sm:col-span-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input id="name" {...register('name', { required: true })} />
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" {...register('description')} />
                        </div>

                        {/* Price */}
                        <div>
                            <Label htmlFor="price">Prix</Label>
                            <Input
                                type="number"
                                step="0.01"
                                id="price"
                                {...register('price', { valueAsNumber: true })}
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                type="number"
                                id="stock"
                                {...register('stock', { valueAsNumber: true })}
                            />
                        </div>

                        {/* SKU */}
                        <div className="sm:col-span-2">
                            <Label htmlFor="sku">SKU</Label>
                            <Input id="sku" {...register('sku')} />
                        </div>

                        {/* Category */}
                        <div className="sm:col-span-2 w-full">
                            <Label>Catégorie</Label>
                            <Controller  control={control}  name="categoryId" rules={{ required: true }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sélectionnez une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        {/* Variants */}
                        <div  className="sm:col-span-2 w-full">
                            <Label>Type de variante</Label>
                            <Controller  control={control} name="variantType"
                                render={({ field }) => (
                                    <Select onValueChange={val => { field.onChange(val as VariantType); setValue('variantIds', []); }} value={field.value || ''} >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Choisir un type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(VariantType).map(vt => (
                                                <SelectItem key={vt} value={vt}>
                                                    {vt}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        {variantOptions.length > 0 && (
                            <div className="sm:col-span-2">
                                <Label>Options</Label>
                                <div className="flex flex-wrap gap-2">
                                    {variantOptions.map(opt => (
                                        <Button  key={opt.id} variant={selectedVariantIds.includes(opt.id) ? 'secondary' : 'outline'}
                                            size="sm" onClick={e => {  e.preventDefault();  addVariant(opt.id); }} >
                                            <Plus size={16} />
                                            {opt.label}
                                        </Button>
                                    ))}
                                </div>
                                {selectedVariantIds.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedVariantIds.map(id => {
                                            const opt = variantOptions.find(o => o.id === id);
                                            return (
                                                <span key={id}  className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full" >
                                                    {opt?.label || id}
                                                    <X className="ml-1 cursor-pointer" onClick={() => removeVariant(id)} />
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* FileUploader */}
                        <div className="sm:col-span-2">
                            <Label>Image(s)</Label>
                            <FileUploader
                                name="imageFile"
                                multiple={false}
                                value={{ imageFile: files['imageFile'] || [] }}
                                onValueChange={(name, f) => handleValueChange(name, f)}
                                onUpload={(name, f) => handleUpload(name, f)}
                                progresses={{ imageFile: progresses['imageFile'] }}
                            />
                        </div>


                        <div className="sm:col-span-2">
                            <Label>Image(s)</Label>
                            <FileUploader
                                name="files"
                                multiple={true}
                                value={{ files: files['files'] || [] }}
                                onValueChange={(name, f) => handleValueChange(name, f)}
                                onUpload={(name, f) => handleUpload(name, f)}
                                progresses={{ files: progresses['files'] || {} }}
                            />
                        </div>

                        <Button type="submit"
                            className="sm:col-span-2 w-full mt-4"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    ) : null;


}
