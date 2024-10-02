"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useEditGuestModal } from "@/hooks/use-edit-guest-modal";
import { PartyWithGuests } from "@/types";
import { Guest } from "@prisma/client";
import { FormInput } from "@/components/form/form-input";
import { FormSwitch } from "@/components/form/form-switch";
import { FormSubmit } from "@/components/form/form-submit";
import { ElementRef, useRef, useState } from "react";
import { editGuestInParty } from "@/actions/edit-guest-in-party";

interface EditGuestModalProps {
    party: PartyWithGuests,
    guest: Guest
}

export const EditGuestModal = ({
    party,
    guest
}: EditGuestModalProps) => {
    const editGuestModal = useEditGuestModal()
    const formRef = useRef<ElementRef<"form">>(null);

    const [alcoholPreference, setAlcoholPreference] = useState<boolean>(guest.alcoholPreference);
    const [willAttend, setWillAttend] = useState<boolean>(guest.willAttend);

    const { execute, fieldErrors } = useAction(editGuestInParty, {
        onSuccess: (data) => {
            toast.success("Successfully saved!")
            formRef.current?.reset();
            editGuestModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const handleSubmit = (formData: FormData) => {
        const partyId = party.id;
        const guestId = guest.id;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const foodPreferences = formData.get("foodPreferences") as string;

        execute({
            partyId,
            guestId,
            firstName,
            lastName,
            foodPreferences,
            alcoholPreference,
            willAttend
        })

    }

    return (
        <Dialog
            open={editGuestModal.isOpen}
            onOpenChange={editGuestModal.onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{guest.firstName} {guest.lastName}</DialogTitle>
                    <DialogDescription>You can modify the guest's selected options here.</DialogDescription>
                </DialogHeader>
                <form ref={formRef} action={handleSubmit}>
                    <div className="flex flex-col gap-y-2">
                        <div className="w-full flex flex-row gap-x-2">
                            <FormInput id="firstName" defaultValue={guest.firstName} placeholder="First Name" errors={fieldErrors} />
                            <FormInput id="lastName" defaultValue={guest.lastName} placeholder="Last Name" errors={fieldErrors} />
                        </div>
                        <FormInput id="foodPreferences" defaultValue={guest.foodPreferences || ""} placeholder="Allergies" errors={fieldErrors} />
                        <FormSwitch
                            id="alcoholPreference"
                            defaultChecked={guest.alcoholPreference}
                            label="Prefers Alcohol Free Beverage"
                            description="If the guest prefers alcohol-free beverage at the wedding."
                            onChange={(checked) => setAlcoholPreference(checked)}
                            errors={fieldErrors}
                        />
                        <FormSwitch
                            id="willAttend"
                            defaultChecked={guest.willAttend}
                            label="Attendance"
                            description="If the guest intend to attend the wedding."
                            onChange={(checked) => setWillAttend(checked)}
                            errors={fieldErrors}
                        />
                        <FormSubmit variant="secondary" className="border border-black mt-3">Save</FormSubmit>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}