"use client";

import { Button } from "@/components/ui/button";

export function BusinessHeader() {
    return (
        <section
            id="business-header"
            className="py-16 bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://www.uber-assets.com/image/upload/v1613106985/assets/0e/47aa71-35cb-459a-a975-78c61ea300e2/original/HP-U4B-NYC-bkg.png')",
            }}
        >
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex flex-col items-start gap-6 max-w-xl">
                    <h3 className="text-4xl font-semibold">Uber for Business</h3>
                    <p className="text-lg font-normal pb-4">
                        Changez la façon dont vos collaborateurs se déplacent et se restaurent.
                    </p>
                    <Button asChild className="rounded-xl bg-black text-white px-6 py-4 font-semibold hover:opacity-80">
                        <a href="#">Découvrez comment</a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
