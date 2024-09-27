import { cn } from "@/lib/utils"

interface SkewProps {
    children: React.ReactNode,
    secondaryChildren?: React.ReactNode,
    direction?: 'tb' | 'bt',
    align?: 'left' | 'right', //property to set where the main content should be
    backgroundColor: string,
}

export const Skew = ({
    children,
    secondaryChildren,
    direction = 'tb',
    align = 'left',
    backgroundColor,
}: SkewProps) => {
    return (
        <div className={cn(backgroundColor, direction === 'tb' ? "skew-y-6" : "-skew-y-6", "p-8 flex items-center")}>
            <div className={cn(direction === 'tb' ? "-skew-y-6" : "skew-y-6", align === 'left' ? "flex-row" : "flex-row-reverse", !secondaryChildren && "w-full", "flex justify-around items-center")}>
                <div className={cn(direction === 'tb' ? "skew-y-6" : "-skew-y-6", "bg-beige w-96 px-6 pb-10 pt-6 rounded-xl shadow-lg")}>
                    <div className={cn(direction === 'tb' ? "-skew-y-6" : "skew-y-6")}>
                        {children}
                    </div>
                </div>
                {secondaryChildren && (secondaryChildren)}
            </div>
        </div>
    )
}