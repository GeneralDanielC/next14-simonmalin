import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { RSVPForm } from "./_components/rsvp-form";
import { RSVPContainer } from "./_components/rsvp-container";
import { calculateTime } from "@/lib/calculate-time";

const OsaPage = () => {

    const endRSVPDate = process.env.NEXT_PUBLIC_END_RSVP_DATE;
    const diffMs = new Date().getTime() - new Date(endRSVPDate || "").getTime();

    console.log("DiffMs", diffMs);
    

    return (
        <div>
            <HeroSection
                heading="O.S.A."
                subtext={diffMs < 0 ? `${Math.abs(calculateTime({ diffMs }).days)} dagar kvar` : "försent"}
            />
            <Skew
                card={false}
                backgroundColor="bg-sky-700/30"
            >
                <div className="py-14 text-stone-500">
                    <h1 className="text-4xl">Kan vi räkna med dig?</h1>
                    <p>O.S.A. även om du inte kan komma!</p>
                    <p className="italic">Sista dagen är {endRSVPDate}</p>

                </div>
            </Skew>
            <div className="px-6 py-40 w-full flex justify-center items-center">
                <RSVPContainer mode="default" />
            </div>
            <Skew
                card={false}
                backgroundColor="bg-green"
                direction="bt"
            >
                <div className="py-14 text-stone-500">
                    <h1 className="text-4xl">Upplever du problem?</h1>
                    <p>Kontakta brudparet eller <a className="underline" href="mailto:daniel.carlsson@noll2.io">utvecklaren.</a></p>
                </div>
            </Skew>
        </div>
    );
}

export default OsaPage;