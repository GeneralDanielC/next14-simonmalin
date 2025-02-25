
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "../_components/navbar";
import { getGifts, getParties } from "@/data/data"
import { AlertsCard } from "@/components/admin/alerts-card";
import { LinkCard } from "@/components/admin/link-card";
import { Package, Users } from "lucide-react";
import { AttendanceCard } from "@/components/admin/attendance-card";
import { currentUser } from "@/lib/auth";

const DashboardPage = async () => {
    const user = await currentUser();

    if (!user) return <p>Unauthorized</p>

    const gifts = await getGifts();
    const parties = await getParties();

    if (!gifts || !parties) return <p>Something went wrong!</p>

    const breadcrumbs = [
        {
            title: "Dashboard",
            href: "/admin/dashboard",
        },
    ];

    return (
        <div className="w-full flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Navbar breadcrumbs={breadcrumbs} parties={parties} gifts={gifts} />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 w-full">
                        <AlertsCard gifts={gifts} parties={parties} />
                        <LinkCard title="Parties" description="Manage parties and guests." icon={<Users className="size-10" />} href="/admin/parties" />
                        <LinkCard title="Gift Registry" description="Manage your gift registry." icon={<Package className="size-10" />} href="/admin/registry" />
                        <AttendanceCard parties={parties} />
                    </div>
                </div>
            </main>
        </div>

    );
}

export default DashboardPage;