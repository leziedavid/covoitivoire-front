"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Header() {
    const [navOpen, setNavOpen] = useState(false);
    const toggleNav = () => setNavOpen(!navOpen);

    return (
        <header className="bg-black text-white">
            <div className="container mx-auto max-w-7xl px-4">
                <nav className="flex justify-between items-center py-6">
                    <div className="flex items-center space-x-6">
                        <a href="#" className="text-2xl font-semibold">
                        <Image src="/logoHome.png" alt="logoHome" width={130} height={130} className="rounded-full object-cover" />
                        </a>
                        <ul className={`hidden md:flex space-x-6 ${navOpen ? "block" : ""}`}>
                            <li><a href="#" className="font-medium px-4 py-3 rounded-full hover:bg-gray-800 transition">Company</a></li>
                            <li><a href="#" className="font-medium px-4 py-3 rounded-full hover:bg-gray-800 transition">Safety</a></li>
                            <li><a href="#" className="font-medium px-4 py-3 rounded-full hover:bg-gray-800 transition">Help</a></li>
                        </ul>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <ul className="flex space-x-6 items-center">
                            <li><a href="#" className="font-medium">FR-FR</a></li>
                            <li><a href="#" className="font-medium">Products</a></li>
                            <li><a href="#" className="font-medium">Log in</a></li>
                            <li><a href="#" className="bg-white text-black rounded-full px-4 py-3 font-medium hover:bg-gray-200 transition">Sign up</a></li>
                        </ul>
                    </div>

                    <button
                        onClick={toggleNav}
                        aria-label="Toggle menu"
                        className="md:hidden flex flex-col space-y-1.5 cursor-pointer"
                    >
                        {navOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                    </button>
                </nav>

                <div className={`md:hidden fixed left-0 top-[70px] w-full bg-black text-white flex flex-col items-center space-y-6 py-6 transition-transform duration-300 ease-in-out ${navOpen ? "translate-y-0" : "-translate-y-full"}`}>
                    <a href="#" className="block text-lg font-medium">Company</a>
                    <a href="#" className="block text-lg font-medium">Safety</a>
                    <a href="#" className="block text-lg font-medium">Help</a>
                    <a href="#" className="block text-lg font-medium">FR-FR</a>
                    <a href="#" className="block text-lg font-medium">Products</a>
                    <a href="#" className="block text-lg font-medium">Log in</a>
                    <a href="#" className="block bg-white text-black rounded-full px-6 py-3 font-medium">Sign up</a>
                </div>
            </div>
        </header>
    );
}
