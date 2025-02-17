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
import { ChevronsRight, Infinity } from "lucide-react";
import { getAvailableGiftCount } from "@/lib/gifts";
import { GiftWithAssignments } from "@/types";

interface RequestGiftModalProps {
    gift: GiftWithAssignments
}

export const RequestGiftModal = ({
    gift
}: RequestGiftModalProps) => {
    const requestGiftModal = useRequestGiftModal()
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(requestGift, {
        onSuccess: (data) => {
            toast.success("Paxat! Håll utkik på mejlen för bekräftelse.")
            formRef.current?.reset();
            requestGiftModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const handleRequestGiftSubmit = (formData: FormData) => {
        const email = formData.get("email") as string;
        const rawCount = formData.get("count") as string;
        const count = parseInt(rawCount)

        if (gift.quantity && getAvailableGiftCount({ gift }) > 0) {
            if (!count || count < 1) {
                toast.error("Du måste ange ett antal över 0.");
                return;
            }
            execute({
                id: gift.id,
                email,
                count
            })
        } else {
            execute({
                id: gift.id,
                email,
                count: undefined
            })
        }
    }

    return (
        <Dialog
            open={requestGiftModal.isOpen}
            onOpenChange={requestGiftModal.onClose}
        >
            <DialogContent>

                <div className="flex flex-row items-center border border-black rounded-lg p-3">
                    <div className="w-full flex flex-col">
                        <span className="text-muted-foreground text-sm">presentinfo</span>
                        <span className="text-lg font-semibold">{gift.title}</span>
                        <span className="text-sm">{gift.backstory}</span>
                        <span className="text-sm">{gift.url && <Link target="_blank" className="underline" href={gift.url}>Länk till present</Link>}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-4xl">{gift.quantity ? getAvailableGiftCount({ gift }).toString() : <Infinity />}</span>
                        <span className="text-sm">tillgängliga</span>
                    </div>
                </div>
                <form ref={formRef} action={handleRequestGiftSubmit}>
                    <div className="flex flex-col gap-y-1 mt-2">
                        <DialogHeader>
                            <DialogTitle>Vill du köpa den här presenten?</DialogTitle>
                            <DialogDescription className="flex flex-col">
                                <div className="flex flex-col text-sm gap-y-1">
                                    <div className="flex flex-row gap-x-2 items-center">
                                        <ChevronsRight className="size-5" />
                                        <span>Ange din e-postadress.</span>
                                    </div>
                                    {gift.quantity && (
                                        <>
                                            <div className="flex flex-row gap-x-2">
                                                <ChevronsRight className="size-5 flex-none" />
                                                <span>Ange hur många exemplar av presenten du vill köpa.</span>
                                            </div>
                                            <div className="flex flex-row gap-x-2">
                                                <ChevronsRight className="size-5 flex-none" />
                                                <span>Antalet kan inte överstiga det tillgängliga antalet.</span>
                                            </div>
                                            <div className="flex flex-row gap-x-2">
                                                <ChevronsRight className="size-5 flex-none" />
                                                <span>När alla exemplar är reserverade, döljs presenten från listan.</span>
                                            </div>
                                        </>
                                    )}

                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-row gap-2 mt-4">
                            <FormInput
                                id="email"
                                placeholder="E-postadress"
                                errors={fieldErrors}
                                autofocus
                            />
                            {gift.quantity && (
                                <FormInput
                                    id="count"
                                    type="number"
                                    placeholder="Antal"
                                    min={1}
                                    errors={fieldErrors}
                                    autofocus
                                />
                            )}
                        </div>
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