"use client";

import { cn } from "@/lib/utils";
import { southland } from "@/lib/fonts";

import { RSVPForm } from "./rsvp-form";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { PartyWithGuests } from "@/types";

interface RSVPContainerProps {
    party?: PartyWithGuests
    mode: "default" | "editEntireParty"
}

export const RSVPContainer = ({
    party,
    mode = "default"
}: RSVPContainerProps) => {
    const [success, setSuccess] = useState<boolean>(false);

    const latestDateToRsvp = process.env.NEXT_PUBLIC_END_RSVP_DATE;

    const tooLateToRSVP = () => {
        return new Date().getTime() > new Date(latestDateToRsvp ?? "").getTime();
    }

    return (
        <div className={cn(tooLateToRSVP() && "flex flex-col justify-center items-center", "h-full border border-black p-6 rounded-xl shadow-lg bg-card-beige max-w-[400px] w-full")}>
            {tooLateToRSVP() ? (
                <div className="w-full h-full">
                    <h1 className="text-2xl">Försent</h1>
                    <h2 className="text-stone-500">Det är försent för att O.S.A.</h2>
                    <p className="text-stone-500">Kontakta brudparet vid frågor.</p>
                </div>
            ) : success ? (
                <div>
                    <h1 className="text-2xl">O.S.A.</h1>
                    <h2 className="text-stone-500">Dina val är sparade!</h2>
                    <p className="text-stone-500 text-xs">En bekräftelse har skickats till den angivna epostadressen. Kolla skräpposten.</p>
                </div>
            ) : (
                <div>
                    <h1 className="text-2xl text-center">O.S.A.</h1>
                    {mode === "editEntireParty" && <h2 className="text-stone-500 text-center">Ändra dina val</h2>}
                    {mode === "editEntireParty" ? (
                        <RSVPForm setSuccess={setSuccess} party={party} mode="editEntireParty" />
                    ) : (
                        <RSVPForm setSuccess={setSuccess} />
                    )}
                </div>
            )}
        </div>
    );
};