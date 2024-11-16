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
            <div className="px-8 flex justify-center items-center">
                <div className="max-w-screen-md px-8 bg-stone-400/10 rounded-xl shadow-lg py-6">
                    <CardTitle className="text-xl">Logga in</CardTitle>
                    <CardDescription>Lösenordet finns angivet på inbjudan.</CardDescription>
                    <div className="mt-4">
                        <ClientLoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;