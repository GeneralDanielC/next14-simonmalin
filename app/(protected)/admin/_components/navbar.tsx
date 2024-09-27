"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { Logo } from "@/components/logo";
import { SearchParties } from "@/components/search-parties";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { PartyWithGuests } from "@/types";
import { GiftIcon, Home, HomeIcon, LineChart, LogOutIcon, Package, PanelLeft, Search, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react";

type Breadcrumb = {
    title: String,
    href: String,
}

interface NavbarProps {
    breadcrumbs: Breadcrumb[],
    parties: PartyWithGuests[],
}

export const Navbar = ({ 
    breadcrumbs,
    parties
 }: NavbarProps) => {

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <LineChart className="h-5 w-5" />
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    {breadcrumbs?.map((bc, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                {index !== breadcrumbs.length - 1 ?
                                    <BreadcrumbLink asChild>
                                        <Link href={`${bc.href}`}>{bc.title}</Link>
                                    </BreadcrumbLink>
                                    :
                                    <BreadcrumbPage>{bc.title}</BreadcrumbPage>
                                }

                            </BreadcrumbItem>
                            {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
            <SearchParties parties={parties} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Image
                            src="/images/placeholder-user.webp"
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={"/admin/settings"}>
                            Settings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}