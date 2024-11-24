"use client";

import { motion } from "framer-motion";
import { Countdown } from "@/components/countdown";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { calculateTime } from "@/lib/calculate-time";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_APP_MAPBOX_KEY || "";

// Define animation variants for staggered fade-in
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.4, // Stagger effect by index
      duration: 0.9,
    },
  }),
};



export const ModuleSection = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const endRSVPDate = process.env.NEXT_PUBLIC_END_RSVP_DATE;
  const diffMs = new Date().getTime() - new Date(endRSVPDate || "").getTime();

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/dcarlsson/cm1gvrcwg003e01r2c1x01tt9',
        center: [18.090709486764048, 59.394866756208195], // Longitude, Latitude
        zoom: 12,
        attributionControl: false,
      });

      new mapboxgl.Marker({ color: 'pink' }).setLngLat([18.090709486764048, 59.394866756208195]).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div className="my-24 flex flex-col items-center justify-center w-full h-full overflow-hidden">
      <h1 className="text-4xl mb-10">Lite Information</h1>
      <motion.div className="flex flex-col flex-1 p-5 lg:px-10 gap-4 w-full max-w-screen-md">
        {/* Row 1 */}
        <motion.div
          className="flex flex-row h-32 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          custom={0} // Custom index for stagger effect
        >
          <Module
            heading="Räkna med mig!"
            subtext={`${Math.abs(calculateTime({ diffMs }).days)} dagar kvar`}
            showAction
            actionText="Till O.S.A."
            classNames="flex-1"
            href="/osa"
          />
          <Module
            heading="Toastmadames"
            showAction
            actionText="Till sidan"
            classNames="w-32 flex-1"
            href="/toastmadames"
          />
        </motion.div>

        {/* Row 2 */}
        <motion.div
          className="flex flex-row h-32 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          custom={1} // Stagger second card
        >
          <Module
            heading="Tid & Plats"
            showAction
            actionText="Visa"
            classNames="max-w-32 flex-1"
            href="/toastmadames"
          />
          <Module
            heading=""
            showAction
            showMap
            classNames="flex-1"
          />
        </motion.div>

        {/* Row 3 */}
        <motion.div
          className="flex flex-row gap-4 h-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          custom={2} // Stagger third card
        >
          <Module 
            heading="Mer info om bröllopet"
            subtext="24 maj 2025"
            showAction
            actionText="Till sidan"
            classNames="flex-1"
            href="/wedding-day"
          />
          <Module 
            heading="Önskelista"
            showAction
            actionText="Till sidan"
            classNames="w-32"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

interface ModuleProps {
  heading: string
  subtext?: string
  showAction: boolean
  actionText?: string
  showMap?: boolean
  href?: string
  classNames?: string
}

const Module = ({
  heading,
  subtext,
  showAction,
  actionText,
  showMap = false,
  href,
  classNames
}: ModuleProps) => {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/dcarlsson/cm1gvrcwg003e01r2c1x01tt9',
        center: [18.090709486764048, 59.394866756208195], // Longitude, Latitude
        zoom: 12,
        attributionControl: false,
      });

      new mapboxgl.Marker({ color: 'pink' }).setLngLat([18.090709486764048, 59.394866756208195]).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, []);

  const handleOnClick = () => {
    href && router.push(href);
  }

  if (showMap) {
    return (
      <motion.div className={cn("bg-stone-400/10 flex-1 rounded-xl shadow-lg border-4 border-stone-400/10 overflow-hidden", classNames)}>
        <div ref={mapContainerRef} style={{ borderRadius: "9px" }} className="w-full h-full rounded-lg overflow-hidden"></div>
      </motion.div>
    )
  }

  return (
    <motion.div className={cn("bg-stone-400/10 flex flex-col justify-between p-4 rounded-xl shadow-lg h-full hover:cursor-pointer", classNames)} onClick={handleOnClick}>
      <div className="flex flex-col">
        <span className="text-xl">{heading}</span>
        <span className="text-stone-500/80">{subtext}</span>
      </div>
      {showAction && (
        <div className="flex flex-row justify-between items-center text-stone-500/80">
          <span>{actionText}</span>
          <ArrowRight className="size-5" />
        </div>
      )}
    </motion.div>
  )
}



