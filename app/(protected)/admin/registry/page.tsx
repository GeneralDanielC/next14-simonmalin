

import { Navbar } from "../_components/navbar";
import { getGifts, getParties } from "@/data/data"

import { SpecialFoodCard } from "@/components/admin/special-food-card"
import { AttendanceCard } from "@/components/admin/attendance-card"
import { AlcoholFreeCard } from "@/components/admin/alcohol-free-card"
import { RegistryTabs } from "./_components/registry-tabs";
import { AssignedCard } from "@/components/admin/assigned-card";


const RegistryPage = async () => {

    const gifts = await getGifts();
    const parties = await getParties();

    if (!gifts || !parties) return <p>Something went wrong!</p>

    const breadcrumbs = [
        {
            title: "Dashboard",
            href: "/admin/dashboard",
        },
        {
            title: "Gift Registry",
            href: "/admin/registry",
        },
    ];

    return (
        <div className="w-full flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Navbar breadcrumbs={breadcrumbs} parties={parties} gifts={gifts} />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        
                        {/* Assigned Gifts Card */}
                        <AssignedCard gifts={gifts} showAssigned={true} />
                        <AssignedCard gifts={gifts} showAssigned={false} />
                    </div>
                    <RegistryTabs gifts={gifts} />
                </div>
            </main>
        </div>

    );
}

export default RegistryPage;