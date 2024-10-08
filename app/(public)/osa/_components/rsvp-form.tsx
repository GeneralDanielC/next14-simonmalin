"use client";

import { toast } from "sonner";
import { ElementRef, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/components/form/form-input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { createRSVP } from "@/actions/create-rsvp";
import { GuestForm } from "./guest-form";
import { useFormStatus } from "react-dom";
import { PartyWithGuests } from "@/types";
import { editRSVP } from "@/actions/edit-rsvp";

export type Guest = {
    id?: string;
    firstName: string;
    lastName: string;
    foodPreferences: string;
    alcoholPreference: boolean;
    willAttend: boolean;
};

interface RSVPFormProps {
    party?: PartyWithGuests
    mode?: 'edit' | 'rsvp' | 'editEntireParty',
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

export const RSVPForm = ({
    party,
    mode = "rsvp",
    setSuccess
}: RSVPFormProps) => {
    const formRef = useRef<ElementRef<"form">>(null);
    const { pending } = useFormStatus();

    const [guest, setGuest] = useState<Guest>({
        firstName: "",
        lastName: "",
        foodPreferences: "",
        alcoholPreference: false,
        willAttend: false,
    });
    const [guests, setGuests] = useState<Guest[]>(party?.guests || []);
    const [openAddGuest, setOpenAddGuest] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleAddGuest = () => {
        if (guest.firstName && guest.lastName) {
            setGuests(prevGuests => [...(prevGuests || []), guest]);
            setGuest({
                firstName: "",
                lastName: "",
                foodPreferences: "",
                alcoholPreference: false,
                willAttend: false,
            });
            setOpenAddGuest(false);
        } else {
            toast.error("Hoppsan! Ange både för- och efternamn och försök igen.")
        }
    }

    const handleEditGuest = () => {
        if (editIndex !== null) {
            if (guest.firstName && guest.lastName) {
                setGuests(prevGuests => {
                    const updatedGuests = [...prevGuests];
                    updatedGuests[editIndex] = guest; // Update the guest at the specified index
                    return updatedGuests;
                });
                setGuest({
                    firstName: "",
                    lastName: "",
                    foodPreferences: "",
                    alcoholPreference: false,
                    willAttend: false,
                });
                setEditIndex(null); // Clear the edit index after editing
            } else {
                toast.error("Hoppsan! Ange både för- och efternamn och försök igen.")
            }
        }
    };


    const { execute: executeRSVP, fieldErrors: fieldErrorsRSVP } = useAction(createRSVP, {
        onSuccess: (data) => {
            toast.success(`Tack! Dina val är inskickade! Håll koll på mejlen för bekräftelse.`);
            formRef.current?.reset();
            setSuccess(true);
            setGuests([]);
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const { execute: executeEditRSVP, fieldErrors: fieldErrorsEdit } = useAction(editRSVP, {
        onSuccess: (data) => {
            toast.success(`Tack! Dina val är sparade! Håll koll på mejlen för bekräftelse.`);
            formRef.current?.reset();
            setSuccess(true);
            setGuests([]);
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const handleSubmit = (formData: FormData) => {
        const email = formData.get("email") as string;
        
        if (mode === "rsvp") {
            executeRSVP({
                email,
                guests
            });
        }
    }

    const handleSubmitEdit = (formData: FormData) => {
        const email = formData.get("email") as string;
        
        if (party?.id) {
            console.log(guests);
            
            if (mode === "editEntireParty") {
                executeEditRSVP({
                    partyId: party.id, 
                    email,
                    guests
                })
            }
        }
    }
    

    return (
        <div className="flex flex-col gap-y-2">
            {/* List of guests in the party */}
            <div className="flex flex-col">
                {guests?.map((guest, index) => (
                    <GuestForm
                        key={index}
                        dialogTitle={`Ändra ${guest.firstName} ${guest.lastName}`}
                        dialogDescription="Här kan du göra ändringar."
                        submitText="Spara"
                        handleSubmit={handleEditGuest}
                        guest={guest}
                        setGuest={(updatedGuest) => {
                            setEditIndex(index);
                            setGuest(updatedGuest);
                        }}
                    >
                        <Button
                            variant="ghost"
                            className="hover:bg-stone-400/10 px-2"
                            disabled={pending}
                        >
                            <div className="w-full h-full flex flex-row justify-between border-b border-stone-400 border-dotted">
                                <span className="italic text-xs font-thin">{guest.firstName} {guest.lastName}</span>
                                <ArrowRight className="size-4" />
                            </div>
                        </Button>
                    </GuestForm>
                ))}
            </div>

            {mode === "rsvp" && (
                <GuestForm
                    dialogTitle="Ny gäst"
                    dialogDescription="Här kan du lägga till fler gäster i ditt sällskap."
                    submitText="Lägg till"
                    handleSubmit={handleAddGuest}
                    guest={guest}
                    setGuest={setGuest}
                >
                    <Button
                        variant="link"
                        size={"sm"}
                        className="text-xs border border-black rounded-xl"
                        disabled={pending}
                    >
                        Lägg till gäst...
                    </Button>
                </GuestForm>
                // <Dialog open={openAddGuest} onOpenChange={(open) => {
                //     if (open) {
                //         setGuest({
                //             firstName: "",
                //             lastName: "",
                //             foodPreferences: "",
                //             alcoholPreference: false,
                //             willAttend: false,
                //         });
                //     }
                //     setOpenAddGuest(open)
                // }}>
                //     <DialogTrigger asChild>
                //         <Button
                //             variant="primary"
                //             disabled={pending}
                //         >
                //             Lägg till gäst...
                //         </Button>
                //     </DialogTrigger>
                //     <DialogContent>
                //         <DialogHeader>
                //             <DialogTitle>Ny gäst</DialogTitle>
                //             <DialogDescription className="text-xs">Här kan du lägga till fler gäster i ditt sällskap.</DialogDescription>
                //         </DialogHeader>
                //         <div className="flex flex-col gap-y-2">
                //             <div className="w-full flex flex-row gap-x-2">
                //                 <FormInput
                //                     id="firstName"
                //                     value={guest.firstName}
                //                     onChange={(e) => setGuest({ ...guest, firstName: e.target.value })}
                //                     placeholder="Förnamn"
                //                 />
                //                 <FormInput
                //                     id="lastName"
                //                     value={guest.lastName}
                //                     onChange={(e) => setGuest({ ...guest, lastName: e.target.value })}
                //                     placeholder="Förnamn"
                //                 />
                //             </div>
                //             <FormInput
                //                 id="foodPreferences"
                //                 value={guest.foodPreferences}
                //                 onChange={(e) => setGuest({ ...guest, foodPreferences: e.target.value })}
                //                 placeholder="Allergier & Specialkost"
                //             />
                //             <div className="flex flex-row justify-between items-center bg-stone-400/10 rounded-xl shadow-sm px-3 py-2">
                //                 <div className="flex flex-col justify-center">
                //                     <Label htmlFor="alkoholfritt">Alkoholfritt</Label>
                //                     <span className="text-xs">Om alkoholfri dryck önskas.</span>
                //                 </div>
                //                 <Switch
                //                     id="alkoholfritt"
                //                     checked={guest.alcoholPreference}
                //                     onCheckedChange={(checked) => setGuest({ ...guest, alcoholPreference: checked })}
                //                 />
                //             </div>
                //             <div className="flex flex-row justify-between items-center bg-stone-400/10 rounded-xl shadow-sm px-3 py-2">
                //                 <div className="flex flex-col justify-center">
                //                     <Label htmlFor="willAttend">Deltagande</Label>
                //                     <span className="text-xs">Om personen kommer att närvara på bröllopet.</span>
                //                 </div>
                //                 <Switch
                //                     id="willAttend"
                //                     checked={guest.willAttend}
                //                     onCheckedChange={(checked) => setGuest({ ...guest, willAttend: checked })}
                //                 />
                //             </div>
                //             <Button
                //                 variant="success"
                //                 onClick={handleAddGuest}
                //             >
                //                 Lägg till
                //             </Button>
                //         </div>
                //     </DialogContent>
                // </Dialog>
            )}

            <div className="w-full flex justify-center py-2">
                <Separator className="w-[90%] bg-stone-400/10" />
            </div>
            <form
                ref={formRef}
                action={mode === "rsvp" ? handleSubmit : handleSubmitEdit}
                className="w-full flex flex-col gap-y-2"
            >
                <FormInput
                    id="email"
                    defaultValue={party?.email}
                    type="email"
                    placeholder="E-postadress"
                    errors={fieldErrorsRSVP || fieldErrorsEdit}
                />
                <FormSubmit
                    className="w-full" variant="success"
                >
                    {mode === "rsvp" ? "Skicka" : "Spara"}
                </FormSubmit>
            </form>
        </div>
    )
}