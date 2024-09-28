"use client"

import { useEffect, useState } from "react"

import { PartyWithGuests } from "@/types"
import { getParticipatingGuestsInParty } from "@/lib/parties"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface AttendanceCardProps {
    party: PartyWithGuests
}

export const AttendanceCard = ({
    party
}: AttendanceCardProps) => {
    const [participatingGuests, setParticipatingGuests] = useState(getParticipatingGuestsInParty({ party }));

    useEffect(() => {
        setParticipatingGuests(getParticipatingGuestsInParty({ party }));
    }, [party])

    return (
        <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
                <CardDescription className="text-xs">Attendance</CardDescription>
                <CardTitle className="flex flex-row gap-x-2 items-center">
                    <span className={cn("text-4xl", participatingGuests === party.guests.length && "text-emerald-400")}>{participatingGuests}</span>
                    <span className="text-xl text-stone-400">/ {party.guests.length}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    Guests in this party that intend to attend the wedding.
                </div>
            </CardContent>
            <CardFooter>
                <Progress value={participatingGuests / party.guests.length * 100} aria-label="" />
            </CardFooter>
        </Card>
    )
}