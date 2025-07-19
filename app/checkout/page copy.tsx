"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Header from "@/components/home/header";
import { useCart } from "../context/CartProvider";
import { OrderPayload } from "@/types/ApiRequest/OrderPayloadRequest";
import { submitOrder } from "@/api/services/authService";
import { getUserInfos } from "@/api/services/auth";
import { User } from "@/types/ApiReponse/UsersResponse";

// Types
interface ProductItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface PaymentMethod {
    id: string;
    label: string;
    description?: string;
    fee?: string;
    enabled: boolean;
}

interface DeliveryMethod {
    id: string;
    label: string;
    subLabel: string;
    price: number;
}

const paymentMethods: PaymentMethod[] = [
    {
        id: "cod",
        label: "Paiement à la livraison",
        fee: "+15 $ de frais de traitement",
        enabled: true,
    },
    {
        id: "credit",
        label: "Carte de crédit",
        description: "Payez avec votre carte de crédit",
        enabled: false,
    },
    {
        id: "paypal",
        label: "Compte PayPal",
        description: "Connectez-vous à votre compte",
        enabled: false, // Par exemple, désactivé pour l’instant
    },
];


const deliveryMethods: DeliveryMethod[] = [
    {
        id: "home_delivery",
        label: "Livraison à domicile (à vos frais)",
        subLabel: "Recevez-le dès demain à votre adresse",
        price: 15,
    },
    {
        id: "store_pickup",
        label: "Retrait en magasin – Gratuit",
        subLabel: "Disponible sous 1 semaine en boutique",
        price: 0,
    },
];

const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    country: z.string(),
    city: z.string().min(2),
    phone: z.string().min(6),
    company: z.string().optional(),
    vat: z.string().optional(),
});

export default function Page() {

    const { items: cartItems, updateCart, removeFromCart, countTotalPrice, clearCart, } = useCart();

    const router = useRouter();
    const [selectedPayment, setSelectedPayment] = useState<string>("cod");
    const [selectedDelivery, setSelectedDelivery] = useState<string>("home_delivery");
    const [promoCode, setPromoCode] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);

    const products: ProductItem[] = [
        { id: "1", name: "Product 1", price: 4000, quantity: 1 },
        { id: "2", name: "Product 2", price: 4094, quantity: 1 },
    ];

    const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const storePickup = 99;
    const tax = 199;
    const total = subtotal + storePickup + tax;


    // getUserInfos

    const fetchUserInfos = async () => {
        try {
            const res = await getUserInfos();
            if (res.data) {
                setUser(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchUserInfos();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            country: "United States",
            city: "",
            phone: "",
            company: "",
            vat: "",
        },
    });

    // const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //     try {
    //         const response = await fetch("/api/checkout", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 deliveryDetails: values,
    //                 paymentMethod: selectedPayment,
    //                 deliveryMethod: selectedDelivery,
    //                 promoCode,
    //                 products,
    //                 total,
    //             }),
    //         });

    //         if (response.ok) {
    //             router.push("/checkout/success");
    //         } else {
    //             alert("Erreur lors de l'envoi de la commande.");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         alert("Une erreur est survenue.");
    //     }
    // };


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const orderItems = cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.count,
            price: item.product.price,
        }));

        const payload: OrderPayload = {
            deliveryDetails: values,
            paymentMethod: selectedPayment as OrderPayload["paymentMethod"],
            deliveryMethod: selectedDelivery as OrderPayload["deliveryMethod"],
            promoCode,
            items: orderItems,
            amount: Number(countTotalPrice()),
        };

        try {
            await submitOrder(payload);
            clearCart();
            router.push("/checkout/success");

        } catch (error) {
            alert("Une erreur est survenue lors de la commande.");
        }

    };

    return (

        <>
            <Header />

            <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-xl font-bold mb-4">Détails de livraison</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input {...form.register("name")} placeholder="Nom complet" />
                                <Input {...form.register("email")} placeholder="Adresse e-mail" />
                                <Select value={form.watch("country")} onValueChange={(val) => form.setValue("country", val)}>
                                    <SelectTrigger><SelectValue placeholder="Pays" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="United States">États-Unis</SelectItem>
                                        <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input {...form.register("city")} placeholder="Ville" />
                                <Input {...form.register("phone")} placeholder="Numéro de téléphone" />
                                <Input {...form.register("company")} placeholder="Nom de l’entreprise" />
                                <Input {...form.register("vat")} placeholder="Numéro de TVA" />
                            </div>
                        </div>


                        <div>
                            <h2 className="text-xl font-bold mb-4">Paiement</h2>
                            <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="grid gap-4">
                                {paymentMethods.map((method) => (
                                    <Card
                                        key={method.id}
                                        className={`p-4 ${!method.enabled ? 'opacity-50 pointer-events-none' : ''}`}
                                    >
                                        <RadioGroupItem
                                            value={method.id}
                                            id={method.id}
                                            disabled={!method.enabled}
                                        />
                                        <Label htmlFor={method.id} className="ml-2 font-medium">
                                            {method.label}
                                        </Label>
                                        {method.description && (
                                            <p className="text-sm text-gray-500 ml-6">{method.description}</p>
                                        )}
                                        {method.fee && (
                                            <p className="text-sm text-gray-500 ml-6">{method.fee}</p>
                                        )}
                                    </Card>
                                ))}
                            </RadioGroup>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-4">Méthodes de livraison</h2>
                            <RadioGroup value={selectedDelivery} onValueChange={setSelectedDelivery} className="grid gap-4">
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
                            <Input placeholder="Enter a gift card, voucher or promotional code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                            <Button type="button">Apply</Button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                        <h2 className="text-lg font-semibold">Résumé de la commande</h2>
                        {cartItems.map((item) => (
                            <div key={item.product.id} className="flex justify-between">
                                <span>{item.product.name} x {item.count}</span>
                                <span>{(item.count * item.product.price).toFixed(2)} Fcfa</span>
                            </div>
                        ))}
                        <div className="flex justify-between"><span>Sous-total</span><span> {countTotalPrice()} Fcfa</span></div>
                        {/* <div className="flex justify-between"><span>Tax</span><span>${tax}</span></div> */}
                        <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span> {countTotalPrice()} Fcfa</span></div>
                        <Button className="w-full" type="submit">Procéder au paiement</Button>
                        <p className="text-sm text-center text-gray-600">
                            Un ou plusieurs articles dans votre panier nécessitent un compte.
                            <br />
                            <a href="/login" className="text-blue-600 underline">Connectez-vous ou créez un compte maintenant.</a>
                        </p>
                    </div>

                </form>
            </div>

        </>
    );
}
function useEffect(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}

