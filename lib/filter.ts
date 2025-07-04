import { Gift } from "@prisma/client";
import { GiftWithAssignments, PartyWithGuests } from "@/types";
import { getAttendingGuestsInParty } from "./parties";

export const filterGiftsByIsAssigned = ({ gifts }: { gifts: GiftWithAssignments[] }) => {
    return gifts.filter(gift => gift.giftAssignments.length > 0);
}

export const filterGiftsByIsNotAssigned = ({ gifts }: { gifts: GiftWithAssignments[] }) => {
    return gifts.filter(gift => gift.giftAssignments.length === 0);
}

export const filterGiftsByHidden = ({ gifts }: { gifts: GiftWithAssignments[] }) => {
    return gifts.filter(gift => gift.hidden);
}

export const filterGiftsByVisible = ({ gifts }: { gifts: GiftWithAssignments[] }) => {
    return gifts.filter(gift => !gift.hidden);
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