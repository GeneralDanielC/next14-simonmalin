import { PartyWithGuests } from "@/types";
import { Guest } from "@prisma/client";


export const sortPartiesByAttendingFirst = ({ parties }: { parties: PartyWithGuests[] }) => {
    return parties.sort((a, b) => {
        const attendingGuestsA = a.guests.filter(guest => guest.willAttend).length;
        const attendingGuestsB = b.guests.filter(guest => guest.willAttend).length;

        return attendingGuestsB - attendingGuestsA;
    })
}

export const sortPartiesByAttendingLast = ({ parties }: { parties: PartyWithGuests[] }) => {
    return parties.sort((a, b) => {
        const attendingGuestsA = a.guests.filter(guest => guest.willAttend).length;
        const attendingGuestsB = b.guests.filter(guest => guest.willAttend).length;

        return attendingGuestsA - attendingGuestsB;
    })
}