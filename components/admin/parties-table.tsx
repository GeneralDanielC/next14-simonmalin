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
import { getAttendingGuests, getAttendingGuestsInParty } from "@/lib/parties"

interface PartiesTableProps {
    parties?: PartyWithGuests[],
}

export const PartiesTable = ({
    parties
}: PartiesTableProps) => {
    const router = useRouter();

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Attending</TableHead>
                        {/* <TableHead className="hidden sm:table-cell">
                            Food Preferences
                        </TableHead>
                        <TableHead className="text-center">Alcohol Free</TableHead>
                        <TableHead className="text-center">Attendance</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {parties?.map(party => (
                        <TableRow className="hover:cursor-pointer" onClick={() => router.push(`/admin/parties/${party.id}`)}>
                            <TableCell>
                                <div className="font-medium">{party.email}</div>
                                <div className=" text-xs text-muted-foreground md:inline">
                                    {party.guests.map(guest => (
                                        <p>{guest.firstName} {guest.lastName}</p>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <Badge className="text-xs" variant={"secondary"}>
                                    <span className={cn(getAttendingGuestsInParty({party}) === party.guests.length && "text-emerald-500")}>{getAttendingGuestsInParty({ party })}</span>
                                    <span className="mx-1 text-stone-400">/</span>
                                    <span className="text-stone-400">{party.guests.length}</span>
                                </Badge>
                            </TableCell>
                            {/* <TableCell className="hidden sm:table-cell text-xs">
                                {guest.foodPreferences !== "" ? guest.foodPreferences : <span className="text-xs text-stone-400 italic">None.</span>}
                            </TableCell>
                            <TableCell className="text-center">
                                <Badge className="text-xs" variant={guest.alcoholPreference ? "secondary" : "outline"}>
                                    {guest.alcoholPreference ? "Yes" : "No"}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                                <Badge className={cn("text-xs", guest.willAttend ? "bg-emerald-300" : "bg-rose-300")} variant={guest.willAttend ? "secondary" : "outline"}>
                                    {guest.willAttend ? "Yes" : "No"}
                                </Badge>
                            </TableCell> */}
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </>
    )
}