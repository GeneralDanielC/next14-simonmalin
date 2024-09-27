import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModuleSection } from "./_components/module-section";

export default async function Home() {

  return (
    <div>
      {/* Hero-section */}
      <HeroSection subText="Bröllop" />
      <Skew
        backgroundColor="bg-rose-300/10"
      // secondaryChildren={
      //   <>
      //     <div className="bg-slate-50">
      //       +
      //     </div>
      //   </>
      // }
      >
        <h2 className={cn(southland.className, "text-3xl text-rose-400")}>Välkommen</h2>
        <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus, nisi vel luctus auctor, magna ex pretium nisi, quis commodo orci leo at leo. In sit amet felis libero. Aliquam placerat tellus nibh, a convallis nibh laoreet ac.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus, nisi vel luctus auctor, magna ex pretium nisi, quis commodo orci leo at leo. In sit amet felis libero. Aliquam placerat tellus nibh, a convallis nibh laoreet ac.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus, nisi vel luctus auctor, magna ex pretium nisi.
        </p>
        <Link href="" className="text-xs font-semibold">Läs mer...</Link>
      </Skew>

      <ModuleSection />

      <Skew
        backgroundColor="bg-lime-700/10"
        align="right"
        direction="bt"
      >
        <h2 className={cn(southland.className, "text-3xl text-lime-700/60")}>Vår historia</h2>
        <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus, nisi vel luctus auctor, magna ex pretium nisi, quis commodo orci leo at leo. In sit amet felis libero. Aliquam placerat tellus nibh, a convallis nibh laoreet ac.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus, nisi vel luctus auctor, magna ex pretium nisi, quis commodo orci leo at leo. In sit amet felis libero. Aliquam placerat tellus nibh, a convallis nibh laoreet ac.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus, nisi vel luctus auctor, magna ex pretium nisi.
        </p>
        <Link href="" className="text-xs font-semibold">Läs mer...</Link>
      </Skew>
    </div>
  );
}
