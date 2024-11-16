import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModuleSection } from "./_components/module-section";
import Image from "next/image";
import { Countdown } from "@/components/countdown";

export default async function Home() {

  return (
    <div>
      {/* Hero-section */}
      <HeroSection heading="Bröllop" subtext="24 maj 2025" />
      <Skew card={false} backgroundColor="bg-green">
        <div className="py-14">
          <Countdown targetDate={new Date("2025-05-24")} />
        </div>
      </Skew>

      <ModuleSection />

      <Skew
        backgroundColor="bg-sky-600/30"
        align="right"
        card={false}
        direction="bt"
      >
        <div className="text-stone-500 py-14">
          <h1 className="text-4xl">Frågor?</h1>
          <p>hör av dig till brudparet.</p>
        </div>
      </Skew>
    </div>
  );
}
