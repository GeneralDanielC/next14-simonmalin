import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import { getPartyById } from "@/data/data";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { RSVPContainer } from "../_components/rsvp-container";

const OsaPage = async ({
    params
}: { params: { partyId: string } }) => {
    const { partyId } = params;
    const party = await getPartyById(partyId);

    if (!party) {
        return (
            <div>
                <HeroSection
                    heading="O.S.A."
                    subtext="Ändra dina val"
                />
                <Skew
                    card={true}
                    backgroundColor="bg-sky-700/30"
                >
                    <div className="h-full w-full flex flex-col justify-center items-center">
                        <h1 className={cn(southland.className, "text-4xl")}>Ajdå!</h1>
                        <p className="font-semibold">Någonting verkar ha gått fel.</p>
                        <p className="">Vi kunde inte hitta ditt sällskap.</p>
                    </div>
                </Skew>
            </div>
        );
    }

    const endRSVPDate = process.env.NEXT_PUBLIC_END_RSVP_DATE;
    const diffMs = new Date().getTime() - new Date(endRSVPDate || "").getTime();

    return (
        <div>
            <HeroSection
                heading="O.S.A."
                subtext="Ändra dina val"
                // subtext={`${Math.abs(calculateTime({ diffMs }).days)} dagar kvar`}
            />
            <Skew
                card={false}
                backgroundColor="bg-sky-700/30"
            >
                <div className="py-14 text-stone-500">
                    <h1 className="text-4xl">Kommit på något?</h1>
                    <p>Det är ännu inte försent att ändra dig</p>
                    <p className="italic">Sista dagen är {endRSVPDate}</p>
                </div>
            </Skew>
            <div className="px-6 py-40 w-full flex justify-center items-center">
                <RSVPContainer mode="editEntireParty" party={party} />
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
        // <div>
        //     <HeroSection
        //         heading="O.S.A."
        //         subtext="Ändra dina val"
        //     />
        //     <Skew
        //         card={true}
        //         backgroundColor="bg-sky-700/30"
        //     >
        //         {/* RSVP-form */}
        //         <RSVPContainer mode="editEntireParty" party={party} />
        //     </Skew>
        // </div>
    );
}

export default OsaPage;