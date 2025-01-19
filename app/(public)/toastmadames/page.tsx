import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import Image from "next/image";

const ToastMadamesPage = () => {
    return (
        <div>
            {/* Hero-section */}
            <HeroSection heading="Toastmadames" />
            <Skew
                card={false}
                backgroundColor="bg-pink-600/10"
            >
                <div className="text-stone-500 py-20">
                    <h1 className="text-4xl">Se våra underbara toastmadames</h1>
                    <h2>Madde Lehander och Ebba Jernbeck</h2>
                </div>
            </Skew>
            <div className="py-36 w-full h-full flex flex-col gap-y-12 justify-center items-center">
                <div className="max-w-[400px] w-full px-6">
                    <h2 className="text-4xl mb-2">Madde & Ebba</h2>
                    <p>För att hålla kvällen fylld av skratt, fina tal och roliga inslag har vi två fantastiska toastmadames: Malins kusiner Madde och Ebba!</p>
                    <br />
                    <p>Har ni något att säga under middagen eller vill bidra med ett inslag? Kontakta dem i förväg så hjälper de till att göra kvällen minnesvärd.</p>
                </div>
                {/* images-section */}
                <div className="max-w-[400px] flex flex-col gap-y-2 justify-center items-center px-6 h-auto">
                    <Image
                        src="/images/our-story/toastmadames.jpg"
                        className="rounded-md shadow-lg"
                        width={400}
                        height={400}
                        alt="Malin & Simon"
                    />
                </div>
            </div>
            <Skew
                backgroundColor="bg-sky-700/30"
                align="right"
                card={false}
                direction="bt"
            >
                <div className="text-stone-500 py-20">
                    <h1 className="text-4xl">Kontakt</h1>
                    <a href={`mailto:${process.env.NEXT_PUBLIC_TOASTMADAMES_EMAIL}`} className="underline">{process.env.NEXT_PUBLIC_TOASTMADAMES_EMAIL}</a>
                </div>
            </Skew>
        </div>
    );
}

export default ToastMadamesPage;