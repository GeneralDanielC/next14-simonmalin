import { southland } from "@/lib/fonts"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
    heading: string,
    subtext?: string,
    size?: "sm" | "default",
    className?: string,
}

export const HeroSection = ({
    heading,
    subtext,
    size = "default",
    className
}: HeroSectionProps) => {
    return (
        // <div className={cn(size === "sm" ? "py-20" : "py-40", "w-full", className)}>
        //     <div className={cn(southland.className, size === "sm" ? "text-6xl" : "text-8xl", "text-7xl sm:text-8xl flex justify-center items-center text-amber-900/40")}>
        //         {/* <span className="text-rose-300">Malin</span>
        //         <span className="text-stone-500"> & </span>
        //         <span className="text-dark-green">Simon</span> */}
        //         <span className="">Malin</span>
        //         <span className=""> & </span>
        //         <span className="">Simon</span>
        //     </div>
        //     <div className={"flex w-full justify-center font-thin text-md uppercase text-amber-900/60"}>{subText}</div>
        // </div>
        <div className="py-40 mt-10 w-full px-5 text-center">
            <h1 className={cn("font-thin text-4xl")}>{heading}</h1>
            <h2 className={cn("font-thin text-2xl text-stone-400")}>{subtext}</h2>
        </div>
    )
}