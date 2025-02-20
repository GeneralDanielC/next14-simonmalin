import levenshtein from "fast-levenshtein";
import { PartyWithGuests } from "@/types";

export const getPartiesWithMissingGuests = ({ parties }: { parties: PartyWithGuests[] }): PartyWithGuests[] => {
    return parties.filter((party) => {
        const email = party.email.toLowerCase();
        let containsGuestName = false;

        party.guests.forEach((guest) => {
            const firstName = guest.firstName.toLowerCase();
            const lastName = guest.lastName.toLowerCase();

            // Direct match (quick check)
            if (email.includes(firstName) || email.includes(lastName)) {
                containsGuestName = true;
                return;
            }

            // Fuzzy matching (Levenshtein Distance)
            const emailWords = email.split(/[^a-zA-Z]/).filter(Boolean); // Split email into words
            emailWords.forEach((word) => {
                if (
                    levenshtein.get(word, firstName) <= 2 || // Allow max 2 edits
                    levenshtein.get(word, lastName) <= 2
                ) {
                    containsGuestName = true;
                    return;
                }
            });
        });

        // If no guest name is found in the email, include this party in the result
        return !containsGuestName;
    });
};