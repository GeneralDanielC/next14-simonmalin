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
    id: string;
    firstName: string;
    lastName: string;
    foodPreferences?: string | undefined;
    alcoholPreference: boolean;
    willAttend: boolean;
    willAttendNuptials: boolean;
    willAttendReception: boolean;
};

interface RSVPFormProps {
    party?: PartyWithGuests
    mode?: 'rsvp' | 'editEntireParty',
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
        id: "",
        firstName: "",
        lastName: "",
        foodPreferences: "",
        alcoholPreference: false,
        willAttend: false,
        willAttendNuptials: false,
        willAttendReception: false,
    });
    const [guests, setGuests] = useState<Guest[]>(
        (party?.guests || []).map((guest) => ({
            id: guest.id || "",
            firstName: guest.firstName,
            lastName: guest.lastName,
            foodPreferences: guest.foodPreferences ?? "",
            alcoholPreference: guest.alcoholPreference,
            willAttend: guest.willAttend,
            willAttendNuptials: guest.willAttendNuptials,
            willAttendReception: guest.willAttendReception,
        }))
    );

    const [openAddGuest, setOpenAddGuest] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleAddGuest = () => {
        if (guest.firstName && guest.lastName) {
            setGuests(prevGuests => [...(prevGuests || []), guest]);
            setGuest({
                id: "",
                firstName: "",
                lastName: "",
                foodPreferences: "",
                alcoholPreference: false,
                willAttend: false,
                willAttendNuptials: false,
                willAttendReception: false,
            });
            setOpenAddGuest(false);
        } else {
            toast.error("Hoppsan! Ange både för- och efternamn och försök igen.")
        }
    }

    const handleEditGuest = (guest?: Guest) => {

        if (!guest) return toast.error("Något gick fel!")

        console.log("Function called");
        console.log("Guest", guest);
        console.log("Edit Index", editIndex);

        if (editIndex !== null) {
            console.log("Edit Index not null");

            if (guest.firstName && guest.lastName) {
                console.log("First and lastname not null");

                setGuests(prevGuests => {
                    const updatedGuests = [...prevGuests];
                    updatedGuests[editIndex] = guest; // Update the guest at the specified index

                    return updatedGuests;
                });

                // Clear the guest state and reset editIndex after saving
                setGuest({
                    id: "",
                    firstName: "",
                    lastName: "",
                    foodPreferences: "",
                    alcoholPreference: false,
                    willAttend: false,
                    willAttendNuptials: false,
                    willAttendReception: false,
                });
                setEditIndex(null);
            } else {
                console.log("First or last name null");

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
                    guests: guests
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
                        edit
                        setGuest={(updatedGuest) => {
                            setEditIndex(index);
                            setGuest
                        }}
                        handleOnOpen={() => {
                            console.log(index);
                            setEditIndex(index)
                        }}
                    >
                        <Button
                            variant="ghost"
                            className="hover:bg-stone-400/10 px-2"
                            disabled={pending}
                        >
                            <div className="w-full h-full flex flex-row justify-between border-b border-stone-400 border-dotted">
                                <span className="italic text-xs font-thin">{guest.firstName} {guest.lastName}</span>
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
                    handleOnOpen={() =>
                        setGuest({
                            id: "",
                            firstName: "",
                            lastName: "",
                            foodPreferences: "",
                            alcoholPreference: false,
                            willAttend: false,
                            willAttendNuptials: false,
                            willAttendReception: false,
                        })
                    }
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
            )}

            {/* <div className="w-full flex justify-center py-2">
                <Separator className="w-[90%] bg-stone-400/10" />
            </div> */}
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