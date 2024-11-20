"use client"

import Link from "next/link"
import { MenuIcon } from "lucide-react";

import { southland } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePathname } from "next/navigation";

export const NavBar = () => {
    const pathname = usePathname();

    const navItems = [
        { title: "Startsida", href: "/" },
        { title: "Vår historia", href: "/our-story" },
        { title: "24 maj 2025", href: "/wedding-day" },
        { title: "O.S.A.", href: "/osa" },
        { title: "Toastmadames", href: "/toastmadames" },
        { title: "Önskelista", href: "/gift-registry" },
        { title: "Galleri", href: "/gallery" },
    ];

    const [openNavbar, setOpenNavbar] = useState(false);

    return (
        <nav className="w-full flex justify-center items-center py-5 fixed z-50">
            <Link href="/" className="">
                <div className={cn(southland.className, "text-6xl flex h-full items-center backdrop-blur-sm bg-beige/50 rounded-2xl pt-5 pb-2 px-5")}>
                    <span className="">
                        Malin
                    </span>
                    <span className="">
                        &
                    </span>
                    <span className="">
                        Simon
                    </span>
                </div>
            </Link>
            {!pathname.includes("/auth/client-login") && (
                <div className="fixed right-5 top-8">
                    <Sheet open={openNavbar} onOpenChange={() => setOpenNavbar(!openNavbar)}>
                        <SheetTrigger asChild>
                            <Button className="rounded-xl size-12 backdrop-blur-md bg-transparent shadow-none text-stone-400 hover:bg-light-beige">
                                <MenuIcon className="size-16" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full h-full p-0">
                            <div className="w-full h-full bg-beige flex flex-col gap-y-4 justify-center items-center font-semibold sm:w-full">
                                {navItems.map((item, index) => (
                                    <Link onClick={() => setOpenNavbar(false)} href={item.href} className="flex flex-row gap-x-7 text-4xl text-lime-900/30 hover:text-green animate transition">
                                        {/* <span>0{index + 1}</span> */}
                                        <span className="uppercase">{item.title}</span>
                                    </Link>
                                ))}
                            </div>
                            <div className="absolute bottom-3 w-full flex justify-center">
                                <span className="text-xs lowercase text-stone-400">TILLHANDAHÅLLS AV NOLL2 SOLUTIONS AB</span>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            )}
        </nav>
    )
}