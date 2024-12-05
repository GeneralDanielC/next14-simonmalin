"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface LinkCardProps {
    title: string
    description: string
    href: string
    icon: React.ReactElement
}

export const LinkCard = ({
    title,
    description,
    href,
    icon
}: LinkCardProps) => {
    const router = useRouter();

    const handleRedirect = () => router.push(href);

    return (
        <Card onClick={handleRedirect} className="sm:col-span-1 hover:cursor-pointer hover:opacity-80 transition-all border bg-stone-200 border-black dark:bg-card w-full h-full flex flex-col items-center justify-between">
            <CardHeader className="pb-3 flex items-center justify-center">
                <span>{icon}</span>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription className="text-xs">{description}</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
                <Button onClick={handleRedirect} className="w-full text-xs">take me there</Button>
            </CardContent>
        </Card>
    )
}