"use client"

import {
    ChevronLeft,
    ChevronRight,
    File,
    ListFilter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { PartiesTable } from "@/components/admin/parties-table"
import { GuestTable } from "@/components/admin/guest-table"
import { PartyWithGuests } from "@/types"
import { NewPartyForm } from "./new-party-form"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import { useEffect, useState } from "react"
import { SortDropdown } from "@/components/sort-dropdown"
import { FilterGuestsDropdown } from "@/components/filter-guests-dropdown"
import { getLatestPartyUpdate } from "@/lib/parties"
import { ExportButton } from "./export-button"

interface PartiesGuestsTabsProps {
    parties: PartyWithGuests[]
}

export const PartiesGuestsTabs = ({
    parties: passedParties
}: PartiesGuestsTabsProps) => {
    const defaultTabValue = "parties"

    const [parties, setParties] = useState<PartyWithGuests[]>(passedParties);

    const [currentTab, setCurrentTab] = useState<string>(defaultTabValue);

    const handleChangeTab = (value: string) => {
        setCurrentTab(value)
    }

    return (
        <Tabs defaultValue={defaultTabValue} onValueChange={handleChangeTab}>
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="parties">Parties</TabsTrigger>
                    <TabsTrigger value="guests">Guests</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    {currentTab === defaultTabValue ? (
                        <div>
                            {/* <FilterGuestsDropdown parties={parties} /> */}
                            {/* <SortDropdown parties={parties} setParties={setParties} /> */}
                        </div>
                    ) : (
                        <div>
                            {/* <FilterGuestsDropdown parties={parties} setParties={setParties} /> */}
                            {/* Sort guests by name desc, asc */}
                        </div>
                    )}
                    {/* <DropdownMenu>
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
                            <DropdownMenuCheckboxItem checked>
                                None
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem>
                                Attending All
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Not Attending
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Only Nuptials
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                No Nuptials
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Only Reception
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                No Reception
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem>
                                Has Allergies
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                No Allergies
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem>
                                Prefer Alcohol
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Prefer Alcohol-free
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                    <ExportButton parties={parties} />
                </div>
            </div>
            <TabsContent value="parties">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col gap-y-1">
                                <CardTitle>Parties ({parties.length})</CardTitle>
                                <CardDescription className="flex flex-col gap-y-2">
                                    List of all parties.
                                    <span className="text-xs italic">Tip: Tap a row to view and edit.</span>
                                </CardDescription>
                            </div>
                            <NewPartyForm />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <PartiesTable parties={parties} />
                    </CardContent>
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                        <div className="text-xs text-muted-foreground">
                            Updated <time dateTime="2023-11-23">November 23, 2024</time>
                        </div>
                        <Pagination className="ml-auto mr-0 w-auto">
                            <PaginationContent>
                                <PaginationItem>
                                    <Button size="icon" variant="outline" className="h-6 w-6">
                                        <ChevronLeft className="h-3.5 w-3.5" />
                                        <span className="sr-only">Previous Order</span>
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <Button size="icon" variant="outline" className="h-6 w-6">
                                        <ChevronRight className="h-3.5 w-3.5" />
                                        <span className="sr-only">Next Order</span>
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="guests">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col gap-y-1">
                                <CardTitle>Guests</CardTitle>
                                <CardDescription className="flex flex-col gap-y-2">
                                    List of all guests.
                                    <span className="text-xs italic">Tip: Tap a row to view and edit.</span>
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <GuestTable parties={parties} />
                    </CardContent>
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                        <div className="text-xs text-muted-foreground">
                            Updated <time dateTime={new Date(getLatestPartyUpdate({ parties })).toLocaleDateString()}>{new Date(getLatestPartyUpdate({ parties })).toLocaleString("sv-se", { month: "long", day: "2-digit", year: "numeric" })}</time>
                        </div>
                        <Pagination className="ml-auto mr-0 w-auto">
                            <PaginationContent>
                                <PaginationItem>
                                    <Button size="icon" variant="outline" className="h-6 w-6">
                                        <ChevronLeft className="h-3.5 w-3.5" />
                                        <span className="sr-only">Previous Order</span>
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <Button size="icon" variant="outline" className="h-6 w-6">
                                        <ChevronRight className="h-3.5 w-3.5" />
                                        <span className="sr-only">Next Order</span>
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}