"use client";

import { motion } from "framer-motion";
import { Countdown } from "@/components/countdown";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { calculateTime } from "@/lib/calculate-time";

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

  const endRSVPDateString = new Date(endRSVPDate || "").toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/dcarlsson/cm1gvrcwg003e01r2c1x01tt9',
        center: [18.0649, 59.3326], // Longitude, Latitude
        zoom: 10,
        attributionControl: false,
      });

      new mapboxgl.Marker({ color: 'pink' }).setLngLat([18.153315, 59.343966]).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div className="my-24 flex flex-col items-center justify-center w-full h-full overflow-hidden">
      <motion.div className="flex flex-col flex-1 p-5 lg:px-10 gap-4 w-full max-w-screen-md">
        {/* Card 1 */}
        <motion.div
          className="flex flex-row h-32 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          custom={0} // Custom index for stagger effect
        >
          <motion.div className="bg-rose-300/20 flex flex-col justify-center items-center p-2 flex-1 rounded-xl shadow-lg h-full">
            <Countdown targetDate={new Date("2025-05-24 00:00:00")} />
          </motion.div>
          <motion.div className="bg-stone-400/10 w-32 rounded-xl flex flex-col gap-y-2 shadow-lg p-4">
            <p className="text-xs font-semibold">Sista dagen att OSA</p>
            <div className="flex flex-row gap-x-2 items-baseline">
              <p className="text-xl">{Math.abs(calculateTime({ diffMs }).days)}</p>
              <p className="text-xs">dagar kvar</p>
            </div>
            <p className="text-xs">{endRSVPDateString}</p>
          </motion.div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="flex flex-row h-32 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          custom={1} // Stagger second card
        >
          <motion.div className="bg-stone-400/10 w-32 flex-none flex flex-col gap-y-2 rounded-xl shadow-lg p-4">
            <p className="text-xs font-semibold">Tid & Plats</p>
            <div className="text-xs">
              <p className="text-lg">11:00</p>
            </div>
            <div className="text-xs">
              <p>Honungsgatan 40</p>
              <p>752 55 Uppsala</p>
            </div>
          </motion.div>
          <motion.div className="bg-stone-400/10 flex-1 rounded-xl shadow-lg border-4 border-stone-400/10 overflow-hidden">
            <div ref={mapContainerRef} style={{ borderRadius: "9px" }} className="w-full h-full rounded-lg overflow-hidden"></div>
          </motion.div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="flex flex-row gap-4 h-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          custom={2} // Stagger third card
        >
          <motion.div className="bg-stone-400/10 w-full rounded-xl shadow-lg p-4">
            <p className="text-xs font-semibold">Klädkod</p>
          </motion.div>
          <motion.div className="bg-stone-400/10 w-full rounded-xl shadow-lg p-4">
            <p className="text-xs font-semibold">Information</p>
          </motion.div>
          <motion.div className="bg-stone-400/10 w-full rounded-xl shadow-lg p-4">
            <p className="text-xs font-semibold">Information</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
