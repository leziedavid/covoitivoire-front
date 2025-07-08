'use client';

import Link from 'next/link';
import { Car, CarFront, Home, LineChart, MapPinned, Package, PanelLeft, Server, Settings, ShoppingCart, Users2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { VercelLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { NavItem } from '../dash/nav-item';

export default function DesktopNav({ collapsed, setCollapsed }: {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
}) {
    return (
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
                <NavItem href="/dashboard/compte" label="Dashboard" collapsed={collapsed}>
                    <Home className="h-5 w-5" />
                </NavItem>
                <NavItem href="/dashboard/commandes" label="Mes commandes" collapsed={collapsed}>
                    <ShoppingCart className="h-5 w-5" />
                </NavItem>

                
                <NavItem href="/dashboard/trajets" label="Trajets" collapsed={collapsed}>
                    <MapPinned className="h-5 w-5" />
                </NavItem>
                
                <NavItem href="/dashboard/listes-vehicles" label="Ma flotte" collapsed={collapsed}>
                    <CarFront className="h-5 w-5" />
                </NavItem>
                <NavItem href="/dashboard/transaction" label="Transactions" collapsed={collapsed}>
                    <Users2 className="h-5 w-5" />
                </NavItem>

                <NavItem href="/dashboard/services" label="Services" collapsed={collapsed}>
                    <Server className="h-5 w-5" />
                </NavItem>
            </nav>

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
    );
}
