"use client"

import { cn } from "@/lib/utils"
import { PartyWithGuests } from "@/types"
import { useEditGuestModal } from "@/hooks/use-edit-guest-modal"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ModalProvider } from "@/components/providers/modal-provider"
import { Guest } from "@prisma/client"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface GuestTableProps {
    party?: PartyWithGuests,
    parties?: PartyWithGuests[],
}

export const GuestTable = ({
    party,
    parties
}: GuestTableProps) => {
    const router = useRouter();
    const editGuestModal = useEditGuestModal();

    const [guest, setGuest] = useState<Guest | undefined>();

    const handleOpenModal = (guestId: string) => {
        const guest = party?.guests.find(guest => guest.id === guestId);
        if (!guest) return;

        setGuest(guest);
        editGuestModal.onOpen();
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden sm:table-cell">
                            Food Preferences
                        </TableHead>
                        <TableHead className="text-center">Alcohol Free</TableHead>
                        <TableHead className="text-center">Attending</TableHead>

                        <TableHead className="text-center">
                            <div className="flex flex-col w-full">
                                <span>Attending</span>
                                <span className="text-xs italic">Nuptials</span>
                            </div>
                        </TableHead>
                        <TableHead className="text-center">
                            <div className="flex flex-col w-full">
                                <span>Attending</span>
                                <span className="text-xs italic">Reception</span>
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {party ? (
                        party?.guests.map(guest => (
                            <TableRow className="hover:cursor-pointer" onClick={() => handleOpenModal(guest.id)}>
                                <TableCell>
                                    <div className="font-medium">{guest.firstName} {guest.lastName}</div>
                                    {/* <div className="hidden text-sm text-muted-foreground md:inline">
                                                olivia@example.com
                                            </div> */}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell text-xs">
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
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge className={cn("text-xs", guest.willAttendNuptials ? "bg-emerald-300" : "bg-rose-300")} variant={guest.willAttendNuptials ? "secondary" : "outline"}>
                                        {guest.willAttendNuptials ? "Yes" : "No"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge className={cn("text-xs", guest.willAttendReception ? "bg-emerald-300" : "bg-rose-300")} variant={guest.willAttendReception ? "secondary" : "outline"}>
                                        {guest.willAttendReception ? "Yes" : "No"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        parties?.map(party => (
                            party.guests.map(guest => (
                                <TableRow className="hover:cursor-pointer" onClick={() => router.push(`/admin/parties/${party.id}`)}>
                                    <TableCell>
                                        <div className="font-medium">{guest.firstName} {guest.lastName}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {party.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell text-xs">
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
                                    </TableCell>
                                </TableRow>
                            ))
                        ))
                    )}

                </TableBody>
            </Table>
            <ModalProvider guest={guest} party={party} />
        </>
    )
}