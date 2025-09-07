"use client"
import { ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import Link from "next/link"
export default function DropdownMenuWithIcons() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu onOpenChange={setIsOpen} >
            <DropdownMenuTrigger asChild>
                <Link href="#/" className="border-0 font-bold text-2xl flex items-start justify-start p-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 active:ring-0 active:ring-offset-0">
                    Ride
                    <ChevronDown
                        className={`h-9 w-6 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-100">
                <DropdownMenuLabel>Request a Ride</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Reserve a Ride</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Request a Ride</DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}