
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
                card={false}
                backgroundColor="bg-yellow-300/50"
            >
                <div className="text-stone-500 py-20">
                    <h1 className="text-4xl">Information</h1>
                    <h2>Hittat något du vill köpa? Läs informationen nedan</h2>
                </div>
            </Skew>
            <div className="py-36 w-full h-full flex flex-col gap-y-12 justify-center items-center px-6">
                <div className="flex flex-col max-w-[400px] gap-y-6 w-full p-4 rounded-xl shadow-lg bg-card-beige border border-black">
                    <h1 className="text-3xl text-center">Önskelista</h1>
                    <RegistryList gifts={gifts} />
                </div>
            </div>
            <Skew
                card={false}
                backgroundColor="bg-pink-600/10"
                direction="bt"
            >
                <div className="py-20 text-stone-500">
                    <h1 className="text-4xl">Upplever du problem?</h1>
                    <p>Kontakta brudparet eller <a className="underline" href="mailto:daniel.carlsson@noll2.io">utvecklaren.</a></p>
                </div>
            </Skew>
        </div>
    );
}

export default GiftRegistryPage;