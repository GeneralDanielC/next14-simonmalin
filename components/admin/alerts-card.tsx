"use client";

import { useEffect, useState } from "react";
import levenshtein from "fast-levenshtein";

import { PartyWithGuests } from "@/types";
import { Gift } from "@prisma/client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

enum AlertType {
    DUPLICATE_GUEST = "DUPLICATE_GUEST",
    ATTENDANCE_ERROR = "ATTENDANCE_ERROR",
    MISSING_GUEST = "MISSING_GUEST",
    TOO_MANY_GIFTS = "TOO_MANY_GIFTS",
}

export type Alert = {
    type: AlertType;
    description: string;
};

interface AlertsCardProps {
    parties?: PartyWithGuests[];
    gifts?: Gift[];
}

export const AlertsCard = ({
    parties = [],
    gifts = [],
}: AlertsCardProps) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    // Check for duplicate guests
    const checkGuestDuplicates = (): Alert[] => {
        const alerts: Alert[] = [];
        const seenGuests: Record<string, string[]> = {}; // Store guest keys with associated party emails

        parties.forEach((party) => {
            party.guests.forEach((guest) => {
                const guestKey = `${guest.firstName}-${guest.lastName}`;

                // Check if the guest already exists
                if (seenGuests[guestKey]) {
                    alerts.push({
                        type: AlertType.DUPLICATE_GUEST,
                        description: `Duplicate guest found: ${guest.firstName} ${guest.lastName} in parties ${[
                            ...seenGuests[guestKey],
                            party.email,
                        ].join(", ")}`,
                    });
                }

                // Add the party email to the seenGuests record
                if (!seenGuests[guestKey]) {
                    seenGuests[guestKey] = [];
                }
                seenGuests[guestKey].push(party.email);
            });
        });

        console.log(alerts);
        

        return alerts;
    };


    // Check for guests with specific food preferences and alcohol
    const checkFoodAndAlcohol = (): Alert[] => {
        const alerts: Alert[] = [];

        parties.forEach((party) => {
            party.guests.forEach((guest) => {
                if (!guest.willAttend && guest.foodPreferences && guest.alcoholPreference) {
                    alerts.push({
                        type: AlertType.ATTENDANCE_ERROR,
                        description: `${guest.firstName} ${guest.lastName} has food and alcohol preferences, but is not attending the wedding.`,
                    });
                }
            });
        });

        return alerts;
    };

    // Check for guests attending but not any specific event
    const checkEventAttendance = (): Alert[] => {
        const alerts: Alert[] = [];

        parties.forEach((party) => {
            party.guests.forEach((guest) => {
                if (guest.willAttend && !guest.willAttendReception && !guest.willAttendNuptials) {
                    alerts.push({
                        type: AlertType.ATTENDANCE_ERROR,
                        description: `${guest.firstName} ${guest.lastName} is marked as attending but not for reception or nuptials.`,
                    });
                }
            });
        });

        return alerts;
    };

    // Check for gifts assigned to the same email
    const checkGiftAssignments = (): Alert[] => {
        const alerts: Alert[] = [];
        const emailCounts: Record<string, number> = {};

        // gifts.forEach((gift) => {
        //     if (gift.assignedToEmail) {
        //         emailCounts[gift.assignedToEmail] = (emailCounts[gift.assignedToEmail] || 0) + 1;

        //         if (emailCounts[gift.assignedToEmail] === 3) {
        //             alerts.push({
        //                 type: AlertType.TOO_MANY_GIFTS,
        //                 description: `Email ${gift.assignedToEmail} is assigned to 3 or more gifts.`,
        //             });
        //         }
        //     }
        // });

        return alerts;
    };


    const checkForMissingGuests = (): Alert[] => {
        const alerts: Alert[] = [];
    
        parties.forEach((party) => {
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
    
            // If no guest name is found in the email, add an alert
            if (!containsGuestName) {
                alerts.push({
                    type: AlertType.MISSING_GUEST,
                    description: `Failed to find guest name in the parties email: ${party.email}. Registered guests: ${party.guests.map(guest => `${guest.firstName} ${guest.lastName}`)}`,
                });
            }
        });
    
        return alerts;
    };
    
    const checkForAttendingNotAttending = (): Alert[] => {
        const alerts: Alert[] = [];
        // CHECK IF ATTENDING WEDDING IS TRUE, BUT NUPTIALS IS FALSE.
        return alerts;
    };

    // Combine all alerts
    useEffect(() => {
        const allAlerts = [
            ...checkGuestDuplicates(),
            ...checkFoodAndAlcohol(),
            ...checkEventAttendance(),
            ...checkGiftAssignments(),
            ...checkForMissingGuests(),
        ];

        setAlerts(allAlerts);
    }, [parties, gifts]);

    useEffect(() => {
        const allAlerts = [
            ...checkGuestDuplicates(),
            ...checkFoodAndAlcohol(),
            ...checkEventAttendance(),
            ...checkGiftAssignments(),
            ...checkForMissingGuests(),
        ];

        setAlerts(allAlerts);
    }, []);

    return (
        <Card className="col-span-3 sm:col-span-2">
            <CardHeader className="pb-3">
                <CardDescription className="text-xs">Alerts</CardDescription>
                <CardTitle className="text-2xl">Review Alerts</CardTitle>
                <CardDescription>Alerts may be inaccurate. Disregard alerts that seem irrelevant.</CardDescription>
            </CardHeader>
            <CardContent>
                {alerts.length === 0 ? (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <p className="text-xl font-bold">Nothing here!</p>
                        <p className="text-sm text-muted-foreground">There are currently no alerts to display.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {alerts.map((alert, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-xs">{alert.type}</TableCell>
                                    <TableCell className="text-xs">{alert.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};
