"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { Gift } from "@prisma/client";
import { FormInput } from "@/components/form/form-input";
import { FormSwitch } from "@/components/form/form-switch";
import { FormSubmit } from "@/components/form/form-submit";
import { ElementRef, useRef, useState } from "react";
import { editGuestInParty } from "@/actions/edit-guest-in-party";
import { useEditGiftModal } from "@/hooks/use-edit-gift-modal";
import { FormTextarea } from "@/components/form/form-textarea";
import { Separator } from "@/components/ui/separator";
import { editGift } from "@/actions/edit-gift";
import { Check, Trash, X } from "lucide-react";
import { unassignGift } from "@/actions/unassign-gift";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteGift } from "@/actions/delete-gift";
import { useRequestGiftModal } from "@/hooks/use-request-gift-modal";
import { requestGift } from "@/actions/request-gift";
import Link from "next/link";

interface RequestGiftModalProps {
    gift: Gift
}

export const RequestGiftModal = ({
    gift
}: RequestGiftModalProps) => {
    const requestGiftModal = useRequestGiftModal()
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(requestGift, {
        onSuccess: (data) => {
            toast.success("Inskickat! Håll utkik på mejlen för bekräftelse.")
            formRef.current?.reset();
            requestGiftModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const handleRequestGiftSubmit = (formData: FormData) => {
        const assignedToEmail = formData.get("assignedToEmail") as string;

        execute({
            id: gift.id,
            assignedToEmail,
        })
    }

    return (
        <Dialog
            open={requestGiftModal.isOpen}
            onOpenChange={requestGiftModal.onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{gift.title}</DialogTitle>
                    <DialogDescription>{gift.backstory} {gift.url && <Link className="underline" href={gift.url}>Länk!</Link>}</DialogDescription>
                    <Separator />
                    <DialogDescription className="flex flex-col">
                        <span>Vill du köpa den här presenten? Besvara formuläret nedan.</span>
                        <span className="text-xs italic">Presenten kommer att gömmas från andra gäster.</span>
                    </DialogDescription>
                </DialogHeader>
                <form ref={formRef} action={handleRequestGiftSubmit}>
                    <div className="flex flex-col gap-y-1">
                        <FormInput
                            id="assignedToEmail"
                            placeholder="E-postadress..."
                            defaultValue={gift.assignedToEmail ?? ""}
                            errors={fieldErrors}
                        />
                        <FormSubmit
                            variant="success"
                            className="mt-3"
                        >
                            Skicka
                        </FormSubmit>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}