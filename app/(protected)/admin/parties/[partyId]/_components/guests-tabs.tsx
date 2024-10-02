"use client";

import {
    File,
    ListFilter,
    Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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

import { GuestTable } from "@/components/admin/guest-table"
import { PartySettings } from "../../_components/party-settings"
import { PartyWithGuests } from "@/types";
import { NewGuestForm } from "./new-guest-form";

interface GuestsTabsProps {
    party: PartyWithGuests
}

export const GuestsTabs = ({
    party
}: GuestsTabsProps) => {
    return (
        <Tabs defaultValue="guests">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="guests">Guests</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
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
                            <DropdownMenuCheckboxItem checked>
                                Fulfilled
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Declined
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Refunded
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-sm"
                        disabled
                    >
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                </div>
            </div>
            <TabsContent value="guests">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col gap-y-1">
                                <CardDescription className="text-xs">{party.email}</CardDescription>
                                <CardTitle>Guests</CardTitle>
                                <CardDescription className="flex flex-col gap-y-2">
                                    Guests in this party.
                                    <span className="text-xs italic">Tip: Tap a row to view and edit.</span>
                                </CardDescription>
                            </div>
                            <div className="flex flex-col justify-between gap-y-2">
                                <NewGuestForm partyId={party.id} />
                                <Button asChild variant={"secondary"} className="text-xs">
                                    <a href={`mailto:${party.email}`}>
                                        Email Party
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <GuestTable party={party} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="settings">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col gap-y-1">
                                <CardDescription className="text-xs">{party.email}</CardDescription>
                                <CardTitle>Settings</CardTitle>
                                <CardDescription className="flex flex-col gap-y-2">
                                    Options for this party.
                                </CardDescription>
                            </div>
                            <Button asChild variant={"secondary"} className="text-xs">
                                <a href={`mailto:${party.email}`}>
                                    Email Party
                                </a>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <PartySettings party={party} />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
