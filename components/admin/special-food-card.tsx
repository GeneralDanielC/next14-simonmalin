"use client"

import { useEffect, useState } from "react"

import { PartyWithGuests } from "@/types"
import { getGuestsWithFoodPreferencesInParty } from "@/lib/parties"

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

interface SpecialFoodCardProps {
    party: PartyWithGuests
}

export const SpecialFoodCard = ({
    party
}: SpecialFoodCardProps) => {
    const [guestsWithFoodPreferences, setGuestsWithFoodPreferences] = useState(getGuestsWithFoodPreferencesInParty({ party }));

    useEffect(() => {
        setGuestsWithFoodPreferences(getGuestsWithFoodPreferencesInParty({ party }));
    }, [party])

    return (
        <Card
            className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
        >
            <CardHeader className="pb-3">
                <CardDescription className="text-xs">Special Food Preferences</CardDescription>
                <CardTitle className="flex flex-row gap-x-2 items-center">
                    <span className={cn("text-4xl", guestsWithFoodPreferences > 0 && "text-amber-400")}>{guestsWithFoodPreferences}</span>
                    <span className="text-xl text-stone-400">/ {party.guests.length}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    Guests in this party that require special foods due to allergies.
                </div>
                {guestsWithFoodPreferences === 0 ?
                    <div className="flex flex-col justify-center items-center mt-2">
                        <span className="text-xs text-muted-foreground underline">No allergies in this party.</span>
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
                            {party.guests.map(guest => (
                                guest.foodPreferences !== "" && (
                                    <TableRow className="text-xs">
                                        <TableCell>{guest.firstName} {guest.lastName}</TableCell>
                                        <TableCell>{guest.foodPreferences}</TableCell>
                                    </TableRow>
                                )
                            ))}
                        </TableBody>
                    </Table>
                }
            </CardContent>
            <CardFooter>
                <Progress value={guestsWithFoodPreferences / party.guests.length * 100} aria-label="" />
            </CardFooter>
        </Card>
    )
}