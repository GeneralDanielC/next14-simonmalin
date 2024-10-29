import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import { getPartyById } from "@/data/data";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { RSVPForm } from "../_components/rsvp-form";

// import { RSVPEditForm } from "../_components/rsvp-edit-form";

const OsaPage = async ({
    params
}: { params: { partyId: string } }) => {
    const { partyId } = params;
    const party = await getPartyById(partyId);

    if (!party) {
        return (
            <div>
                <HeroSection
                    subText="OSA"
                />
                <Skew
                    backgroundColor="bg-sky-700/30"
                >
                    <div className="h-full w-full flex flex-col justify-center items-center">
                        <h1 className={cn(southland.className, "text-3xl")}>Ajdå!</h1>
                        <p className="text-xs font-semibold">Någonting verkar ha gått fel.</p>
                        <p className="text-xs">Vi kunde inte hitta ditt sällskap.</p>
                    </div>
                </Skew>
            </div>
        );
    }

    return (
        <div>
            <HeroSection
                subText="OSA"
            />
            <Skew
                backgroundColor="bg-sky-700/30"
            >
                <h1 className={cn(southland.className, "text-3xl")}>Ändra dina val</h1>
                <p className="text-xs text-stone-500">Du kan ändra dina val fram till {process.env.NEXT_PUBLIC_END_RSVP_DATE}.</p>
                {/* RSVP-form */}
                <RSVPForm party={party} mode="editEntireParty" />
            </Skew>
        </div>
    );
}

export default OsaPage;