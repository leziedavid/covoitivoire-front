'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    CarFront,
    PanelLeftOpen,
    PanelLeftClose,
    Home,
    MapPinned,
    Server,
    ShoppingCart,
    Users2,
    Store,
    LogOut,
    ShieldCheck,
    LifeBuoy,
    Settings,
    BadgeDollarSign,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function MobileBottomNav1() {
    const [open, setOpen] = useState(false);

    const navItems = [
        { href: '/dashboard/compte', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
        { href: '/dashboard/commandes', label: 'Mes commandes', icon: <ShoppingCart className="h-5 w-5" /> },
        { href: '/dashboard/trajets', label: 'Trajets', icon: <MapPinned className="h-5 w-5" /> },
        { href: '/dashboard/listes-vehicles', label: 'Ma flotte', icon: <CarFront className="h-5 w-5" /> },
        { href: '/dashboard/transaction', label: 'Transactions', icon: <Users2 className="h-5 w-5" /> },
        { href: '/dashboard/services', label: 'Services', icon: <Server className="h-5 w-5" /> },
        { href: '/dashboard/liste-users', label: 'Liste des utilisateurs', icon: <Users2 className="h-5 w-5" /> },
        { href: '/dashboard/boutiques', label: 'Boutiques', icon: <Store className="h-5 w-5" />, badge: 'Nouveau!' },
    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* ✅ Ton trigger d'origine */}
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="fixed bottom-4 left-4 z-50 sm:hidden">
                    {open ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
                </Button>
            </SheetTrigger>

            <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-2xl px-6 py-4 sm:hidden" >
                {/* Drag bar */}
                <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

                {/* Modes de paiement */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-sm font-semibold">Modes de paiement</div>
                        <div className="text-xs text-muted-foreground">Espèces</div>
                    </div>
                    <BadgeDollarSign className="h-6 w-6 text-green-600" />
                </div>

                {/* Options: Sécurité / Assistance / Paramètres */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center justify-center text-center text-xs text-muted-foreground">
                        <div className="bg-gray-100 rounded-full p-2">
                            <ShieldCheck className="h-5 w-5 text-black" />
                        </div>
                        Sécurité
                    </div>
                    <div className="flex flex-col items-center justify-center text-center text-xs text-muted-foreground">
                        <div className="bg-gray-100 rounded-full p-2">
                            <LifeBuoy className="h-5 w-5 text-black" />
                        </div>
                        Assistance
                    </div>
                    <div className="flex flex-col items-center justify-center text-center text-xs text-muted-foreground">
                        <div className="bg-gray-100 rounded-full p-2">
                            <Settings className="h-5 w-5 text-black" />
                        </div>
                        Paramètres
                    </div>
                </div>

                <Separator className="my-4" />

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {navItems.map(({ href, label, icon, badge }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center justify-between px-3 py-3 rounded-md hover:bg-muted"
                            onClick={() => setOpen(false)}
                        >
                            <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                                {icon}
                                {label}
                            </div>
                            {badge && (
                                <Badge variant="destructive" className="text-white text-xs">
                                    {badge}
                                </Badge>
                            )}
                        </Link>
                    ))}
                </nav>

                <Separator className="my-4" />

                {/* Déconnexion */}
                <Button
                    variant="ghost"
                    className="w-full flex justify-start text-red-600"
                    onClick={() => {
                        // TODO: ajouter ici la logique de logout si besoin
                        setOpen(false);
                    }}
                >
                    <LogOut className="h-5 w-5 mr-2" />
                    Se déconnecter du profil
                </Button>
            </SheetContent>
        </Sheet>
    );
}
