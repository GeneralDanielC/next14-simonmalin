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
import { FormSwitch } from "@/components/form/form-switch";
import { createGuest } from "@/actions/create-guest";
import { Guest } from "@prisma/client";
import { FormSubmit } from "@/components/form/form-submit";

interface NewGuestFormProps {
    partyId: string,
}

export const NewGuestForm = ({
    partyId
}: NewGuestFormProps) => {
    const router = useRouter();

    const formRef = useRef<ElementRef<"form">>(null);
    const [open, setOpen] = useState<boolean>(false);

    const [alcoholPreference, setAlcoholPreference] = useState<boolean>(false);
    const [willAttend, setWillAttend] = useState<boolean>(false);
    const [willAttendNuptials, setWillAttendNuptials] = useState<boolean>(false);
    const [willAttendReception, setWillAttendReception] = useState<boolean>(false);

    const { execute, fieldErrors } = useAction(createGuest, {
        onSuccess: (data) => {
            toast.success("Successfully created guest.")
            formRef.current?.reset();
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const handleSubmit = (formData: FormData) => {
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const foodPreferences = formData.get("foodPreferences") as string;

        execute({
            partyId,
            firstName,
            lastName,
            foodPreferences,
            alcoholPreference,
            willAttend,
            willAttendNuptials,
            willAttendReception
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="text-xs" variant={"secondary"}>
                    New Guest
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
                <DialogHeader>
                    <DialogTitle>New Guest</DialogTitle>
                    <DialogDescription>You can add a guest to the party here.</DialogDescription>
                </DialogHeader>
                <form ref={formRef} action={handleSubmit}>
                    <div className="flex flex-col gap-y-2">
                        <div className="w-full flex flex-row gap-x-2">
                            <FormInput id="firstName" placeholder="First Name" errors={fieldErrors} />
                            <FormInput id="lastName" placeholder="Last Name" errors={fieldErrors} />
                        </div>
                        <FormInput id="foodPreferences" placeholder="Allergies" errors={fieldErrors} />
                        <FormSwitch
                            id="alcoholPreference"
                            defaultChecked={alcoholPreference}
                            label="Prefers Alcohol Free Beverage"
                            description="If the guest prefers alcohol-free beverage at the wedding."
                            onChange={(checked) => setAlcoholPreference(checked)}
                            errors={fieldErrors}
                        />
                        <FormSwitch
                            id="willAttend"
                            defaultChecked={willAttend}
                            label="Attendance"
                            description="If the guest intend to attend the wedding."
                            onChange={(checked) => setWillAttend(checked)}
                            errors={fieldErrors}
                        />
                        <FormSwitch
                            id="willAttendNuptials"
                            defaultChecked={willAttendNuptials}
                            label="Attend Nuptials"
                            description="If the guest intend to attend the nuptials."
                            onChange={(checked) => setWillAttendNuptials(checked)}
                            errors={fieldErrors}
                        />
                        <FormSwitch
                            id="willAttendReception"
                            defaultChecked={willAttendReception}
                            label="Attendance"
                            description="If the guest intend to attend the reception."
                            onChange={(checked) => setWillAttendReception(checked)}
                            errors={fieldErrors}
                        />
                        <FormSubmit variant="success">Save</FormSubmit>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}