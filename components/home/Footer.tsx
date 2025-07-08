"use client";

import Image from "next/image";

export function Footer() {
    return (
        <section className="bg-gray-100 text-black py-16">
            <div className="container mx-auto max-w-[70.5rem] px-4">
                <h3 className="text-5xl font-semibold mb-12">C'est plus simple dans les applications</h3>
                <div className="flex flex-col gap-6 md:flex-row md:gap-6">
                    <a
                        data-aos="fade-right"
                        href="#"
                        className="flex items-center gap-4 p-6 bg-white border border-black/20 rounded shadow hover:shadow-md transition-shadow duration-300 flex-1"
                    >
                        <span className="bg-black text-white font-semibold text-4xl px-4 py-2 rounded">Covoit'Ivoire</span>
                        <p className="text-lg font-bold">Téléchargez l'application pour les chauffeurs et les coursiers</p>
                    </a>
                    <a
                        data-aos="fade-left"
                        href="#"
                        className="flex items-center gap-4 p-6 bg-white border border-black/20 rounded shadow hover:shadow-md transition-shadow duration-300 flex-1"
                    >
                        <span className="bg-black text-white font-semibold text-4xl px-4 py-2 rounded">Covoit'Ivoire</span>
                        <p className="text-lg font-bold">Téléchargez l'application Covoit'Ivoire</p>
                    </a>
                </div>
            </div>
        </section>
    );
}
