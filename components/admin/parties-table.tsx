"use client"

import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { PartyWithGuests } from "@/types"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getAttendingGuestsInParty } from "@/lib/parties"
import { formatDateWithTime } from "@/lib/date"
import { TriangleAlert } from "lucide-react"
import { getPartiesWithMissingGuests } from "@/lib/alerts" // Import the function

interface PartiesTableProps {
    parties?: PartyWithGuests[],
}

export const PartiesTable = ({
    parties = []
}: PartiesTableProps) => {
    const router = useRouter();

    // Get the alerted parties
    const alertedParties = getPartiesWithMissingGuests({ parties });

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Attending</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {parties?.map(party => {
                        const isAlerted = alertedParties.some(alertedParty => alertedParty.id === party.id);

                        return (
                            <TableRow
                                key={party.id}
                                className="hover:cursor-pointer"
                                onClick={() => router.push(`/admin/parties/${party.id}`)}
                            >
                                <TableCell>
                                    <div className="font-medium">{party.email}</div>
                                    <div className="text-xs text-muted-foreground md:inline">
                                        {party.guests.map(guest => (
                                            <p key={guest.id}>{guest.firstName} {guest.lastName}</p>
                                        ))}
                                    </div>
                                    <div className="flex flex-col text-xs mt-2 text-muted-foreground">
                                        <div className="flex flex-row gap-x-1">
                                            <span className="font-bold">Created:</span>
                                            <span>{formatDateWithTime(party.createdAt)}</span>
                                        </div>
                                        {new Date(party.updatedAt).getTime() !== new Date(party.createdAt).getTime() && (
                                            <div className="flex flex-row gap-x-1">
                                                <span className="font-bold">Updated:</span>
                                                <span>{formatDateWithTime(party.updatedAt)}</span>
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge className="text-xs" variant={"secondary"}>
                                        <span className={cn(getAttendingGuestsInParty({ party }) === party.guests.length && "text-emerald-500")}>
                                            {getAttendingGuestsInParty({ party })}
                                        </span>
                                        <span className="mx-1 text-stone-400">/</span>
                                        <span className="text-stone-400">{party.guests.length}</span>
                                    </Badge>
                                </TableCell>
                                <TableCell className="w-8 pl-0">
                                    {/* Render the warning triangle if the party is in the alerted list */}
                                    {isAlerted && (
                                        <div className="w-full h-full flex flex-col items-center justify-end text-amber-500">
                                            <TriangleAlert className="size-5" />
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    )
}