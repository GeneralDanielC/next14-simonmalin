import { PartyWithGuests } from "@/types";

export const getAlcoholFreeGuestsInParty = ({ party }: { party: PartyWithGuests }) => {
    let guestsPreferAlcoholFree = 0;

    party.guests.forEach(guest => {
        if (guest.willAttend) {
            if (guest.alcoholPreference) {
                guestsPreferAlcoholFree++;
            }
        }
    });

    return guestsPreferAlcoholFree;
}

export const getAttendingGuestsInParty = ({ party }: { party: PartyWithGuests }) => {
    let guestsParticipating = 0;

    party.guests.forEach(guest => {
        if (guest.willAttend) {
            guestsParticipating++;
        }
    });

    return guestsParticipating;
}

export const getAttendingNuptialsInParty = ({ party }: { party: PartyWithGuests }) => {
    let guestsParticipating = 0;

    party.guests.forEach(guest => {
        if (guest.willAttendNuptials) {
            guestsParticipating++;
        }
    });

    return guestsParticipating;
}

export const getAttendingReceptionInParty = ({ party }: { party: PartyWithGuests }) => {
    let guestsParticipating = 0;

    party.guests.forEach(guest => {
        if (guest.willAttendReception) {
            guestsParticipating++;
        }
    });

    return guestsParticipating;
}

export const getGuestsWithFoodPreferencesInParty = ({ party }: { party: PartyWithGuests }) => {
    let guestsWithFoodPreferences = 0;

    party.guests.forEach(guest => {
        if (guest.willAttend) {
            if (guest.foodPreferences !== "") {
                guestsWithFoodPreferences++;
            }
        }
    });

    return guestsWithFoodPreferences;
}

export const getAlcoholFreeGuests = ({ parties }: { parties: PartyWithGuests[] }) => {
    let guestsPreferAlcoholFree = 0;

    parties.map(party => {
        party.guests.forEach(guest => {
            if (guest.willAttend) {
                if (guest.alcoholPreference) {
                    guestsPreferAlcoholFree++;
                }
            }
        });
    });

    return guestsPreferAlcoholFree;
}

export const getAttendingGuests = ({ parties }: { parties: PartyWithGuests[] }) => {
    let guestsParticipating = 0;

    parties.map(party => {
        party.guests.map(guest => {
            if (guest.willAttend) {
                guestsParticipating++;
            }
        })
    })

    return guestsParticipating;
}

export const getAttendingNuptials = ({ parties }: { parties: PartyWithGuests[] }) => {
    let guestsParticipating = 0;

    parties.map(party => {
        party.guests.map(guest => {
            if (guest.willAttendNuptials) {
                guestsParticipating++;
            }
        })
    })

    return guestsParticipating;
}

export const getAttendingReception = ({ parties }: { parties: PartyWithGuests[] }) => {
    let guestsParticipating = 0;

    parties.map(party => {
        party.guests.map(guest => {
            if (guest.willAttendReception) {
                guestsParticipating++;
            }
        })
    })

    return guestsParticipating;
}

export const getGuestsWithFoodPreferences = ({ parties }: { parties: PartyWithGuests[] }) => {
    let guestsWithFoodPreferences = 0;

    parties.map(party => {
        party.guests.map(guest => {
            if (guest.willAttend) {
                if (guest.foodPreferences !== "") {
                    guestsWithFoodPreferences++;
                }
            }
        })
    })

    return guestsWithFoodPreferences;
}

export const getTotalGuests = ({ parties }: { parties: PartyWithGuests[] }) => {
    let totalGuests = 0;

    parties.map(party => {
        totalGuests += party.guests.length;
    })
    console.log(totalGuests);

    return totalGuests;
}