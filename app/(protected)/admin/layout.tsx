import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Navbar } from "./_components/navbar_old";
import "../../globals.css";
import { Sidebar } from "./_components/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const nunito = Nunito({ subsets: ["latin"] });

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="sv" className="h-screen w-full">
            <TooltipProvider>
                <body className={cn(nunito.className, "flex min-h-screen w-full flex-col bg-muted/40")}>
                    <Sidebar />
                    <main className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
                        {children}
                    </main>
                </body>
            </TooltipProvider>
        </html>
    );
}
