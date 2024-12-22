"use client"

import { ListFilter } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PartyWithGuests } from "@/types";
import { useEffect, useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { filterGuestsByNotAttending } from "@/lib/filter";

interface FilterGuestsDropdownProps {
    parties: PartyWithGuests[];
    setParties: (parties: PartyWithGuests[]) => void;
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

export const FilterGuestsDropdown = ({
    parties: initialParties,
    setParties,
}: FilterGuestsDropdownProps) => {
    const [filters, setFilters] = useState({
        noFilter: true,
        showAttendingAll: false,
        showNotAttending: false,
        showOnlyNuptials: false,
        showNoNuptials: false,
        showOnlyReception: false,
        showNoReception: false,
        showHasAllergies: false,
        showNoAllergies: false,
        showPreferAlcohol: false,
        showPreferAlcoholFree: false,
    });

    const applyFilters = () => {
        let filtered = [...initialParties];

        if (filters.noFilter) {
            setParties(initialParties);
            return;
        }

        if (filters.showNotAttending) {
            filtered = filterGuestsByNotAttending({ parties: filtered });
        }

        // Add similar filter conditions here for other filters...
        // Example:
        // if (filters.showAttendingAll) {
        //    filtered = filterGuestsByAttendingAll({ parties: filtered });
        // }

        setParties(filtered);
    };

    const handleFilterChange = (filterKey: keyof typeof filters) => {
        const updatedFilters = { ...filters, [filterKey]: !filters[filterKey] };

        if (filterKey === "noFilter") {
            updatedFilters.noFilter = true;
            Object.keys(updatedFilters).forEach((key) => {
                if (key !== "noFilter") {
                    updatedFilters[key as keyof typeof filters] = false;
                }
            });
        } else {
            updatedFilters.noFilter = false;
        }

        setFilters(updatedFilters);
    };

    useEffect(() => {
        applyFilters();
    }, [filters, initialParties]);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={filters.noFilter}
                    onCheckedChange={() => handleFilterChange("noFilter")}
                >
                    None
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={filters.showNotAttending}
                    onCheckedChange={() => handleFilterChange("showNotAttending")}
                >
                    Not Attending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={filters.showAttendingAll}
                    onCheckedChange={() => handleFilterChange("showAttendingAll")}
                >
                    Attending All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={filters.showOnlyNuptials}
                    onCheckedChange={() => handleFilterChange("showOnlyNuptials")}
                >
                    Only Nuptials
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={filters.showNoNuptials}
                    onCheckedChange={() => handleFilterChange("showNoNuptials")}
                >
                    No Nuptials
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={filters.showOnlyReception}
                    onCheckedChange={() => handleFilterChange("showOnlyReception")}
                >
                    Only Reception
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={filters.showNoReception}
                    onCheckedChange={() => handleFilterChange("showNoReception")}
                >
                    No Reception
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={filters.showHasAllergies}
                    onCheckedChange={() => handleFilterChange("showHasAllergies")}
                >
                    Has Allergies
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={filters.showNoAllergies}
                    onCheckedChange={() => handleFilterChange("showNoAllergies")}
                >
                    No Allergies
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={filters.showPreferAlcohol}
                    onCheckedChange={() => handleFilterChange("showPreferAlcohol")}
                >
                    Prefer Alcohol
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={filters.showPreferAlcoholFree}
                    onCheckedChange={() => handleFilterChange("showPreferAlcoholFree")}
                >
                    Prefer Alcohol-free
                </DropdownMenuCheckboxItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}