import { Gift } from "@prisma/client";
import { PartyWithGuests } from "@/types";
import { getAttendingGuestsInParty } from "./parties";

export const filterGiftsByIsAssigned = ({ gifts }: { gifts: Gift[] }) => {
    return gifts.filter(gift => !!gift.assignedToEmail);
}

export const filterGiftsByIsNotAssigned = ({ gifts }: { gifts: Gift[] }) => {
    return gifts.filter(gift => !gift.assignedToEmail);
}

// Parties

export const filterPartiesByNotAttending = ({ parties }: { parties: PartyWithGuests[] }) => {
    return parties.filter(party => getAttendingGuestsInParty({ party }) !== party.guests.length);
}

export const filterPartiesByAttendingAll = ({ parties }: { parties: PartyWithGuests[] }) => {
    return parties.filter(party => getAttendingGuestsInParty({ party }) === party.guests.length);
}

// Guests

export const filterGuestsByNotAttending = ({ parties }: { parties: PartyWithGuests[] }) => {
    return parties.flatMap(party =>
        party.guests.filter(guest => !guest.willAttend)
    );
};

export const filterGuestsByAttendingAll = ({ parties }: { parties: PartyWithGuests[] }) => {
    return parties.filter(party => getAttendingGuestsInParty({ party }) === party.guests.length);
}