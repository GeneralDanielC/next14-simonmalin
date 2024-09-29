import {
    File,
    ListFilter,
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


import { Navbar } from "../_components/navbar";
import { getParties, getPartyById } from "@/data/data"

import { SpecialFoodCard } from "@/components/admin/special-food-card"
import { AttendanceCard } from "@/components/admin/attendance-card"
import { AlcoholFreeCard } from "@/components/admin/alcohol-free-card"
import { GuestTable } from "@/components/admin/guest-table"
import { PartiesTable } from "@/components/admin/parties-table"

{/* <div className="w-full h-full flex flex-col py-10">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            
            Admin Dashboard
            <p>Varna för dubbletter. Kolla på namn & efternamn.</p>
            <p>Visa de som har fyllt i allergier / alkoholpreferens om de kommer eller inte. Kommer de inte bör dessa tas bort, det borde finnas en netto räknare som räknar alla som ska ha alkohol som kommer etc.</p>
        </div> */}

const PartiesPage = async () => {

    const parties = await getParties();

    if (!parties) return <p>Something went wrong!</p>

    const breadcrumbs = [
        {
            title: "Dashboard",
            href: "/admin/dashboard",
        },
        {
            title: "Parties & Guests",
            href: "/admin/parties",
        },
    ];

    return (
        <div className="w-full flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Navbar breadcrumbs={breadcrumbs} parties={parties} />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <SpecialFoodCard parties={parties} />
                        <AttendanceCard parties={parties} />
                        <AlcoholFreeCard parties={parties} />
                    </div>
                    <Tabs defaultValue="parties">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="parties">Parties</TabsTrigger>
                                <TabsTrigger value="guests">Guests</TabsTrigger>
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
                        <TabsContent value="parties">
                            <Card x-chunk="dashboard-05-chunk-3">
                                <CardHeader className="px-7">
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-col gap-y-1">
                                            <CardTitle>Parties</CardTitle>
                                            <CardDescription className="flex flex-col gap-y-2">
                                                List of all the parties.
                                                <span className="text-xs italic">Tip: Tap a row to view and edit.</span>
                                            </CardDescription>
                                        </div>
                                        <Button className="text-xs" variant={"secondary"}>
                                            New Party
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <PartiesTable parties={parties} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="guests">
                            <Card x-chunk="dashboard-05-chunk-3">
                                <CardHeader className="px-7">
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-col gap-y-1">
                                            <CardTitle>Guests</CardTitle>
                                            <CardDescription className="flex flex-col gap-y-2">
                                                List of all the guests.
                                                <span className="text-xs italic">Tip: Tap a row to view and edit.</span>
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <GuestTable parties={parties} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>

    );
}

export default PartiesPage;