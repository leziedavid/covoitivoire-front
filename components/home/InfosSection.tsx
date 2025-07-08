"use client";

import Image from "next/image";
import { Button } from "../ui/button";

export function InfosSection() {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto max-w-[70.5rem] px-4 flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Texte à gauche */}
                <div className="max-w-xl">
                    <h2 className="text-4xl font-bold mb-6">
                        Connectez-vous pour consulter votre activité récente
                    </h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Consultez les trajets passés, les suggestions personnalisées, les
                        ressources d&apos;aide et plus encore.
                    </p>
                    <div className="flex flex-col gap-4">
                        <Button className="bg-black text-white text-lg font-semibold px-6 py-6 rounded hover:opacity-90 transition">
                            Connectez-vous à votre compte
                        </Button>
                        <p className="text-gray-700 text-sm">
                            Vous n&apos;avez pas de compte Uber ?{" "}
                            <a
                                href="#"
                                className="underline hover:text-black transition-colors"
                            >
                                Inscription
                            </a>
                        </p>
                    </div>
                </div>

                {/* Image à droite */}
                <div className="flex-1 w-full max-w-2xl">
                    <Image
                        src="/7178884.jpg"
                        alt="Illustration activité récente"
                        width={800}
                        height={500}
                        className="w-full h-auto rounded object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
