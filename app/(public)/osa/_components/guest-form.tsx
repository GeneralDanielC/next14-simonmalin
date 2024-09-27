"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Guest } from "./rsvp-form";
import { useState } from "react";
import { cn } from "@/lib/utils";


interface GuestFormProps {
    dialogTitle: string
    dialogDescription: string
    submitText: string
    children: React.ReactNode
    handleSubmit: () => void
    guest: Guest
    setGuest: React.Dispatch<React.SetStateAction<Guest>>
}

export const GuestForm = ({
    dialogTitle,
    dialogDescription,
    submitText,
    children,
    handleSubmit,
    guest,
    setGuest
}: GuestFormProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription className="text-xs">{dialogDescription}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-y-2">
                    <div className="w-full flex flex-row gap-x-2">
                        <FormInput
                            id="firstName"
                            defaultValue={guest.firstName}
                            onChange={(e) => setGuest({ ...guest, firstName: e.target.value })}
                            placeholder="Förnamn"
                        />
                        <FormInput
                            id="lastName"
                            defaultValue={guest.lastName}
                            onChange={(e) => setGuest({ ...guest, lastName: e.target.value })}
                            placeholder="Förnamn"
                        />
                    </div>
                    <FormInput
                        id="foodPreferences"
                        defaultValue={guest.foodPreferences}
                        disabled={!guest.willAttend}
                        onChange={(e) => setGuest({ ...guest, foodPreferences: e.target.value })}
                        placeholder="Allergier & Specialkost"
                        className={cn("disabled:opacity-100 disabled:text-stone-400/70", !guest.willAttend && "placeholder:text-stone-400/70")}
                    />
                    <div className={cn("flex flex-row justify-between items-center bg-stone-400/10 rounded-xl shadow-sm px-3 py-2")}>
                        <div className="flex flex-col justify-center">
                            <Label htmlFor="alkoholfritt" className={cn(!guest.willAttend && "text-stone-400/70")}>Alkoholfritt</Label>
                            <span className={cn("text-xs", !guest.willAttend && "text-stone-400/70")}>Om alkoholfri dryck önskas.</span>
                        </div>
                        <Switch
                            id="alkoholfritt"
                            defaultChecked={guest.alcoholPreference}
                            disabled={!guest.willAttend}
                            onCheckedChange={(checked) => setGuest({ ...guest, alcoholPreference: checked })}
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center bg-stone-400/10 rounded-xl shadow-sm px-3 py-2">
                        <div className="flex flex-col justify-center">
                            <Label htmlFor="willAttend">Deltagande</Label>
                            <span className="text-xs">Om personen kommer att närvara på bröllopet.</span>
                        </div>
                        <Switch
                            id="willAttend"
                            defaultChecked={guest.willAttend}
                            onCheckedChange={(checked) => setGuest({ ...guest, willAttend: checked, alcoholPreference: checked === false ? false : true })}
                        />
                    </div>
                    <Button
                        variant="success"
                        onClick={() => {
                            handleSubmit();
                            setOpen(false);
                        }}
                    >
                        {submitText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}