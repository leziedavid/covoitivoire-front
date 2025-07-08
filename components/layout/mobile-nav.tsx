'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
    Home,
    LineChart,
    Package,
    PanelLeftClose,
    PanelLeftOpen,
    ShoppingCart,
    Users2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', href: '/', icon: <Home className="h-5 w-5" /> },
        { id: 'orders', label: 'Orders', href: '#', icon: <ShoppingCart className="h-5 w-5" /> },
        { id: 'products', label: 'Products', href: '/', icon: <Package className="h-5 w-5" /> },
        { id: 'customers', label: 'Customers', href: '/customers', icon: <Users2 className="h-5 w-5" /> },
        { id: 'analytics', label: 'Analytics', href: '#', icon: <LineChart className="h-5 w-5" /> },
    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden">
                    {open ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <nav className="flex flex-col gap-2 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"
                            onClick={() => setOpen(false)}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
