"use client"

import { createGift } from "@/actions/create-gift"
import { FormInput } from "@/components/form/form-input"
import { FormTextarea } from "@/components/form/form-textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAction } from "@/hooks/use-action"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"

export const NewGiftForm = () => {
    const formRef = useRef<ElementRef<"form">>(null);
    const [open, setOpen] = useState<boolean>(false);

    const { execute, fieldErrors } = useAction(createGift, {
        onSuccess: (data) => {
            toast.success("Successfully created gift.")
            formRef.current?.reset();
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const url = formData.get("url") as string;
        const backstory = formData.get("backstory") as string;

        execute({ title, url, backstory });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="text-xs">New Gift</Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
                <DialogHeader>
                    <DialogTitle>New Gift</DialogTitle>
                    <DialogDescription>Add new gifts by filling in the form below.</DialogDescription>
                </DialogHeader>
                <form
                    action={handleSubmit}
                    ref={formRef}
                    className="flex flex-col gap-y-1"
                >
                    <div className="flex flex-row gap-x-2">
                        <FormInput id="title" placeholder="Title..." label="Title" errors={fieldErrors} required />
                        <FormInput id="url" placeholder="Link..." label="Link" errors={fieldErrors} />
                    </div>
                    <FormTextarea id="backstory" placeholder="Backstory..." label="Backstory" errors={fieldErrors} />

                    <DialogFooter className="mt-2">
                        <Button variant={"success"}>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}