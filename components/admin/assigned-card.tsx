"use client"

import { useEffect, useState } from "react"
import { Gift } from "@prisma/client"
import { getAssignedGifts, getNotAssignedGifts } from "@/lib/gifts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AssignedCardProps {
    gifts: Gift[],
    showAssigned: boolean,
}

export const AssignedCard = ({
    gifts,
    showAssigned
}: AssignedCardProps) => {
    const [assignedGifts, setAssignedGifts] = useState(getAssignedGifts({ gifts }));
    const [notAssignedGifts, setNotAssignedGifts] = useState(getNotAssignedGifts({ gifts }));

    const totalGifts = gifts.length;

    useEffect(() => {
        showAssigned ? setAssignedGifts(getAssignedGifts({ gifts })) : setNotAssignedGifts(getNotAssignedGifts({ gifts }));
    }, [gifts]);

    return (
        <Card x-chunk="dashboard-05-chunk-2" className="col-span-2">
            <CardHeader className="pb-2">
                <CardDescription className="text-xs">{showAssigned ? "Assigned" : "Not Assigned"}</CardDescription>
                <CardTitle className="flex flex-row gap-x-2 items-center">
                    <span className="text-4xl">{showAssigned ? assignedGifts : notAssignedGifts}</span>
                    <span className="text-xl text-stone-400">/ {totalGifts}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    {showAssigned ? "Gifts that are assigned to guests." : "Gifts that are not yet assigned to guests."}
                </div>
            </CardContent>
            <CardFooter>
                <Progress value={(showAssigned ? assignedGifts : notAssignedGifts) / totalGifts * 100} aria-label="" />
            </CardFooter>
        </Card>
    )
}