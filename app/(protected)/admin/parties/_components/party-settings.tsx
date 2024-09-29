"use client"

import { deleteParty } from "@/actions/delete-party"
import { editParty } from "@/actions/edit-party"
import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { PartyWithGuests } from "@/types"
import { useRouter } from "next/navigation"
import { ElementRef, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

interface PartySettingsProps {
    party: PartyWithGuests
}

export const PartySettings = ({
    party
}: PartySettingsProps) => {
    const formRef = useRef<ElementRef<"form">>(null);
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isDisabled) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev > 1) {
                        return prev - 1;
                    } else {
                        setIsDisabled(false);
                        clearInterval(timer);
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isDisabled]);

    const { execute: executeEditParty, fieldErrors } = useAction(editParty, {
        onSuccess: (data) => {
            toast.success("Successfully saved!");
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const { execute: executeDeleteParty, fieldErrors: errors } = useAction(deleteParty, {
        onSuccess: (data) => {
            toast.success("Successfully deleted party and all related guests!");
            router.push("/admin/parties");
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const handleSubmitEditParty = (formData: FormData) => {
        const email = formData.get("email") as string;

        executeEditParty({ partyId: party.id, email });
    }

    const handleSubmitDeleteParty = () => {
        if (!isDisabled) {
            executeDeleteParty({ partyId: party.id });
        }
    }

    return (
        <div className="flex flex-col gap-y-2">
            <form action={handleSubmitEditParty} ref={formRef}>
                <div className="w-full flex flex-col gap-y-4">
                    <FormInput id="email" defaultValue={party.email} label="Email" placeholder="Email" errors={fieldErrors} />
                    <FormSubmit variant="secondary" className="border border-black">Save</FormSubmit>
                </div>
            </form>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="text-xs">Delete Party</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the party and remove all related guests from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {isDisabled && <span className="text-right text-xs italic text-stone-400">You can continue in {countdown} seconds.</span>}
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form action={handleSubmitDeleteParty}>
                            <AlertDialogAction asChild>
                                <FormSubmit disabled={isDisabled}>Continue</FormSubmit>
                            </AlertDialogAction>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}