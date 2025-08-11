'use client';

import Link from 'next/link';
import { CarFront, Home, LifeBuoy, MapPinned, PanelLeft, Server, Settings, ShieldCheck, ShoppingCart, Store, Users2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { VercelLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { NavItem } from '../dash/nav-item';
import { useEffect, useState } from 'react';
import Securite from '../securite/Securite';
import { getUserRole, isSessionStillValid } from '@/app/middleware';
import SupportServiceApp from '../securite/SupportServiceApp';
import Parametres from '../parametres/Parametres';


export default function DesktopNav({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (value: boolean) => void; }) {

    const [openSecurite, setOpenSecurite] = useState(false);
    const [open, setOpen] = useState(false);

    const [openServiceApp, setOpenServiceApp] = useState(false);
    const [openParametres, setOpenParametres] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isroles, setIsroles] = useState("")
    const [navItems, setNavItems] = useState<any[]>([]);

    const getIsAuthenticated = async () => {
        const res = await isSessionStillValid()
        setIsAuthenticated(res)
    }

    // getUserRole
    const getuserRoles = async () => {
        const res = await getUserRole()
        if (res) {
            setIsroles(res)
        }
    }

    useEffect(() => {
        getIsAuthenticated()
        getuserRoles();

    }, [])


    // Tous les menus disponibles
    const allMenus = {
        dashboard: { href: '/dashboard/compte', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
        commandes: { href: '/dashboard/commandes', label: 'Mes commandes', icon: <ShoppingCart className="h-5 w-5" /> },
        trajets: { href: '/dashboard/trajets', label: 'Trajets', icon: <MapPinned className="h-5 w-5" /> },
        flotte: { href: '/dashboard/listes-vehicles', label: 'Ma flotte', icon: <CarFront className="h-5 w-5" /> },
        transactions: { href: '/dashboard/transaction', label: 'Transactions', icon: <Users2 className="h-5 w-5" /> },
        services: { href: '/dashboard/services', label: 'Services', icon: <Server className="h-5 w-5" /> },
        utilisateurs: { href: '/dashboard/liste-users', label: 'Liste des utilisateurs', icon: <Users2 className="h-5 w-5" /> },
        // boutiques: { href: '/dashboard/boutiques', label: 'Boutiques', icon: <Store className="h-5 w-5" />, badge: 'Nouveau!' },
    };

    // Menus par rôle
    const roleMenus: Record<string, (keyof typeof allMenus)[]> = {
        ADMIN: ["dashboard", "commandes", "trajets", "flotte", "transactions", "services", "utilisateurs"],
        LIVREUR: ["dashboard", "commandes", "trajets", "flotte", "transactions", "services"],
        PARTNER: ["dashboard", "commandes", "trajets", "flotte", "transactions"],
        USER: ["dashboard", "commandes", "trajets"],
    };

    useEffect(() => {
        const keys = roleMenus[isroles] || [];
        setNavItems(keys.map((key) => allMenus[key]));
    }, [isroles]);

    // openSecurite fonction pour ouvrir la sécurité
    const openSecuriteSheet = () => {
        setCollapsed(false);
        setOpenSecurite(true);
    };


    const openServiceAppSheet = () => {
        setOpen(false);
        setOpenSecurite(false);
        setOpenServiceApp(true);
    };

    const openParametresSheet = () => {
        setOpen(false);
        setOpenSecurite(false);
        setOpenServiceApp(false);
        setOpenParametres(true);
    };




    return (

        <>

            <aside className={`fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'} sm:flex`} >
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

                <div className="mt-auto flex flex-col px-2 py-4">
                    <button onClick={() => openSecuriteSheet()}
                        className="flex items-center h-9 w-auto rounded-lg text-muted-foreground hover:text-foreground space-x-2" >
                        <ShieldCheck className="h-6 w-6" />
                        <span>Sécurité</span>
                    </button>

                    <button  onClick={() => openServiceAppSheet()}
                        className="flex items-center h-9 w-auto rounded-lg text-muted-foreground hover:text-foreground space-x-2" >
                        <LifeBuoy className="h-6 w-6" />
                        <span>Assistance</span>
                    </button>

                    <button onClick={() => openParametresSheet()}
                        className="flex items-center h-9 w-auto rounded-lg text-muted-foreground hover:text-foreground space-x-2" >
                        <Settings className="h-6 w-6" />
                        <span>Paramètres</span>
                    </button>


                </div>

            </aside>

            <Securite onClose={() => setOpenSecurite(false)} isOpen={openSecurite} />
            <SupportServiceApp onClose={() => setOpenServiceApp(false)} isOpen={openServiceApp} />
            <Parametres onClose={() => setOpenParametres(false)} isOpen={openParametres} />

        </>

    );


}
