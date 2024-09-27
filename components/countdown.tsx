"use client";

import { calculateTime } from "@/lib/calculate-time";
import { useEffect, useState } from "react";

interface CountdownProps {
    targetDate: Date;
}

export const Countdown = ({ targetDate }: CountdownProps) => {
    const [time, setTime] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);
    const [countingUp, setCountingUp] = useState(false);

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const targetTime = new Date(targetDate).getTime();
            const diffMs = targetTime - now;

            if (diffMs >= 0) {
                // Countdown to the date
                setCountingUp(false);
                setTime(calculateTime({ diffMs }));
            } else {
                setCountingUp(true);
                setTime(calculateTime({ diffMs: Math.abs(diffMs) }));
            }
        }

        updateCountdown();

        const intervalId = setInterval(updateCountdown, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [targetDate]);

    if (!time) return <p>no</p>

    return (
        <div className="flex flex-col justify-center items-center text-center w-full h-full text-stone-500">
            <div className="flex flex-row items-baseline justify-center gap-x-1.5">
                <span className="text-4xl">{time.days}</span>
                <span className="text-xs">dagar</span>
            </div>
            <div className="flex flex-row items-baseline justify-center gap-x-2 mb-2">
                <div className="flex flex-row items-baseline justify-center gap-x-1.5">
                    <span className="text-2xl">{time.hours}</span>
                    <span className="text-xs">timmar</span>
                </div>
                <div className="flex flex-row items-baseline justify-center gap-x-1.5">
                    <span className="text-2xl">{time.minutes}</span>
                    <span className="text-xs">minuter</span>
                </div>
                <div className="flex flex-row items-baseline justify-center gap-x-1.5">
                    <span className="text-2xl">{time.seconds}</span>
                    <span className="text-xs">sekunder</span>
                </div>
            </div>
            <em className="text-xs">{countingUp ? "Tid sedan bröllopet." : "Tid till bröllopet."}</em>
        </div>
    )

}