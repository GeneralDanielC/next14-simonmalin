"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TimelineItem {
    time: string
    heading: string
    description: string
    address: string
}

interface TimelineProps {
    items: TimelineItem[]
}

export const Timeline = ({
    items,
}: TimelineProps) => {
    return (
        <div className="flex flex-col h-full gap-y-3">
            {items.map((item) => (
                <TimelineItem item={item} />
            ))}
        </div>
    )
}

const TimelineItem = ({
    item
}: { item: TimelineItem }) => {

    return (
        <Link href={`https://maps.google.com/?q=${item.address}`} target="_blank">
            <div className="flex flex-row h-full gap-x-4 hover:cursor-pointer">
                {/* Left */}
                <div className="flex flex-col h-full justify-center items-center gap-y-2">
                    <div className="size-5 rounded-full border border-black"></div>
                    <Separator orientation="vertical" className="h-[55px] bg-black" />
                </div>
                {/* Right */}
                <div className="flex flex-col h-full">
                    <span className="text-stone-500">{item.time}</span>
                    <h2 className="text-2xl">{item.heading}</h2>
                    <h3>{item.description}</h3>
                </div>
            </div>
        </Link>
    )
}