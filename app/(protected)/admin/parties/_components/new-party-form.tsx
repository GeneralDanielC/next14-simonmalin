"use client"

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";

import { useAction } from "@/hooks/use-action";
import { createParty } from "@/actions/create-party";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input";

export const NewPartyForm = () => {
    const router = useRouter();

    const formRef = useRef<ElementRef<"form">>(null);
    const [open, setOpen] = useState<boolean>(false);

    const { execute, fieldErrors } = useAction(createParty, {
        onSuccess: (data) => {
            toast.success("Successfully created party.")
            formRef.current?.reset();
            setOpen(false);
            router.push(`/admin/parties/${data.id}`)
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const handleSubmit = (formData: FormData) => {
        const email = formData.get("email") as string;

        execute({ email });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="text-xs" variant={"secondary"}>
                    New Party
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
                <DialogHeader>
                    <DialogTitle>New Party</DialogTitle>
                    <DialogDescription>You can create a new party here.</DialogDescription>
                </DialogHeader>
                <form
                    action={handleSubmit}
                    ref={formRef}
                    className="flex flex-col gap-y-1"
                >
                    <FormInput id="email" placeholder="Email..." label="Email" errors={fieldErrors} required />
                    <DialogFooter className="mt-2 flex flex-row items-center gap-x-3">
                        <span className="text-xs italic">You can add guests later.</span>
                        <Button variant={"success"}>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}