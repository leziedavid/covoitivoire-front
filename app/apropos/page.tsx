'use client';

import Image from "next/image";
import Header from "@/components/home/header";

export default function Page() {
    return (
        <>
            <Header />
            <div className={`min-h-[calc(100vh_-_56px)] py-5`}>

                <section className="w-full">
                    {/* Image + Title overlay */}
                    <div className="relative w-full h-[300px] md:h-[400px]">
                        <Image src="/voiture.jpg" alt="À propos image" fill priority className="object-cover object-center" />
                        <div className="absolute inset-0 bg-black/30 flex items-end p-6 md:p-12">
                            <h2 className="text-white text-3xl md:text-5xl font-bold">À propos</h2>
                        </div>
                    </div>

                    {/* Text content */}
                    <div className="px-6 md:px-20 py-12 max-w-5xl mx-auto">
                        <h3 className="text-2xl md:text-4xl font-bold mb-6">
                            Nous repensons la façon dont le monde se déplace pour le mieux
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Le mouvement est au cœur de nos activités. C'est notre raison d'être.
                            C'est ce qui nous anime. C'est ce qui nous donne envie de nous lever chaque matin.
                            C'est cette idée qui nous pousse à réinventer constamment les déplacements. Pour vous.
                            Pour toutes les destinations qui vous attendent. Pour tout ce dont vous avez besoin.
                            Pour toutes les façons dont vous souhaitez générer des revenus. Partout dans le monde.
                            En temps réel. Au rythme de l'instant présent.
                        </p>
                    </div>
                    
                </section>

            </div>

        </>
    );
}
