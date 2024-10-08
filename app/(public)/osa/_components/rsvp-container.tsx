"use client";

import { cn } from "@/lib/utils";
import { southland } from "@/lib/fonts";

import { RSVPForm } from "./rsvp-form";
import { useState } from "react";
import { Check, X } from "lucide-react";

export const RSVPContainer = () => {
    const [success, setSuccess] = useState<boolean>(false);

    const latestDateToRsvp = process.env.NEXT_PUBLIC_END_RSVP_DATE;

    const tooLateToRSVP = () => {
        return new Date().getTime() > new Date(latestDateToRsvp ?? "").getTime();
    }

    const [tooLate, setTooLate] = useState<boolean>(tooLateToRSVP())

    return (
        <>
            {tooLate ? (
                <div className="flex flex-col justify-center items-center pt-4">
                    <h1 className={cn(southland.className, "font-semibold text-5xl text-amber-900/40")}>För sent att OSA</h1>
                    <p className="text-xs">Tyvärr har sista datumet för att OSA passerat.</p>
                </div>
            ) : success ? (
                <div className="flex flex-col justify-center items-center">
                    <Check className="size-40 text-lime-600/30" />
                    <h1 className={cn(southland.className, "font-semibold text-5xl text-amber-900/40")}>Sparat</h1>
                    <p className="text-xs">En bekräftelse har skickats till din angivna mejl.</p>
                    <i className="text-xs">Kolla skräpposten.</i>
                </div>
            ) : (
                <div>
                    <div className="flex flex-col mb-2">
                        <h1 className={cn(southland.className, "text-xl")}>OSA</h1>
                        <div>
                            <p className="text-xs text-stone-500">Här anger du de personer i ditt sällskap som kommer på bröllopet.</p>
                            <p className="text-xs text-stone-500">Sista dagen att OSA är {latestDateToRsvp}.</p>
                        </div>
                    </div>
                    {/* RSVP form component */}
                    <RSVPForm setSuccess={setSuccess} />
                </div>
            )}
        </>
    );
};