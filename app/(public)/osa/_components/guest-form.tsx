"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Guest } from "./rsvp-form";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";


interface GuestFormProps {
    dialogTitle: string
    dialogDescription: string
    submitText: string
    children: React.ReactNode
    handleSubmit: (guest?: Guest) => void
    handleOnOpen?: () => void
    handleOnDeleteGuest?: (index: number) => void
    guest: Guest
    setGuest: React.Dispatch<React.SetStateAction<Guest>>
    edit?: boolean
    editIndex?: number
}

export const GuestForm = ({
    dialogTitle,
    dialogDescription,
    submitText,
    children,
    handleSubmit,
    handleOnOpen,
    handleOnDeleteGuest,
    guest,
    setGuest,
    edit = false,
    editIndex,
}: GuestFormProps) => {
    const [open, setOpen] = useState(false);

    const [editingGuest, setEditingGuest] = useState<Guest>(guest);

    useEffect(() => {
        setEditingGuest(guest); // Reset editingGuest state when guest prop changes        
    }, [guest]);

    const handleSave = () => {
        setGuest(editingGuest); // Only update parent state here
        setOpen(false);

        edit ? handleSubmit(editingGuest) : handleSubmit();
    };

    return (
        <Dialog open={open} onOpenChange={() => {
            setOpen(!open);
            !open && handleOnOpen && handleOnOpen();
        }}>
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
                            defaultValue={edit ? editingGuest.firstName : guest.firstName}
                            onChange={(e) =>
                                edit ? setEditingGuest({
                                    ...editingGuest,
                                    firstName: e.target.value
                                }) : setGuest({
                                    ...guest,
                                    firstName: e.target.value
                                })}
                            placeholder="Förnamn"
                        />
                        <FormInput
                            id="lastName"
                            defaultValue={edit ? editingGuest.lastName : guest.lastName}
                            onChange={(e) =>
                                edit ? setEditingGuest({
                                    ...editingGuest,
                                    lastName: e.target.value
                                }) : setGuest({
                                    ...guest,
                                    lastName: e.target.value
                                })}
                            placeholder="Efternamn"
                        />
                    </div>
                    <FormInput
                        id="foodPreferences"
                        defaultValue={edit ? editingGuest.foodPreferences : guest.foodPreferences}
                        disabled={edit ? !editingGuest.willAttend : !guest.willAttend}
                        onChange={(e) =>
                            edit ? setEditingGuest({
                                ...editingGuest,
                                foodPreferences: e.target.value
                            }) : setGuest({
                                ...guest,
                                foodPreferences: e.target.value
                            })}
                        placeholder="Allergier & Specialkost"
                        className={cn("disabled:opacity-100 disabled:text-stone-400/70", (edit ? !editingGuest.willAttend : !guest.willAttend) && "placeholder:text-stone-400/70")}
                    />
                    <div className={cn("flex flex-row justify-between items-center bg-stone-400/10 rounded-xl shadow-sm px-3 py-2")}>
                        <div className="flex flex-col justify-center">
                            <Label htmlFor="alkoholfritt" className={cn((edit ? !editingGuest.willAttend : !guest.willAttend) && "text-stone-400/70")}>Alkoholfritt</Label>
                            <span className={cn("text-xs", (edit ? !editingGuest.willAttend : !guest.willAttend) && "text-stone-400/70")}>Alkoholfri dryck önskas.</span>
                        </div>
                        <Switch
                            id="alkoholfritt"
                            defaultChecked={edit ? editingGuest.alcoholPreference : guest.alcoholPreference}
                            checked={
                                edit ? editingGuest.alcoholPreference : guest.alcoholPreference
                            }
                            disabled={edit ? !editingGuest.willAttend : !guest.willAttend}
                            onCheckedChange={(checked) =>
                                edit ? setEditingGuest({
                                    ...editingGuest,
                                    alcoholPreference: checked
                                }) : setGuest({
                                    ...guest,
                                    alcoholPreference: checked
                                })}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2 bg-stone-400/10 rounded-xl shadow-sm px-3 py-2">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col justify-center">
                                <Label htmlFor="willAttend">Deltagande</Label>
                                <Label htmlFor="willAttend" className="text-xs">Personen kommer att närvara på bröllopet.</Label>
                            </div>
                            <Switch
                                id="willAttend"
                                defaultChecked={edit ? editingGuest.willAttend : guest.willAttend}
                                onCheckedChange={(checked) =>
                                    edit ? setEditingGuest({
                                        ...editingGuest,
                                        alcoholPreference: !checked && false,
                                        willAttend: checked,
                                        willAttendNuptials: !checked && false,
                                        willAttendReception: !checked && false,
                                    }) : setGuest({
                                        ...guest,
                                        alcoholPreference: !checked && false,
                                        willAttend: checked,
                                        willAttendNuptials: !checked && false,
                                        willAttendReception: !checked && false,
                                    })}
                            />

                        </div>
                        {(editingGuest.willAttend || guest.willAttend) && (
                            <>
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-col justify-center">
                                        <Label htmlFor="willAttendNuptials" className={cn((edit ? !editingGuest.willAttend : !guest.willAttend) && "text-stone-400/70")}>Vigsel</Label>
                                        <Label htmlFor="willAttendNuptials" className={cn("text-xs", (edit ? !editingGuest.willAttend : !guest.willAttend) && "text-stone-400/70")}>Personen kommer att närvara på vigseln.</Label>
                                    </div>
                                    <Switch
                                        id="willAttendNuptials"
                                        defaultChecked={
                                            edit ? editingGuest.willAttendNuptials : guest.willAttendNuptials
                                        }
                                        checked={
                                            edit ? editingGuest.willAttendNuptials : guest.willAttendNuptials
                                        }
                                        onCheckedChange={(checked) =>
                                            edit ? setEditingGuest({
                                                ...editingGuest,
                                                willAttendNuptials: editingGuest.willAttend ? checked : !checked
                                            }) : setGuest({
                                                ...guest,
                                                willAttendNuptials: guest.willAttend ? checked : !checked
                                            })}
                                        disabled={edit ? !editingGuest.willAttend : !guest.willAttend}

                                    />

                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-col justify-center">
                                        <Label htmlFor="willAttendReception" className={cn((edit ? !editingGuest.willAttend : !guest.willAttend) && "text-stone-400/70")}>Mottagning</Label>
                                        <Label htmlFor="willAttendReception" className={cn("text-xs", (edit ? !editingGuest.willAttend : !guest.willAttend) && "text-stone-400/70")}>Personen kommer att närvara på mottagningen.</Label>
                                    </div>
                                    <Switch
                                        id="willAttendReception"
                                        defaultChecked={
                                            edit ? editingGuest.willAttendReception : guest.willAttendReception
                                        }
                                        checked={
                                            edit ? editingGuest.willAttendReception : guest.willAttendReception
                                        }
                                        onCheckedChange={(checked) =>
                                            edit ? setEditingGuest({
                                                ...editingGuest,
                                                willAttendReception: editingGuest.willAttend ? checked : !checked
                                            }) : setGuest({
                                                ...guest,
                                                willAttendReception: guest.willAttend ? checked : !checked
                                            })}
                                        disabled={edit ? !editingGuest.willAttend : !guest.willAttend}
                                    />

                                </div>
                            </>
                        )}

                    </div>
                    <Button
                        type="button"
                        className="border border-black"
                        variant="success"
                        onClick={() => {
                            if ((guest.willAttend && !guest.willAttendNuptials && !guest.willAttendReception) || (editingGuest.willAttend && !editingGuest.willAttendNuptials && !editingGuest.willAttendReception)) {
                                toast.error("Ange vilken del av bröllopet personen kommer att delta vid.")
                            } else {
                                edit ? handleSave() : handleSubmit(); setOpen(false)
                            }
                        }}
                    >
                        {submitText}
                    </Button>
                    {edit &&
                        <Button
                            type="button"
                            variant="ghost"
                            className="hover:bg-stone-400/10 text-rose-500"
                            onClick={() => {
                                console.log(editIndex);
                                
                                editIndex !== undefined && handleOnDeleteGuest && handleOnDeleteGuest(editIndex)
                                setOpen(false)
                            }}
                        >
                            ta bort gäst
                        </Button>
                    }

                </div>
            </DialogContent>
        </Dialog>
    )
}