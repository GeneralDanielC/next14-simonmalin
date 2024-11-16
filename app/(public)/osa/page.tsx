import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { RSVPForm } from "./_components/rsvp-form";
import { RSVPContainer } from "./_components/rsvp-container";

const OsaPage = () => {

    return (
        <div>
            <HeroSection
                heading="OSA"
            />
            <Skew
                card={true}
                backgroundColor="bg-sky-700/30"
            >
                <RSVPContainer mode="default" />
            </Skew>
        </div>
    );
}

export default OsaPage;