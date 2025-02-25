


import { Navbar } from "../../_components/navbar";
import { getGifts, getParties, getPartyById } from "@/data/data"

import { SpecialFoodCard } from "@/components/admin/special-food-card"
import { AttendanceCard } from "@/components/admin/attendance-card"
import { AlcoholFreeCard } from "@/components/admin/alcohol-free-card"
import { GuestsTabs } from "./_components/guests-tabs";
import { currentUser } from "@/lib/auth";

const PartyPage = async ({ params
}: { params: { partyId: string } }) => {
    const { partyId } = params;

    const user = await currentUser();

    if (!user) return <p>Unauthorized</p>

    const party = await getPartyById(partyId);
    const parties = await getParties();
    const gifts = await getGifts();

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
        <div className="w-full flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Navbar breadcrumbs={breadcrumbs} parties={parties} gifts={gifts} />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <SpecialFoodCard party={party} />
                        <AttendanceCard party={party} />
                        <AlcoholFreeCard party={party} />
                    </div>
                    <GuestsTabs party={party} />
                </div>
            </main>
        </div>

    );
}

export default PartyPage;