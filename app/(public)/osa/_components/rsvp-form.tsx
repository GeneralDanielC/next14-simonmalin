"use client";

import { toast } from "sonner";
import { ElementRef, useEffect, useRef, useState } from "react";
import { ArrowRight, Trash } from "lucide-react";


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
    const [isPending, setIsPending] = useState<boolean>(false);

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
        } else {
            toast.error("Hoppsan! Ange både för- och efternamn och försök igen.")
        }
    }

    const handleEditGuest = (updatedGuest?: Guest) => {

        if (!updatedGuest) return toast.error("Något gick fel!")

        if (editIndex !== null) {
            if (updatedGuest.firstName && updatedGuest.lastName) {

                setGuests((prevGuests) => {
                    console.log("prevGuests", prevGuests);
                    console.log("Guest", updatedGuest);

                    const updatedGuests = [...prevGuests];
                    updatedGuests[editIndex] = updatedGuest; // Update the specific guest
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
            setIsPending(false);
        },
        onError: (error) => {
            toast.error(error);
            setIsPending(false);
        }
    });

    const { execute: executeEditRSVP, fieldErrors: fieldErrorsEdit } = useAction(editRSVP, {
        onSuccess: (data) => {
            toast.success(`Tack! Dina val är sparade! Håll koll på mejlen för bekräftelse.`);
            formRef.current?.reset();
            setSuccess(true);
            setGuests([]);
            setIsPending(false);
        },
        onError: (error) => {
            toast.error(error);
            setIsPending(false);
        },
    });

    const handleSubmit = (formData: FormData) => {
        setIsPending(true);

        const email = formData.get("email") as string;

        if (mode === "rsvp") {
            executeRSVP({
                email,
                guests
            });
        }
    }

    const handleSubmitEdit = (formData: FormData) => {
        setIsPending(true);

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

    const handleOnDeleteGuest = (index: number) => {
        setGuests((prevGuests) => prevGuests.filter((_, i) => i !== index));
    };

    useEffect(() => {
        console.log(isPending);

    }, [isPending])

    return (
        <div className="flex flex-col gap-y-2 mt-4">
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
                    className="bg-transparent border border-black"
                />

                {mode === "rsvp" && (
                    <GuestForm
                        dialogTitle="Ny gäst"
                        dialogDescription="Lägg till fler gäster i ditt sällskap."
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
                            className="text-xs border border-black rounded-xl"
                            disabled={isPending}
                        >
                            Lägg till gäst...
                        </Button>
                    </GuestForm>
                )}

                {/* List of guests in the party */}
                <div className="flex flex-col">
                    {guests?.map((guest, index) => (
                        <GuestForm
                            key={index}
                            dialogTitle={`Ändra ${guest.firstName} ${guest.lastName}`}
                            dialogDescription="Gör ändringar här."
                            submitText="Spara"
                            handleSubmit={handleEditGuest}
                            guest={guest}
                            edit
                            setGuest={() => {
                                setEditIndex(index);
                                setGuest
                            }}
                            handleOnOpen={() => {
                                setEditIndex(index)
                            }}
                            editIndex={index}
                            handleOnDeleteGuest={handleOnDeleteGuest}
                        >
                            <div className="flex flex-row justify-between items-center">
                                <Button
                                    variant="ghost"
                                    className="hover:bg-stone-400/10 px-2 w-full h-full"
                                    disabled={isPending}
                                    type="button"
                                >
                                    <div className="w-full h-full flex flex-col border-b border-stone-400 border-dotted text-left pb-1.5">
                                        <span className="text-lg font-thin">{guest.firstName} {guest.lastName}</span>
                                        <div className="text-stone-500 flex flex-col font-thin">
                                            {guest.willAttend && (
                                                <>
                                                    <span>{guest.foodPreferences ? guest.foodPreferences : "Inga allergier"}</span>
                                                    <span>{guest.alcoholPreference ? "Önskar alkoholfritt" : "Önskar inte alkoholfritt"}</span>
                                                </>
                                            )}
                                            <span>
                                                {guest.willAttend && guest.willAttendNuptials && guest.willAttendReception && "Deltar på vigseln och mottagning"}
                                                {guest.willAttend && guest.willAttendNuptials && !guest.willAttendReception && "Deltar enbart på vigseln"}
                                                {guest.willAttend && !guest.willAttendNuptials && guest.willAttendReception && "Deltar enbart på mottagning"}
                                                {guest.willAttend && !guest.willAttendNuptials && !guest.willAttendReception && "Något gick fel"}
                                                {!guest.willAttend && !guest.willAttendNuptials && !guest.willAttendReception && "Deltar inte på bröllopet"}
                                            </span>
                                        </div>
                                    </div>
                                </Button>
                                {/* <Button
                                    className="flex-none w-10 hover:bg-stone-400/10"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleOnDeleteGuest(index)}
                                    type="button"
                                >
                                    <Trash className="size-3" />
                                </Button> */}
                            </div>
                        </GuestForm>
                    ))}
                </div>

                <FormSubmit
                    className="w-full border border-black" variant="success"
                >
                    {mode === "rsvp" ? "Skicka" : "Spara"}
                </FormSubmit>
            </form>
        </div>
    )
}