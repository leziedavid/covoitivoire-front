"use client";

import Image from "next/image";

export function SuggestionsSection() {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto max-w-[70.5rem] px-4">
                <h3 className="text-3xl font-bold mb-12">Suggestions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bloc Course */}
                    <div className="bg-gray-100 rounded-2xl p-3 flex flex-col justify-between">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Course</h4>
                            <p className="text-sm text-gray-700 mb-6">
                                Allez où vous voulez avec Covoit'Ivoire. Commandez une course en un clic et c&apos;est parti !
                            </p>
                        </div>
                        <div className="flex items-end justify-between mt-auto">
                            <button className="bg-white text-black font-semibold py-2 px-5 rounded-full shadow hover:shadow-md transition">
                                Détails
                            </button>
                            <Image src="/ride.png" alt="Course" width={100} height={100} className="object-contain" />
                        </div>
                    </div>

                    {/* Bloc Réserver */}
                    <div className="bg-gray-100 rounded-2xl p-3 flex flex-col justify-between">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Réserver</h4>
                            <p className="text-sm text-gray-700 mb-6">
                                Réservez votre course à l&apos;avance pour pouvoir vous détendre le jour même.
                            </p>
                        </div>
                        <div className="flex items-end justify-between mt-auto">
                            <button className="bg-white text-black font-semibold py-2 px-5 rounded-full shadow hover:shadow-md transition">
                                Détails
                            </button>
                            <Image src="/reserve_clock.png" alt="Réserver" width={100} height={100} className="object-contain" />
                        </div>
                    </div>

                    {/* Bloc Courier */}
                    <div className="bg-gray-100 rounded-2xl p-3 flex flex-col justify-between">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Courier</h4>
                            <p className="text-sm text-gray-700 mb-6">
                                Avec Covoit'Ivoire, la livraison d’articles le jour même est un jeu d’enfant.
                            </p>
                        </div>
                        <div className="flex items-end justify-between mt-auto">
                            <button className="bg-white text-black font-semibold py-2 px-5 rounded-full shadow hover:shadow-md transition">
                                Détails
                            </button>
                            <Image src="/Courier.png" alt="Courier" width={100} height={100} className="object-contain"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
