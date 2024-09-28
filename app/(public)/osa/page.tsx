import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { RSVPForm } from "./_components/rsvp-form";

const OsaPage = () => {

    return (
        <div>
            <HeroSection
                subText="OSA"
            />
            <Skew
                backgroundColor="bg-sky-700/30"
            >
                <div className="flex flex-col mb-2">
                    <h1 className={cn(southland.className, "text-xl")}>OSA</h1>
                    <div>
                        <p className="text-xs text-stone-500">Här anger du de personer i ditt sällskap som kommer på bröllopet.</p>
                        <p className="text-xs text-stone-500">Sista dagen att OSA {process.env.NEXT_PUBLIC_END_RSVP_DATE}.</p>
                        <p>NÄR MAN HAR SKICKAT IN, BYTA RSVPFORM TILL EN BOCK OCH TEXT MED ATT DET HAR SKICKATS; HÅLLA KOLL PÅ MJEL; KOLLA SKRÄPPOST</p>
                    </div>
                </div>
                {/* RSVP-form */}
                <RSVPForm />
            </Skew>
        </div>
    );
}

export default OsaPage;