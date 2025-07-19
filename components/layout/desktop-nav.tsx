'use client';

import Link from 'next/link';
import {CarFront,Home,MapPinned,PanelLeft,Server,Settings,ShieldCheck,ShoppingCart,Store,Users2} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { VercelLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { NavItem } from '../dash/nav-item';
import { useState } from 'react';
import Securite from '../securite/Securite';

const navItems = [
    { href: '/dashboard/compte', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { href: '/dashboard/commandes', label: 'Mes commandes', icon: <ShoppingCart className="h-5 w-5" /> },
    { href: '/dashboard/trajets', label: 'Trajets', icon: <MapPinned className="h-5 w-5" /> },
    { href: '/dashboard/listes-vehicles', label: 'Ma flotte', icon: <CarFront className="h-5 w-5" /> },
    { href: '/dashboard/transaction', label: 'Transactions', icon: <Users2 className="h-5 w-5" /> },
    { href: '/dashboard/services', label: 'Services', icon: <Server className="h-5 w-5" /> },
    { href: '/dashboard/liste-users', label: 'Liste des utilisateurs', icon: <Users2 className="h-5 w-5" /> },
    // boutiques
    { href: '/dashboard/boutiques', label: 'Boutiques', icon: <Store className="h-5 w-5" /> },
];

export default function DesktopNav({ collapsed,  setCollapsed }: { collapsed: boolean; setCollapsed: (value: boolean) => void; }){

    const [openSecurite, setOpenSecurite] = useState(false);
    const [open, setOpen] = useState(false);

    // openSecurite fonction pour ouvrir la sécurité
    const openSecuriteSheet = () => {
        setCollapsed(false);
        setOpenSecurite(true);
    };
    
    return (

        <>

        <aside className={`fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background transition-all duration-300 ${collapsed ? 'w-16' : 'w-60' } sm:flex`} >
            <div className="flex justify-between p-2">
                <Link
                    href="/"
                    className="flex h-10 w-10 justify-center rounded-full bg-primary text-primary-foreground"
                >
                    <VercelLogo className="h-4 w-4" />
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-muted-foreground"
                >
                    <PanelLeft className="h-5 w-5" />
                </Button>
            </div>

            <nav className="flex flex-col gap-4 px-2 sm:py-5">
                {navItems.map(({ href, label, icon }) => (
                    <NavItem key={href} href={href} label={label} collapsed={collapsed}>
                        {icon}
                    </NavItem>
                ))}
            </nav>

                <div className="mt-auto flex flex-col px-2">
                    <button
                        onClick={() => openSecuriteSheet()}
                        className="flex items-center h-9 w-auto rounded-lg text-muted-foreground hover:text-foreground space-x-2"
                    >
                        <ShieldCheck className="h-6 w-6" />
                        <span>Sécurité</span>
                    </button>
                </div>

            <div className="mt-auto flex flex-col px-2 py-4">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="#"
                            className="flex h-9 w-9 justify-center rounded-lg text-muted-foreground hover:text-foreground"
                        >
                            <Settings className="h-5 w-5" />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Settings</TooltipContent>
                </Tooltip>
            </div>
        </aside>

        <Securite onClose={() => setOpenSecurite(false)} isOpen={openSecurite} />

        </>

    );


}
