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

interface EditGiftModalProps {
    gift: Gift
}

export const EditGiftModal = ({
    gift
}: EditGiftModalProps) => {
    const editGiftModal = useEditGiftModal()
    const formRef = useRef<ElementRef<"form">>(null);

    const [newAssignedToEmail, setNewAssignedToEmail] = useState<string>("");

    const { execute, fieldErrors } = useAction(editGift, {
        onSuccess: (data) => {
            toast.success("Successfully saved!")
            formRef.current?.reset();
            editGiftModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const handleEditGiftSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const url = formData.get("url") as string;
        const backstory = formData.get("backstory") as string;
        const assignedToEmail = formData.get("assignedToEmail") as string;

        execute({
            id: gift.id,
            title,
            prevAssignedToEmail: gift.assignedToEmail || undefined,
            backstory,
            url,
            assignedToEmail: assignedToEmail || undefined,
        })
    }

    return (
        <Dialog
            open={editGiftModal.isOpen}
            onOpenChange={editGiftModal.onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit '{gift.title}'</DialogTitle>
                    <DialogDescription>You can modify the gift here.</DialogDescription>
                </DialogHeader>
                <form ref={formRef} action={handleEditGiftSubmit}>
                    <div className="flex flex-col gap-y-1">
                        <div className="w-full flex flex-row gap-x-2">
                            <FormInput
                                id="title"
                                placeholder="Title..."
                                label="Title"
                                defaultValue={gift.title}
                                required
                                errors={fieldErrors}
                            />
                            <FormInput
                                id="url"
                                placeholder="Link..."
                                label="Link"
                                defaultValue={gift.url ?? ""}
                                errors={fieldErrors}
                            />
                        </div>
                        <FormTextarea
                            id="backstory"
                            placeholder="Backstory..."
                            label="Backstory"
                            defaultValue={gift.backstory ?? ""}
                            errors={fieldErrors}
                            rows={3}
                        />
                        <FormInput
                            id="assignedToEmail"
                            placeholder="Email..."
                            label="Assigned To Email"
                            disabled={!!gift.assignedToEmail}
                            defaultValue={gift.assignedToEmail ?? ""}
                            onChange={(e) => setNewAssignedToEmail(e.target.value)}
                            errors={fieldErrors}
                        />
                        <FormSubmit
                            variant="success"
                            className="mt-3"
                        >
                            Save
                        </FormSubmit>
                    </div>
                </form>
                <div className="flex flex-row gap-x-2 w-full">
                    <UnassignGift gift={gift} />
                    <DeleteGift gift={gift} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

const UnassignGift = ({ gift }: { gift: Gift }) => {
    const editGiftModal = useEditGiftModal()

    const { execute } = useAction(unassignGift, {
        onSuccess: (data) => {
            toast.success("Successfully unassigned gift!");
            editGiftModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const handleSubmit = () => {
        execute({ id: gift.id });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full border border-black" variant="secondary">Unassign Gift</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This will unassign the current person, making the gift available for other guests to claim.</AlertDialogDescription>
                    {gift.assignedToEmail &&
                        <AlertDialogDescription className="flex flex-col">
                            <span>If needed, make sure to contact the current guest.</span>
                            <span className="font-bold text-xs">{gift.assignedToEmail}</span>
                        </AlertDialogDescription>
                    }
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={handleSubmit}>
                        <AlertDialogAction asChild>
                            <FormSubmit>
                                Continue
                            </FormSubmit>
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

const DeleteGift = ({ gift }: { gift: Gift }) => {
    const editGiftModal = useEditGiftModal()

    const { execute } = useAction(deleteGift, {
        onSuccess: (data) => {
            toast.success("Successfully deleted gift!");
            editGiftModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const handleSubmit = () => {
        execute({ id: gift.id });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full" variant="destructive">Delete Gift</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete the data from our servers.</AlertDialogDescription>
                    {gift.assignedToEmail &&
                        <AlertDialogDescription className="flex flex-col">
                        <span>If needed, make sure to contact the current guest.</span>
                        <span className="font-bold text-xs">{gift.assignedToEmail}</span>
                    </AlertDialogDescription>
                    }
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={handleSubmit}>
                        <AlertDialogAction asChild>
                            <FormSubmit>
                                Continue
                            </FormSubmit>
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}