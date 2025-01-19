"use client"

import { ElementRef, useEffect, useRef } from "react";

import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit"
import { useAction } from "@/hooks/use-action";
import { clientLogin } from "@/actions/auth/client-login";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { cookies } from "next/headers";

export const ClientLoginForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(clientLogin, {
        onSuccess: (data) => {
            const callbackUrl = searchParams.get("callbackUrl") || "/";            
            toast.success("Inloggad!");
            router.push(callbackUrl);
            router.replace(callbackUrl)
        },
        onError: (error) => {
            console.log(error);
            toast.error("Ajdå! Något gick fel.");
        }
    })

    const handleLogin = (formData: FormData) => {
        const password = formData.get("password") as string;

        execute({ password });
    }

    return (
        <form action={handleLogin} ref={formRef} className="flex flex-col gap-y-2">
            <FormInput id="password" placeholder="******" errors={fieldErrors} className="bg-transparent border border-black" />
            <FormSubmit variant="success" className="border border-black">Logga in</FormSubmit>
        </form>
    )
}