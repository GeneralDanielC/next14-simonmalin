"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { Gift } from "@prisma/client";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { ElementRef, useRef } from "react";
import { useRequestGiftModal } from "@/hooks/use-request-gift-modal";
import { requestGift } from "@/actions/request-gift";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
                    <DialogTitle>Vill du paxa '{gift.title}' ?</DialogTitle>
                    <DialogDescription>Presenten kommer att gömmas från andra gäster.</DialogDescription>
                </DialogHeader>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="more-info">
                        <AccordionTrigger className="border border-black p-2 rounded-lg">Mer info</AccordionTrigger>
                        <AccordionContent className="flex flex-col px-2 py-1.5">
                            <span className="text-lg">{gift.title}</span>
                            <span>{gift.backstory}</span>
                            <span>{gift.url && <Link className="underline" href={gift.url}>{gift.url}</Link>}</span>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <form ref={formRef} action={handleRequestGiftSubmit}>
                    <div className="flex flex-col gap-y-1">
                        <FormInput
                            id="assignedToEmail"
                            placeholder="E-postadress..."
                            defaultValue={gift.assignedToEmail ?? ""}
                            errors={fieldErrors}
                            autofocus
                        />
                        <FormSubmit
                            variant="success"
                            className="mt-3 border border-black"
                        >
                            Paxa
                        </FormSubmit>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}