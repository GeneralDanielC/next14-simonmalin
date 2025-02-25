"use client"

import { useEffect, useState } from "react"
import { Gift } from "@prisma/client"
import { getAssignedGifts, getAvailableGifts, getNotAssignedGifts } from "@/lib/gifts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { GiftWithAssignments } from "@/types"

interface AssignedCardProps {
    gifts: GiftWithAssignments[],
}

export const AvailableGiftsCard = ({
    gifts
}: AssignedCardProps) => {
    const [availableGifts, setAvailableGifts] = useState(getAvailableGifts({ gifts }));

    const totalGifts = gifts.length;

    useEffect(() => {
        setAvailableGifts(getAvailableGifts({ gifts }))
    }, [gifts]);

    return (
        <Card x-chunk="dashboard-05-chunk-2" className="col-span-1 w-full">
            <CardHeader className="pb-2">
                <CardDescription className="text-xs">Available</CardDescription>
                <CardTitle className="flex flex-row gap-x-2 items-center">
                    <span className="text-4xl">{availableGifts.length}</span>
                    <span className="text-xl text-stone-400">/ {totalGifts}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    Gifts that are still available for reservation.
                </div>
            </CardContent>
            <CardFooter>
                <Progress value={availableGifts.length / totalGifts * 100} aria-label="" />
            </CardFooter>
        </Card>
    )
}