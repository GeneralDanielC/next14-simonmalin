import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import { Separator } from "@/components/ui/separator";
import { Timeline } from "./_components/timeline";
import { AddressCardDetails } from "@/components/modals/address-modal";

const WeddingDayPage = () => {

    const timelineItems: AddressCardDetails[] = [
        {
            time: "15:00",
            heading: "Vigsel",
            description: "Djursholms kapell",
            mapSettings: {
                coordinates: [59.394866756208195, 18.090709486764048]
            },
            street: "Danavägen 9",
            postalCode: "182 60",
            city: "Djursholm",
        },
        {
            time: "16:00",
            heading: "Båtfärd till Ekensdal",
            description: "Ekudden, Djursholm",
            mapSettings: {
                coordinates: [59.390066456177344, 18.090977310922415]
            },
            street: "Ekudden",
            postalCode: "182 60",
            city: "Djursholm",
        },
        {
            time: "17:00",
            heading: "Ankomst och mingel",
            description: "Ekensdal, Nacka",
            mapSettings: {
                coordinates: [59.33258913266237, 18.205240166907075]
            },
            street: "Skurusundsvägen 151",
            postalCode: "131 46",
            city: "Nacka",
        },
        {
            time: "17:30",
            heading: "Till bords",
            description: "Ekensdal, Nacka",
            mapSettings: {
                coordinates: [59.33258913266237, 18.205240166907075]
            },
            street: "Skurusundsvägen 151",
            postalCode: "131 46",
            city: "Nacka",
        },
    ]

    return (
        <div>
            <HeroSection heading="24 maj 2025" subtext="Bröllopsdagen" />
            <Skew
                card={false}
                backgroundColor="bg-pink-600/10"
            >
                <div className="text-stone-500 py-20">
                    <h1 className="text-4xl">Information</h1>
                    <h2>Så här kommer dagen att se ut</h2>
                </div>
            </Skew>
            <div className="py-36 w-full h-full flex flex-col gap-y-12 justify-center items-center">
                <Timeline items={timelineItems} />
                <span className="text-xs">Klicka för att visa detaljer</span>
                <div>
                    <span className="text-3xl tracking-widest text-stone-500">•••</span>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-y-6">
                    <h2 className="text-3xl">Praktisk information</h2>
                    <div className="flex flex-col gap-y-3 w-full h-full justify-center items-center px-10">
                        <div className="grid grid-cols-[0.5fr,auto,1fr] max-w-[500px] gap-5">
                            <h2 className="text-right">Klädsel</h2>
                            <Separator orientation="vertical" className="min-h-10 bg-black" />
                            <p>Smoking</p>
                            <h2 className="text-right">Barn</h2>
                            <Separator orientation="vertical" className="min-h-10 bg-black" />
                            <p>Barn är välkomna på vår vigsel men middagen och festen är för de vuxna.</p>
                            <h2 className="text-right">Fotograf</h2>
                            <Separator orientation="vertical" className="min-h-10 bg-black" />
                            <p>Dagen och kvällen kommer att förevigas av fotograf Sofia Söderlund så det är inget måste att ta bilder under dagen.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Skew
                card={false}
                backgroundColor="bg-yellow-300/50"
                direction="bt"
            >
                <div className="text-stone-500 py-20">
                    <h1 className="text-4xl">Frågor?</h1>
                    <h2>Kontakta brudparet</h2>
                </div>
            </Skew>

        </div>
    );
}

export default WeddingDayPage;