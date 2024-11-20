import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import { getPartyById } from "@/data/data";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { RSVPForm } from "../_components/rsvp-form";
import { EditRSVPContainer } from "../_components/edit-rsvp-container";
import { RSVPContainer } from "../_components/rsvp-container";

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
                {/* RSVP-form */}
                <RSVPContainer mode="editEntireParty" party={party} />
            </Skew>
        </div>
    );
}

export default OsaPage;