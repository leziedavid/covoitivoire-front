"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Header from "@/components/home/header";
import { useCart } from "../context/CartProvider";
import { submitOrder } from "@/api/services/authService";
import { getUserInfos } from "@/api/services/auth";
import { User } from "@/types/ApiReponse/UsersResponse";
import { orderCheckoutSchema } from "@/schema/checkoutFormSchema";
import { z } from "zod";
import { DeliveryMethod, PaymentMethod } from "@/types/AllTypes";
import { toast } from "sonner";


type OrderCheckoutInput = z.infer<typeof orderCheckoutSchema>;

interface PaymentMethodChoice {
    id: PaymentMethod;
    label: string;
    description?: string;
    fee?: string;
    enabled: boolean;
}

interface DeliveryMethodChoice {
    id: DeliveryMethod;
    label: string;
    subLabel: string;
    price: number;
}

const paymentMethods: PaymentMethodChoice[] = [
    {
        id: PaymentMethod.ON_ARRIVAL,
        label: "Paiement à la livraison",
        fee: "+15 $ de frais de traitement",
        enabled: true,
    },
    {
        id: PaymentMethod.CARD,
        label: "Carte de crédit",
        description: "Payez avec votre carte de crédit",
        enabled: false,
    },
    {
        id: PaymentMethod.BANK_TRANSFER,
        label: "Compte PayPal",
        description: "Connectez-vous à votre compte",
        enabled: false,
    },
    // Ajoute d'autres méthodes si nécessaire
];

const deliveryMethods: DeliveryMethodChoice[] = [
    {
        id: DeliveryMethod.HOME_DELIVERY,
        label: "Livraison à domicile (à vos frais)",
        subLabel: "Recevez-le dès demain à votre adresse",
        price: 15,
    },
    {
        id: DeliveryMethod.STORE_PICKUP,
        label: "Retrait en magasin – Gratuit",
        subLabel: "Disponible sous 1 semaine en boutique",
        price: 0,
    },
];

export default function Page() {
    const router = useRouter();
    const { items: cartItems, clearCart, countTotalPrice } = useCart();

    const form = useForm<OrderCheckoutInput>({
        resolver: zodResolver(orderCheckoutSchema),
        defaultValues: {
            deliveryDetails: {
                name: "",
                email: "",
                phone: "",
                company: "",
            },
            paymentMethod: PaymentMethod.ON_ARRIVAL,
            deliveryMethod: DeliveryMethod.HOME_DELIVERY,
            promoCode: "",
            items: [],
            amount: 0,
        },
    });

    // Charge les infos utilisateur dans le formulaire au chargement
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await getUserInfos();
                if (res.data) {
                    form.reset({
                        ...form.getValues(),
                        deliveryDetails: {
                            name: res.data.name ?? "",
                            email: res.data.email ?? "",
                            phone: res.data.phoneNumber ?? "",
                            company: "",
                        },
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }
        fetchUser();
    }, [form]);

    // Met à jour items et amount à chaque changement dans le panier
    useEffect(() => {
        form.setValue(
            "items",
            cartItems.map((item) => ({
                productId: item.product.id,
                quantity: item.count,
                price: item.product.price,
            }))
        );

        form.setValue("amount", Number(countTotalPrice()));
    }, [cartItems, countTotalPrice, form]);

    // Handlers pour mettre à jour paymentMethod, deliveryMethod, promoCode dans le formulaire
    function handlePaymentChange(val: string) {
        form.setValue("paymentMethod", val as PaymentMethod, { shouldValidate: true });
    }
    function handleDeliveryChange(val: string) {
        form.setValue("deliveryMethod", val as DeliveryMethod, { shouldValidate: true });
    }
    function handlePromoChange(val: string) {
        form.setValue("promoCode", val, { shouldValidate: true });
    }

    // Soumission du formulaire
    async function onSubmit(data: OrderCheckoutInput) {
        try {
            // mais on peut le garder par sécurité.
            const payload = {
                ...data,
                paymentMethod: data.paymentMethod,
                deliveryMethod: data.deliveryMethod,
                promoCode: data.promoCode ?? undefined, // Ensure promoCode is never null
            };

            const res = await submitOrder(payload);
            if (res.statusCode === 200) {

                toast.success("Commande créée avec succès");
                clearCart();
                // Redirection avec l'orderNumber
                router.push(`/checkout/success?ordersNumber=${res.data.ordersNumber}`);
            } else {
                alert("Une erreur est survenue lors de la commande.");
            }


        } catch (e) {
            // alert("Une erreur est survenue lors de la commande.");
        }
    }

    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]">
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-xl font-bold mb-4">Détails de livraison</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input {...form.register("deliveryDetails.name")} placeholder="Nom complet" disabled={true} />
                                <Input {...form.register("deliveryDetails.email")} placeholder="Adresse e-mail" disabled={true} />
                                <Input {...form.register("deliveryDetails.phone")} placeholder="Numéro de téléphone" disabled={true}  />
                                <Input {...form.register("deliveryDetails.company")} placeholder="Nom de l’entreprise"disabled={true}  />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-4">Paiement</h2>
                            <RadioGroup value={form.watch("paymentMethod")} onValueChange={handlePaymentChange} className="grid gap-4">
                                {paymentMethods.map((method) => (
                                    <Card key={method.id} className={`p-4 ${!method.enabled ? "opacity-50 pointer-events-none" : ""}`}>
                                        <RadioGroupItem value={method.id} id={method.id} disabled={!method.enabled} />
                                        <Label htmlFor={method.id} className="ml-2 font-medium">
                                            {method.label}
                                        </Label>
                                        {method.description && <p className="text-sm text-gray-500 ml-6">{method.description}</p>}
                                        {method.fee && <p className="text-sm text-gray-500 ml-6">{method.fee}</p>}
                                    </Card>
                                ))}
                            </RadioGroup>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-4">Méthodes de livraison</h2>
                            <RadioGroup value={form.watch("deliveryMethod")} onValueChange={handleDeliveryChange} className="grid gap-4">
                                {deliveryMethods.map((method) => (
                                    <Card key={method.id} className="p-4">
                                        <RadioGroupItem value={method.id} id={method.id} />
                                        <Label htmlFor={method.id} className="ml-2 font-medium">
                                            {method.label}
                                        </Label>
                                        <p className="text-sm text-gray-500 ml-6">{method.subLabel}</p>
                                    </Card>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="flex gap-4 items-center">
                            <Input
                                placeholder="Enter a gift card, voucher or promotional code"
                                value={form.watch("promoCode") ?? ""}
                                onChange={(e) => handlePromoChange(e.target.value)}
                            />
                            <Button type="button" onClick={() => alert("Fonctionnalité à implémenter")}>
                                Appliquer
                            </Button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                        <h2 className="text-lg font-semibold">Résumé de la commande</h2>
                        {cartItems.map((item) => (
                            <div key={item.product.id} className="flex justify-between">
                                <span>
                                    {item.product.name} x {item.count}
                                </span>
                                <span>{(item.count * item.product.price).toFixed(2)} Fcfa</span>
                            </div>
                        ))}
                        <div className="flex justify-between">
                            <span>Sous-total</span>
                            <span>{countTotalPrice()} Fcfa</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                            <span>Total</span>
                            <span>{countTotalPrice()} Fcfa</span>
                        </div>
                        <Button className="w-full" type="submit">
                            Procéder au paiement
                        </Button>
                        <p className="text-sm text-center text-gray-600">
                            Un ou plusieurs articles dans votre panier nécessitent un compte.
                            <br />
                            <a href="/login" className="text-blue-600 underline">
                                Connectez-vous ou créez un compte maintenant.
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
