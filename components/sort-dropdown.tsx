"use client"

import { ArrowDownAZ } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Guest, Party } from "@prisma/client"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useEffect, useState } from "react"
import { sortPartiesByAttendingFirst, sortPartiesByAttendingLast } from "@/lib/sort"
import { PartyWithGuests } from "@/types"

interface SortDropdownProps {
    parties?: PartyWithGuests[]
    guests?: Guest[]
}

type Checked = DropdownMenuCheckboxItemProps["checked"]

export const SortDropdown = ({
    parties,
    guests
}: SortDropdownProps) => {
    if (!parties && !guests) return <div>err</div>

    const [sortedItems, setSortedItems] = useState<Party[] | Guest[] | undefined>(parties || guests)

    const [noSort, setNoSort] = useState<Checked>(true);
    const [showAttendingFirst, setShowAttendingFirst] = useState<Checked>(false);
    const [showAttendingLast, setShowAttendingLast] = useState<Checked>(false);


    // Handle filter changes: Only one filter can be active at a time
    const handleFilterChange = (filter: "none" | "attendingDesc" | "attendingAsc") => {
        if (filter === "none") {
            setNoSort(true);
            setShowAttendingFirst(false);
            setShowAttendingLast(false);

            setSortedItems(parties || guests); // Reset to all gifts
        } else if (filter === "attendingDesc") {
            setNoSort(false);
            setShowAttendingFirst(true);
            setShowAttendingLast(false);

            // setSortedItems(sortPartiesByAttendingFirst({ parties }));
        } else if (filter === "attendingAsc") {
            setNoSort(false);
            setShowAttendingFirst(false);
            setShowAttendingLast(true);

            // setSortedItems(sortPartiesByAttendingLast({ parties }));
        }
    };

    useEffect(() => {
        // This ensures that the effect applies only if the user manually deselects all filters
        if (noSort) {
            setSortedItems(parties || guests);
        }
    }, [noSort, parties, guests]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                >
                    <ArrowDownAZ className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Sort</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={noSort}
                    onCheckedChange={() => handleFilterChange("none")}
                >
                    None
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={showAttendingFirst}
                    onCheckedChange={() => handleFilterChange("attendingDesc")}
                >
                    Attending Desc
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={showAttendingLast}
                    onCheckedChange={() => handleFilterChange("attendingAsc")}
                >
                    Attending Asc
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}