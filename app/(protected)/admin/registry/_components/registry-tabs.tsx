"use client"

import { File, ListFilter } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { NewGiftForm } from "./new-gift-form"
import { GiftsTable } from "./gifts-table"
import { Gift } from "@prisma/client"
import { useEffect, useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { filterGiftsByHidden, filterGiftsByIsAssigned, filterGiftsByIsNotAssigned, filterGiftsByVisible } from "@/lib/filter"
import { GiftWithAssignments } from "@/types"
import { exportGiftsToExcel } from "@/lib/excel"

interface RegistryTabsProps {
    gifts: GiftWithAssignments[],
}

type Checked = DropdownMenuCheckboxItemProps["checked"]

export const RegistryTabs = ({ gifts }: RegistryTabsProps) => {
    const [filteredGifts, setFilteredGifts] = useState<GiftWithAssignments[]>(gifts);

    const [noFilter, setNoFilter] = useState<Checked>(true);
    const [showAssigned, setShowAssigned] = useState<Checked>(false);
    const [showNotAssigned, setShowNotAssigned] = useState<Checked>(false);
    const [showHidden, setShowHidden] = useState<Checked>(false);
    const [showVisible, setShowVisible] = useState<Checked>(false);


    // Handle filter changes: Only one filter can be active at a time
    const handleFilterChange = (filter: "none" | "assigned" | "notAssigned" | "hidden" | "visible") => {
        switch (filter) {
            case "none":
                setNoFilter(true);
                setShowAssigned(false);
                setShowNotAssigned(false);
                setShowHidden(false);
                setShowVisible(false);

                setFilteredGifts(gifts); //reset to all gifts
                break
            case "assigned":
                setNoFilter(false);
                setShowAssigned(true);
                setShowNotAssigned(false);
                setShowHidden(false);
                setShowVisible(false);

                setFilteredGifts(filterGiftsByIsAssigned({ gifts }));
                break
            case "notAssigned":
                setNoFilter(false);
                setShowAssigned(false);
                setShowNotAssigned(true);
                setShowHidden(false);
                setShowVisible(false);

                setFilteredGifts(filterGiftsByIsNotAssigned({ gifts }));
                break
            case "hidden":
                setNoFilter(false);
                setShowAssigned(false);
                setShowNotAssigned(false);
                setShowHidden(true);
                setShowVisible(false);

                setFilteredGifts(filterGiftsByHidden({ gifts }));
                break
            case "visible":
                setNoFilter(false);
                setShowAssigned(false);
                setShowNotAssigned(false);
                setShowHidden(false);
                setShowVisible(true);

                setFilteredGifts(filterGiftsByVisible({ gifts }));
                break
            default:
                break;
        }
        if (filter === "none") {
            setNoFilter(true);
            setShowAssigned(false);
            setShowNotAssigned(false);

            setFilteredGifts(gifts); // Reset to all gifts
        } else if (filter === "assigned") {
            setNoFilter(false);
            setShowAssigned(true);
            setShowNotAssigned(false);

            setFilteredGifts(filterGiftsByIsAssigned({ gifts }));
        } else if (filter === "notAssigned") {
            setNoFilter(false);
            setShowAssigned(false);
            setShowNotAssigned(true);

            setFilteredGifts(filterGiftsByIsNotAssigned({ gifts }));
        }
    };

    useEffect(() => {
        // This ensures that the effect applies only if the user manually deselects all filters
        if (noFilter) {
            setFilteredGifts(gifts);
        }
    }, [noFilter, gifts]);

    return (
        <Tabs defaultValue="gifts" className="max-w-full">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="gifts">Gift Registry</TabsTrigger>
                    {/* <TabsTrigger value="approval">Approvals</TabsTrigger> */}
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
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
                                checked={noFilter}
                                onCheckedChange={() => handleFilterChange("none")}
                            >
                                None
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showAssigned}
                                onCheckedChange={() => handleFilterChange("assigned")}
                            >
                                Assigned
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showNotAssigned}
                                onCheckedChange={() => handleFilterChange("notAssigned")}
                            >
                                Not Assigned
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showHidden}
                                onCheckedChange={() => handleFilterChange("hidden")}
                            >
                                Hidden
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showVisible}
                                onCheckedChange={() => handleFilterChange("visible")}
                            >
                                Visible
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-sm"
                        onClick={() => exportGiftsToExcel(gifts)}
                    >
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                </div>
            </div>
            <TabsContent value="gifts">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col gap-y-1">
                                <CardTitle>Gift Registry</CardTitle>
                                <CardDescription className="flex flex-col gap-y-2">
                                    List of all gifts in the registry.
                                    <span className="text-xs italic">Tip: Tap a row to view and edit.</span>
                                </CardDescription>
                            </div>
                            <NewGiftForm />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <GiftsTable gifts={filteredGifts} />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
