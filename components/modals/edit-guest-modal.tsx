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
import { deleteGuest } from "@/actions/delete-guest";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
    const [willAttendNuptials, setWillAttendNuptials] = useState<boolean>(guest.willAttendNuptials);
    const [willAttendReception, setWillAttendReception] = useState<boolean>(guest.willAttendReception);

    const { execute: executeDelete } = useAction(deleteGuest, {
        onSuccess: (data) => {
            toast.success(`Successfully deleted ${data.firstName} ${data.lastName} from party.`)
            editGuestModal.onClose();
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const handleDelete = () => {
        executeDelete({ id: guest.id })
    }

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
            willAttend,
            willAttendNuptials,
            willAttendReception
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
                        <FormSwitch
                            id="willAttendNuptials"
                            defaultChecked={guest.willAttendNuptials}
                            label="Attendance Nuptials"
                            description="If the guest intend to attend the nuptials."
                            onChange={(checked) => setWillAttendNuptials(checked)}
                            errors={fieldErrors}
                        />
                        <FormSwitch
                            id="willAttendReception"
                            defaultChecked={guest.willAttendReception}
                            label="Attendance Reception"
                            description="If the guest intend to attend the reception."
                            onChange={(checked) => setWillAttendReception(checked)}
                            errors={fieldErrors}
                        />
                        <FormSubmit variant="secondary" className="border border-black mt-3">Save</FormSubmit>
                    </div>
                </form>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="destructive" className="w-full">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone. This will permanently delete the guest from our servers.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form
                            action={handleDelete}
                        >
                            <AlertDialogAction asChild>
                                <FormSubmit variant="destructive" className="w-full">Delete</FormSubmit>
                            </AlertDialogAction>
                        </form>

                    </AlertDialogContent>
                </AlertDialog>

            </DialogContent>
        </Dialog>
    )
}