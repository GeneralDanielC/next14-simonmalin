import { HeroSection } from "@/components/hero-section";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Skew } from "@/components/skew";
import { OurStoryContent } from "./_components/our-story-content";

const OurStoryPage = () => {
    


    return (
        <div>
            <HeroSection heading="Vår Historia" />
            <Skew
                card={false}
                backgroundColor="bg-green"
            >
                <div className="text-stone-500 py-20">
                    <h1 className="text-4xl">Hur vi hamnade här</h1>
                </div>
            </Skew>
            <OurStoryContent />
        </div>
    );
}

export default OurStoryPage;