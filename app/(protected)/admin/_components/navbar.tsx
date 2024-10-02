"use client";

import { SearchParties } from "@/components/admin/search-parties";
import { LogoutButton } from "@/components/auth/logout-button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PartyWithGuests } from "@/types";
import { Gift } from "@prisma/client";
import { Home, Package, PanelLeft, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link"
import React from "react";

type Breadcrumb = {
    title: String,
    href: String,
}

interface NavbarProps {
    breadcrumbs: Breadcrumb[],
    parties: PartyWithGuests[],
    gifts: Gift[]
}

export const Navbar = ({ 
    breadcrumbs,
    parties,
    gifts,
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
                            href="/admin/dashboard"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/parties"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Users className="h-5 w-5" />
                            Parties & Guests
                        </Link>
                        <Link
                            href="/admin/registry"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Package className="h-5 w-5" />
                            Gift Registry
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Settings className="h-5 w-5" />
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
            <SearchParties parties={parties} gifts={gifts} />
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
                    <DropdownMenuItem><LogoutButton>Logout</LogoutButton></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}