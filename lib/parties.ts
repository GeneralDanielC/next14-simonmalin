import { PartyWithGuests } from "@/types";

export const getAlcoholFreeGuestsInParty = ({ party }: { party: PartyWithGuests }) => {
    let guestsPreferAlcoholFree = 0;

    party.guests.forEach(guest => {
        if (guest.alcoholPreference) {
            guestsPreferAlcoholFree += 1;
        }
    });

    return guestsPreferAlcoholFree;
}

export const getParticipatingGuestsInParty = ({ party }: { party: PartyWithGuests }) => {
    let guestsParticipating = 0;

    party.guests.forEach(guest => {
        if (guest.willAttend) {
            guestsParticipating += 1;
        }
    });

    return guestsParticipating;
}

export const getGuestsWithFoodPreferencesInParty = ({ party }: { party: PartyWithGuests }) => {
    let guestsWithFoodPreferences = 0;

    party.guests.forEach(guest => {
        if (guest.foodPreferences !== "") {
            guestsWithFoodPreferences += 1;
        }
    });

    return guestsWithFoodPreferences;
}