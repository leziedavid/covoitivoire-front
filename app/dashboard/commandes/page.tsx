"use client";

import { Searchs } from "@/components/dash/searchs";
import TripOrderList from "@/components/oders/TripOrderList";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useOrderSocket } from '@/lib/socket/useOrderSocket';


export default function Page() {
    useOrderSocket() // ← Active les sockets seulement ici
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);


    return (

        <div className="w-full overflow-x-auto">
            <Searchs />
            <TripOrderList />

        </div>
    );
}


