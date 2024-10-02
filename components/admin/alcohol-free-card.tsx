"use client"

import { useEffect, useState } from "react"

import { PartyWithGuests } from "@/types"
import { getAlcoholFreeGuests, getAlcoholFreeGuestsInParty, getTotalGuests } from "@/lib/parties"

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
    party?: PartyWithGuests,
    parties?: PartyWithGuests[],
}

export const AlcoholFreeCard = ({
    party,
    parties,
}: AlcoholFreeCardProps) => {
    const [alcoholFreeGuests, setAlcoholFreeGuests] = useState(party && getAlcoholFreeGuestsInParty({ party }) || parties && getAlcoholFreeGuests({ parties }));

    const totalGuests = party && party.guests.length || parties && getTotalGuests({ parties });

    useEffect(() => {
        if (party) setAlcoholFreeGuests(getAlcoholFreeGuestsInParty({ party }));
        if (parties) setAlcoholFreeGuests(getAlcoholFreeGuests({ parties }));

    }, [party, parties])

    return (
        <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
                <CardDescription className="text-xs">Alcohol-Free</CardDescription>
                <CardTitle className="flex flex-row gap-x-2 items-center">
                    <span className="text-4xl">{alcoholFreeGuests}</span>
                    <span className="text-xl text-stone-400">/ {totalGuests}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    {party ? "Attending guests in this party who prefer alcohol-free beverages." : "Guests attending who prefer alcohol-free beverages."}
                </div>
            </CardContent>
            <CardFooter>
                <Progress value={(alcoholFreeGuests || 0) / (totalGuests || 0) * 100} aria-label="" />
            </CardFooter>
        </Card>
    )
}