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
            <HeroSection className="pb-24" />
            <Skew
                backgroundColor="bg-sky-600/10"
            >
                <div className="w-full">
                    <CardTitle>Logga in</CardTitle>
                    <CardDescription>För att komma åt sidan behöver du ange lösenordet.</CardDescription>
                    <div className="mt-4">
                        <ClientLoginForm />
                    </div>
                </div>
            </Skew>
        </div>
    );
}

export default LoginPage;