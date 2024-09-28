import Link from "next/link"
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    Edit,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    Truck,
    Users2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Navbar } from "../../_components/navbar";
import { getParties, getPartyById } from "@/data/data"
import { PartyWithGuests } from "@/types"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { getAlcoholFreeGuestsInParty, getGuestsWithFoodPreferencesInParty, getParticipatingGuestsInParty } from "@/lib/parties"
import { SpecialFoodCard } from "@/components/admin/special-food-card"
import { AttendanceCard } from "@/components/admin/attendance-card"
import { AlcoholFreeCard } from "@/components/admin/alcohol-free-card"

{/* <div className="w-full h-full flex flex-col py-10">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            
            Admin Dashboard
            <p>Varna för dubbletter. Kolla på namn & efternamn.</p>
            <p>Visa de som har fyllt i allergier / alkoholpreferens om de kommer eller inte. Kommer de inte bör dessa tas bort, det borde finnas en netto räknare som räknar alla som ska ha alkohol som kommer etc.</p>
        </div> */}

const PartiesPage = async ({ params
}: { params: { partyId: string } }) => {
    const { partyId } = params;

    const party = await getPartyById(partyId);
    const parties = await getParties();

    if (!party) return <p>Something went wrong!</p>

    const breadcrumbs = [
        {
            title: "Dashboard",
            href: "/admin/dashboard",
        },
        {
            title: "Parties & Guests",
            href: "/admin/parties",
        },
        {
            title: party.email,
            href: "/admin/parties",
        },
    ];

    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Navbar breadcrumbs={breadcrumbs} parties={parties} />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <SpecialFoodCard party={party} />
                        <AttendanceCard party={party} />
                        <AlcoholFreeCard party={party} />
                    </div>
                    <Tabs defaultValue="week">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="week">Week</TabsTrigger>
                                <TabsTrigger value="month">Month</TabsTrigger>
                                <TabsTrigger value="year">Year</TabsTrigger>
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
                                >
                                    <File className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">Export</span>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="week">
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
                                        <Button asChild variant={"secondary"}>
                                            <a href={`mailto:${party.email}`}>
                                                Email Party
                                            </a>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Food Preferences
                                                </TableHead>
                                                <TableHead className="text-center">Alcohol Free</TableHead>
                                                <TableHead className="text-center">Attendance</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {party.guests.map(guest => (
                                                <TableRow>
                                                    <TableCell>
                                                        <div className="font-medium">{guest.firstName} {guest.lastName}</div>
                                                        {/* <div className="hidden text-sm text-muted-foreground md:inline">
                                                            olivia@example.com
                                                        </div> */}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell text-xs">
                                                        {guest.foodPreferences !== "" ? guest.foodPreferences : <span className="text-xs text-stone-400 italic">None.</span>}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Badge className="text-xs" variant={guest.alcoholPreference ? "secondary" : "outline"}>
                                                            {guest.alcoholPreference ? "Yes" : "No"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Badge className={cn("text-xs", guest.willAttend ? "bg-emerald-300" : "bg-rose-300")} variant={guest.willAttend ? "secondary" : "outline"}>
                                                            {guest.willAttend ? "Yes" : "No"}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
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