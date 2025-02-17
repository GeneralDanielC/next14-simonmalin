import type { Metadata, Viewport } from "next";
import { Cormorant_SC, Nunito } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { southland } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { NavBar } from "./_components/navbar";
import { Toaster } from "sonner";
import { ContactWedding } from "@/components/contact-wedding";
import { Analytics } from "@vercel/analytics/react"

const cormorant = Cormorant_SC({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Malin & Simons Bröllop",
  description: "En hemsida för Malin & Simons bröllop",
};

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
  const maintenance = false;

  return (
    <html lang="sv">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={cn(cormorant.className, "font-light bg-beige min-h-screen flex flex-col")}>
        <NavBar />
        <main className="flex-grow">
          {maintenance ? (
            <div className="h-screen w-full flex flex-col justify-center items-center p-24 text-center">
              <h1 className="text-4xl">Underhåll!</h1>
              <h2>Just nu utför vi ett planerat underhåll för att göra er upplevelse ännu bättre. Kika igen lite senare.</h2>
              <div className="rounded-xl border border-black p-5 mt-10 flex flex-col">
                <p>Vid frågor</p>
                <a href={`mailto:daniel.carlsson@noll2.io`} className="underline">daniel.carlsson@noll2.io</a>
                <ContactWedding text={`${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`} />
              </div>
            </div>
          ) : children}
        </main>
        <Toaster
          toastOptions={{
            classNames: {
              success: "bg-card-beige border border-black",
              error: "bg-card-beige border border-black"
            }
          }}
        />
        <footer className="w-full relative overflow-hidden">
          <div className="flex w-[500%]">
            {Array.from({ length: 20 }).map((_, index) => (
              <Image
                key={index}
                src="/images/flowers.png"
                alt="flowers"
                width={400}
                height={200}
                className="object-contain"
              />
            ))}
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
