"use client";

import { southland } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Link } from "lucide-react"
import { useEffect, useState } from "react";

export const Logo = () => {
    const [mounted, setMounted] = useState(false);

    // Ensure that the logo only renders on the client-side to avoid hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Link href="/" className="">
            <div className={cn(southland.className, "text-6xl flex h-full items-center backdrop-blur-sm bg-beige/50 rounded-2xl pt-5 pb-2 px-5")}>
                <span className="text-rose-300">
                    Malin
                </span>
                <span className="text-stone-500">
                    &
                </span>
                <span className="text-dark-green">
                    Simon
                </span>
            </div>
        </Link>
    )
}