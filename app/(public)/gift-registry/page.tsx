import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const GiftRegistryPage = () => {
    return (
        <div>
            <HeroSection
                subText="Önskelista"
            />
            <Skew
                backgroundColor="bg-orange-700/30"
            >
                <h1 className={cn(southland.className, "text-xl")}>Önskelista</h1>
                {/* Gift registry list */}
                <div className="flex flex-col gap-y-1">
                    <div className="border-b border-black border-dotted">
                        <span className="text-xs">Kaffemaskin</span>
                    </div>
                    <div className="border-b border-black border-dotted">
                        <span className="text-xs">Blommor</span>
                    </div>
                    <div className="border-b border-black border-dotted">
                        <span className="text-xs">Krukor</span>
                    </div>
                    <div className="border-b border-black border-dotted">
                        <span className="text-xs">Absolut</span>
                    </div>
                </div>
                <div>
                    Pagnation <ArrowRight></ArrowRight>
                </div>
            </Skew>
        </div>
    );
}

export default GiftRegistryPage;