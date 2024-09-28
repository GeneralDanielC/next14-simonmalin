"use client"

import { useEffect, useState } from "react"

import { PartyWithGuests } from "@/types"
import { getAlcoholFreeGuestsInParty, getParticipatingGuestsInParty } from "@/lib/parties"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AlcoholFreeCardProps {
    party: PartyWithGuests
}

export const AlcoholFreeCard = ({
    party
}: AlcoholFreeCardProps) => {
    const [alcoholFreeGuests, setAlcoholFreeGuests] = useState(getAlcoholFreeGuestsInParty({ party }));

    useEffect(() => {
        setAlcoholFreeGuests(getAlcoholFreeGuestsInParty({ party }));
    }, [party])

    return (
        <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
                <CardDescription className="text-xs">Alcohol Free</CardDescription>
                <CardTitle className="flex flex-row gap-x-2 items-center">
                    <span className="text-4xl">{alcoholFreeGuests}</span>
                    <span className="text-xl text-stone-400">/ {party.guests.length}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    Guests in this party that prefer alcohol free beverages.
                </div>
            </CardContent>
            <CardFooter>
                <Progress value={alcoholFreeGuests / party.guests.length * 100} aria-label="" />
            </CardFooter>
        </Card>
    )
}