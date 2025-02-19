"use client"

import { createGift } from "@/actions/create-gift"
import { FormInput } from "@/components/form/form-input"
import { FormSwitch } from "@/components/form/form-switch"
import { FormTextarea } from "@/components/form/form-textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAction } from "@/hooks/use-action"
import { FilePlus, Plus } from "lucide-react"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"

export const NewGiftForm = () => {
    const formRef = useRef<ElementRef<"form">>(null);
    const [open, setOpen] = useState<boolean>(false);

    const [hidden, setHidden] = useState(true);

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
        const rawQuantity = formData.get("quantity") as string;

        const quantity = parseInt(rawQuantity);

        execute({ title, url, backstory, quantity, hidden });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="text-sm flex flex-col h-full gap-y-1">
                    <FilePlus className="size-5" />
                    <span>New Gift</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
                <DialogHeader>
                    <DialogTitle>New Gift</DialogTitle>
                    <DialogDescription>Add new gifts by filling in the form below.</DialogDescription>
                </DialogHeader>
                <form
                    action={handleSubmit}
                    ref={formRef}
                    className="flex flex-col gap-y-2"
                >
                    <div className="flex flex-row gap-x-2">
                        <FormInput id="title" placeholder="A clear title..." label="Title *" errors={fieldErrors} required />

                        <FormInput id="quantity" placeholder="The perfect amount..." label="Quantity (put 0 for infinity)" type="number" errors={fieldErrors} defaultValue={0} min={0} />
                    </div>
                    <FormSwitch id="hidden" label="Hidden" description="Whether the gift will be hidden from clients." value={hidden} onChange={(checked) => setHidden(checked)} className="data-[state=checked]:bg-accent-foreground" />
                    <FormInput id="url" placeholder="e.g. google.se..." label="Link" errors={fieldErrors} />
                    <FormTextarea id="backstory" placeholder="Some kind of good backstory..." label="Backstory" errors={fieldErrors} rows={4} />

                    <DialogFooter className="mt-2">
                        <Button>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}