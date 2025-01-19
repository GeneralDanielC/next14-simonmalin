// import { LoginForm } from "@/components/auth/login-form";

import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { southland } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ClientLoginForm } from "./_components/client-login-form";
import { HeroSection } from "@/components/hero-section";
import { Skew } from "@/components/skew";

const LoginPage = () => {
    return (
        <div className="h-full w-full">
            <HeroSection heading="Logga in" />
            <div className="w-full px-6 flex justify-center items-center">
                <div className="max-w-screen-md px-8 w-[400px] bg-card-beige rounded-lg border border-black shadow-lg py-6">
                    <h1 className="text-2xl">Logga in</h1>
                    <CardDescription>Lösenordet finns angivet på inbjudan.</CardDescription>
                    <div className="mt-4">
                        <ClientLoginForm />
                    </div>
                    <div className="flex flex-col mt-5 items-start w-full">
                        <span className="text-xl">Frågor eller problem?</span>
                        {/* <span className="text-stone-500 underline">Kontakta brudparet</span> */}
                        <a className="text-stone-500 underline" href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;