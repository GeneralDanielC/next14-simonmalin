"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
    href?: string,
    label?: string
}

export const BackButton = ({
    href,
    label
}: BackButtonProps) => {
    return (
        <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
        >
            {href && (
                <Link prefetch={true} href={href}>
                    {label}
                </Link>
            )}
        </Button>
    );
}