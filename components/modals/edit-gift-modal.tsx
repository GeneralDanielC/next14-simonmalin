"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { Gift, GiftAssignment } from "@prisma/client";
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
import { GiftWithAssignments } from "@/types";

interface EditGiftModalProps {
    gift: GiftWithAssignments
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
        const rawQuantity = formData.get("quantity") as string;

        const quantity = parseInt(rawQuantity);

        execute({
            id: gift.id,
            title,
            backstory,
            url,
            quantity,
        })
    }

    return (
        <Dialog
            open={editGiftModal.isOpen}
            onOpenChange={editGiftModal.onClose}
        >
            <DialogContent className="bg-card">
                <DialogHeader>
                    <DialogTitle>Edit '{gift.title}'</DialogTitle>
                    <DialogDescription>You can modify the gift here. Information about changes will not be sent to the guest.</DialogDescription>
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
                                id="quantity"
                                placeholder="Quantity..."
                                label="Quantity (leave empty for infinity)"
                                type="number"
                                defaultValue={gift.quantity ?? 0}
                                errors={fieldErrors}
                            />
                        </div>
                        <FormInput
                            id="url"
                            placeholder="Link..."
                            label="Link"
                            defaultValue={gift.url ?? ""}
                            errors={fieldErrors}
                        />
                        <FormTextarea
                            id="backstory"
                            placeholder="Backstory..."
                            label="Backstory"
                            defaultValue={gift.backstory ?? ""}
                            errors={fieldErrors}
                            rows={3}
                        />
                        <FormSubmit
                            className="mt-3"
                        >
                            Save
                        </FormSubmit>
                    </div>
                </form>
                <Separator className="my-4" />
                <div className="flex flex-col gap-y-2">
                    <span>Gift Assignments</span>
                    {gift.giftAssignments.map(assignment => (
                        <div key={assignment.id} className="flex flex-row justify-between items-center border border-accent p-2 rounded-md">
                            <div className="flex flex-col text-sm">
                                <span>{assignment.email}</span>
                                <span>Quantity: {assignment.count}</span>
                            </div>
                            <UnassignGift giftAssignment={assignment} />
                        </div>
                    ))}
                    {gift.giftAssignments.length === 0 && <span className="text-sm">No assignments yet.</span>}
                </div>
                <Separator className="my-4" />
                <DeleteGift gift={gift} />
            </DialogContent>
        </Dialog>
    )
}

const UnassignGift = ({ giftAssignment }: { giftAssignment: GiftAssignment }) => {
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
        execute({ id: giftAssignment.id });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="border border-black" variant="secondary">Unassign</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-accent">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This will unassign the current person, making the gift available for other guests to claim. The current guest will not be informed about this.</AlertDialogDescription>
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

const DeleteGift = ({ gift }: { gift: GiftWithAssignments }) => {
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
                <Button className="w-full bg-red-400">Delete Gift</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-accent">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete the data from our servers. Assigned guests will not be informed.</AlertDialogDescription>
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