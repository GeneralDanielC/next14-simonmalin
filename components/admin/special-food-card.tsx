"use client"

import { useEffect, useState } from "react"

import { PartyWithGuests } from "@/types"
import { getGuestsWithFoodPreferences, getGuestsWithFoodPreferencesInParty, getTotalGuests } from "@/lib/parties"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SpecialFoodCardProps {
    party?: PartyWithGuests,
    parties?: PartyWithGuests[]
}

export const SpecialFoodCard = ({
    party,
    parties,
}: SpecialFoodCardProps) => {
    const router = useRouter();

    const [guestsWithFoodPreferences, setGuestsWithFoodPreferences] = useState(party && getGuestsWithFoodPreferencesInParty({ party }) || parties && getGuestsWithFoodPreferences({ parties }));

    const totalGuests = party && party.guests.length || parties && getTotalGuests({ parties });

    useEffect(() => {
        if (party) setGuestsWithFoodPreferences(getGuestsWithFoodPreferencesInParty({ party }));
        if (parties) setGuestsWithFoodPreferences(getGuestsWithFoodPreferences({ parties }));

    }, [party, parties])

    return (
        <Card
            className="col-span-3 sm:col-span-2 md:col-span-3" x-chunk="dashboard-05-chunk-0"
        >
            <CardHeader className="pb-3">
                <CardDescription className="text-xs">Special Food Preferences</CardDescription>
                <CardTitle className="flex flex-row gap-x-2 items-center">
                    <span className={cn("text-4xl", (guestsWithFoodPreferences || 0) > 0 && "text-amber-400")}>{guestsWithFoodPreferences}</span>
                    <span className="text-xl text-stone-400">/ {totalGuests}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    {party ? "Attending guests in this party who require special foods due to allergies." : "Guests attending who require special foods due to allergies."}
                </div>
                {guestsWithFoodPreferences === 0 ?
                    <div className="flex flex-col justify-center items-center mt-2">
                        <span className="text-xs text-muted-foreground underline">{party ? "No allergies in this party." : "No special food preferences."}</span>
                    </div>
                    :
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Allergies</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {party ? (
                                party?.guests.map(guest => (
                                    guest.foodPreferences !== "" && guest.willAttend && (
                                        <TableRow className="text-xs">
                                            <TableCell>{guest.firstName} {guest.lastName}</TableCell>
                                            <TableCell>{guest.foodPreferences}</TableCell>
                                        </TableRow>
                                    )
                                ))
                            ) : (
                                parties?.map(party => (
                                    party.guests.map(guest => (
                                        guest.foodPreferences !== "" && guest.willAttend && (
                                            <TableRow className="text-xs hover:cursor-pointer" onClick={() => router.push(`/admin/parties/${party.id}`)}>
                                                <TableCell>
                                                    <div className="font-medium">{guest.firstName} {guest.lastName}</div>
                                                    <div className="text-xs text-muted-foreground md:inline">
                                                        {party.email}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{guest.foodPreferences}</TableCell>
                                            </TableRow>
                                        )
                                    ))
                                ))
                            )}

                        </TableBody>
                    </Table>
                }
            </CardContent>
            <CardFooter>
                <Progress value={(guestsWithFoodPreferences || 0) / (totalGuests || 0) * 100} aria-label="" />
            </CardFooter>
        </Card>
    )
}