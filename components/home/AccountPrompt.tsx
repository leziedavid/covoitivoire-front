'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function AccountPrompt() {
    const router = useRouter();

    const Login = async () => {
        router.push('/auth/login')
    }

    return (
        <section className="w-full flex flex-col-reverse lg:flex-row items-center justify-between p-8 md:p-16">
            
            <div className="max-w-xl lg:text-left">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Connectez-vous pour consulter les détails de votre compte
                </h1>
                
                <p className="text-muted-foreground text-lg mb-6">
                    Consultez les trajets passés, les suggestions personnalisées,
                    les ressources d'aide et plus encore.
                </p>


                <ul className="mt-4 space-y-3 text-gray-700 mb-4">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>
                            Choisissez votre trajet, le nombre de places que vous souhaitez
                            réserver et confirmez votre participation.
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>
                            Partagez le lien du trajet avec vos amis pour covoiturer ensemble
                            et réduire les frais.
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Paiement et confirmation instantanés.</span>
                    </li>
                </ul>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Button  className="text-base px-6 py-3" onClick={() => router.push('/auth/login')}>
                        Connectez-vous à votre compte
                    </Button>
                    <Button variant="link" className="text-base" onClick={() => router.push('/auth/signup')}>
                        Créez un compte
                    </Button>
                </div>
            </div>

            <div className="max-w-xl">
                <Image
                        src="/inside-car.jpg"
                        alt="Illustration de conducteurs"
                        width={800}
                        height={600}
                        className="object-contain "
                    />
            </div>

            {/* <Card className="mb-8 lg:mb-0 bg-muted w-full max-w-md shadow-none border-none">
                <CardContent className="p-0 flex justify-center items-center">
                    <Image
                        src="/inside-car.jpg"
                        alt="Illustration de conducteurs"
                        width={400}
                        height={300}
                        className="object-contain"
                    />
                </CardContent>
            </Card> */}
        </section>
    );
}
