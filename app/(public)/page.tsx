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
      <Skew
        card={false}
        backgroundColor="bg-pink-600/10"
      >
        <div className="py-14 text-4xl text-stone-500">
          {/* <Countdown targetDate={new Date("2025-05-24")} /> */}
          <h1 className="text-2xl">Välkomna till</h1>
          <h1>Malin & Simons</h1>
          <h1>Bröllop</h1>
        </div>
      </Skew>

      <ModuleSection />

      <Skew
        backgroundColor="bg-sky-700/30"
        align="right"
        card={false}
        direction="bt"
      >
        <div className="text-stone-500 py-14">
          <Countdown targetDate={new Date("2025-05-24")} />
        </div>
      </Skew>
    </div>
  );
}
