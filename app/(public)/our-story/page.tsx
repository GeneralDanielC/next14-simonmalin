import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";

const OurStoryPage = () => {
    return (
        <div>
            <HeroSection subText="Vår Historia" />
            <Skew
                direction="bt"
                backgroundColor="bg-green-700/10"
            >
                <h1 className="text-stone-400">13 mars 2018</h1>
                <p>Lorem ipsum</p>
            </Skew>
            <div className="w-full flex flex-col justify-center items-center py-16">
                <p>dasda</p>
                <p>någon bild kankse</p>
            </div>
            <Skew
                backgroundColor="bg-pink-500/10"
            >
                <h1 className="text-stone-400">5 juli 2023</h1>
                <p>dadslasdköa</p>
            </Skew>
            <div className="w-full flex flex-col justify-center items-center py-16">
                <p>dasda</p>
                <p>någon bild kankse</p>
            </div>
        </div>
    );
}

export default OurStoryPage;