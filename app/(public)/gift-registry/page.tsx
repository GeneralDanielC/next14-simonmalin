
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { southland } from "@/lib/fonts";

import { getGifts } from "@/data/data";

import { Skew } from "@/components/skew";
import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { RegistryList } from "./_components/registry-list";

const GiftRegistryPage = async () => {
    const gifts = await getGifts();

    return (
        <div>
            <HeroSection
                heading="Önskelista"
            />
            <Skew
                card={true}
                backgroundColor="bg-orange-700/30"
            >
                <h1 className={cn(southland.className, "text-2xl")}>Önskelista</h1>
                {/* Gift registry list */}
                <RegistryList gifts={gifts} />
            </Skew>
        </div>
    );
}

export default GiftRegistryPage;