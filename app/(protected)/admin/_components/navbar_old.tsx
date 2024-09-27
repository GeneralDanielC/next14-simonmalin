"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button"
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { GiftIcon, HomeIcon, LogOutIcon, UsersRound } from "lucide-react";
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className="h-full w-52 flex flex-col rounded-r-xl shadow-lg p-5 justify-between">
            <div className="flex flex-col gap-y-3">
                <Link href="/admin/dashboard">
                    <div className={cn(southland.className, "text-6xl flex h-full items-center backdrop-blur-sm rounded-2xl pt-5 pb-2 px-5")}>
                        <span className="text-rose-300">
                            M
                        </span>
                        <span className="text-stone-500">
                            &
                        </span>
                        <span className="text-dark-green">
                            S
                        </span>
                    </div>
                </Link>
                <Button
                    variant={pathname.includes("dashboard") ? "primary" : "ghost"}
                    asChild
                    className="px-3"
                >
                    <Link href={"/admin/dashboard"}>
                        <div className="w-full flex justify-start items-center gap-x-1.5">
                            <HomeIcon className="size-4" />
                            <span className="text-xs">Dashboard</span>
                        </div>
                    </Link>
                </Button>

                <Button
                    variant={pathname.includes("parties") ? "primary" : "ghost"}
                    asChild
                    className="px-3"
                >
                    <Link href={"/admin/parties"}>
                        <div className="w-full flex justify-start items-center gap-x-1.5">
                            <UsersRound className="size-4" />
                            <span className="text-xs">Parties & Guests</span>
                        </div>
                    </Link>
                </Button>
                <Button
                    variant={pathname.includes("registry") ? "primary" : "ghost"}
                    asChild
                    className="px-3 w-full"
                >
                    <Link href={"/admin/registry"}>
                        <div className="w-full flex justify-start items-center gap-x-1.5">
                            <GiftIcon className="size-4" />
                            <span className="text-xs">Gift Registry</span>
                        </div>
                    </Link>
                </Button>
            </div>
            <div>
                <LogoutButton>
                    <Button
                        variant="ghost"
                        size="lg"
                        className="px-3 w-full"
                    >
                        <div className="w-full flex justify-start items-center gap-x-1.5">
                            <LogOutIcon className="size-4" />
                            <span className="text-xs">Logout</span>
                        </div>
                    </Button>
                </LogoutButton>
            </div>
        </div >
    )
}