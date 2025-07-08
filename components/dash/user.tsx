'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getUserImageUrl, getUserName, useAuthMiddleware } from '@/app/middleware'

export function User() {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)


    const fetchImage = async () => {
        const url = await getUserImageUrl()
        setImageUrl(url)
    }

    const fetchName = async () => {
        const name = await getUserName()
        setName(name)
        console.log(name)
    }

    useEffect(() => {
        fetchImage()
        fetchName()
    }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    <Image src={imageUrl || '/icon8.png'} width={36} height={36}  alt="Avatar" className="overflow-hidden rounded-full object-cover" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{name ? name : 'Mon Compte'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Paramètres</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/login">Se connecter</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
