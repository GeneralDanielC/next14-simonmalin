"use client"

import { useEffect, useState } from "react"

import { PartyWithGuests } from "@/types"
import { getAttendingGuests, getAttendingGuestsInParty, getAttendingNuptials, getAttendingNuptialsInParty, getAttendingReception, getAttendingReceptionInParty, getTotalGuests } from "@/lib/parties"

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

    const [attendingNuptials, setAttendingNuptials] = useState(party && getAttendingNuptialsInParty({ party }) || parties && getAttendingNuptials({ parties }));

    const [attendingReception, setAttendingReception] = useState(party && getAttendingReceptionInParty({ party }) || parties && getAttendingReception({ parties }));

    const totalGuests = party && party.guests.length || parties && getTotalGuests({ parties });

    useEffect(() => {
        if (party) {
            setAttendingGuests(getAttendingGuestsInParty({ party }))
            setAttendingNuptials(getAttendingNuptialsInParty({ party }))
            setAttendingReception(getAttendingReceptionInParty({ party }))
        }
        if (parties) {
            setAttendingGuests(getAttendingGuests({ parties }))
            setAttendingNuptials(getAttendingNuptials({ parties }))
            setAttendingReception(getAttendingReception({ parties }))
        }
    }, [party, parties])

    return (
        <Card x-chunk="dashboard-05-chunk-1" className="flex flex-row w-full col-span-3 sm:col-span-2">
            <div className="w-full flex flex-col justify-between">
                <CardHeader className="pb-2">
                    <CardDescription className="text-xs">Attending</CardDescription>
                    <CardTitle className="flex flex-row gap-x-2 items-center">
                        <span className={cn("text-4xl", attendingGuests === totalGuests && "text-emerald-400")}>{attendingGuests}</span>
                        <span className="text-xl text-stone-400">/ {totalGuests}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        {party ? "Guests in this party who intend to attend some part of the wedding." : "Guests who intend to attend some part of the wedding."}
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress value={(attendingGuests || 0) / (totalGuests || 0) * 100} aria-label="" />
                </CardFooter>
            </div>
            <div className="w-full flex flex-col justify-between">
                <CardHeader className="pb-2">
                    <CardDescription className="text-xs">Nuptials</CardDescription>
                    <CardTitle className="flex flex-row gap-x-2 items-center">
                        <span className={cn("text-4xl", attendingNuptials === totalGuests && "text-emerald-400")}>{attendingNuptials}</span>
                        <span className="text-xl text-stone-400">/ {totalGuests}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        {party ? "Guests in this party who intend to attend the nuptials." : "Guests who intend to attend the nuptials."}
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress value={(attendingNuptials || 0) / (totalGuests || 0) * 100} aria-label="" />
                </CardFooter>
            </div>
            <div className="w-full flex flex-col justify-between">
                <CardHeader className="pb-2">
                    <CardDescription className="text-xs">Reception</CardDescription>
                    <CardTitle className="flex flex-row gap-x-2 items-center">
                        <span className={cn("text-4xl", attendingReception === totalGuests && "text-emerald-400")}>{attendingReception}</span>
                        <span className="text-xl text-stone-400">/ {totalGuests}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        {party ? "Guests in this party who intend to attend the reception." : "Guests who intend to attend the reception."}
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress value={(attendingReception || 0) / (totalGuests || 0) * 100} aria-label="" />
                </CardFooter>
            </div>
        </Card>
    )
}