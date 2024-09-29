"use client"

import { useEffect, useState } from "react"

import { PartyWithGuests } from "@/types"
import { getAttendingGuests, getAttendingGuestsInParty, getTotalGuests } from "@/lib/parties"

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
    party?: PartyWithGuests,
    parties?: PartyWithGuests[],
}

export const AttendanceCard = ({
    party,
    parties
}: AttendanceCardProps) => {
    const [attendingGuests, setAttendingGuests] = useState(party && getAttendingGuestsInParty({ party }) || parties && getAttendingGuests({ parties }));

    const totalGuests = party && party.guests.length || parties && getTotalGuests({ parties });

    useEffect(() => {
        if (party) setAttendingGuests(getAttendingGuestsInParty({ party }));
        if (parties) setAttendingGuests(getAttendingGuests({ parties }));
    }, [party, parties])

    return (
        <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
                <CardDescription className="text-xs">Attending</CardDescription>
                <CardTitle className="flex flex-row gap-x-2 items-center">
                    <span className={cn("text-4xl", attendingGuests === totalGuests && "text-emerald-400")}>{attendingGuests}</span>
                    <span className="text-xl text-stone-400">/ {totalGuests}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    {party ? "Guests in this party that intend to attend the wedding." : "Guests that intend to attend the wedding."}
                </div>
            </CardContent>
            <CardFooter>
                <Progress value={(attendingGuests || 0) / (totalGuests || 0) * 100} aria-label="" />
            </CardFooter>
        </Card>
    )
}