"use client";

import { FormSubmit } from "@/components/form/form-submit";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Guest } from "@prisma/client";
import { ChevronsRight } from "lucide-react";

interface ConfirmDialogProps {
    mode: "rsvp" | "editEntireParty"
    guests?: Guest[]
    email?: string
    formRef: React.RefObject<HTMLFormElement>
}

export const ConfirmDialog = ({
    mode,
    guests,
    email,
    formRef
}: ConfirmDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className={cn("w-full border border-black")} variant="success" disabled={mode === "rsvp" && guests?.length === 0 || !email}>
                    Fortsätt
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-h-[80vh] overflow-hidden">
                <AlertDialogHeader className="text-left">
                    <AlertDialogTitle>Är du säker?</AlertDialogTitle>
                    <AlertDialogDescription className="text-black">Vänligen kontrollera följande:</AlertDialogDescription>
                    <div className="flex flex-col text-sm gap-y-1">
                        <div className="flex flex-row gap-x-3 items-center">
                            <ChevronsRight className="size-5" />
                            <span>Alla gäster i ditt sällskap, <span className="font-semibold">inklusive du själv</span> står nedan.</span>
                        </div>
                        <div className="flex flex-row gap-x-3 items-center">
                            <ChevronsRight className="size-5" />
                            <span>Gästernas val stämmer.</span>
                        </div>
                        <div className="flex flex-row gap-x-3 items-center">
                            <ChevronsRight className="size-5" />
                            <span>Den angivna e-postadressen stämmer.</span>
                        </div>
                    </div>
                </AlertDialogHeader>
                <div className="flex flex-col mb-[-10px] mt-3">
                    <span className="text-xs">E-postadress</span>
                    <span className="text-sm">{email}</span>
                </div>
                <div className="overflow-y-auto max-h-[200px] rounded-md relative"
                    style={{
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)"
                    }}>
                    {guests?.map((guest, index) => (
                        <div key={index} className={cn("w-full h-fit flex flex-col border-b border-stone-400 border-dotted text-left pb-1.5", index === guests.length - 1 && "mb-6", index === 0 && "mt-5")}>
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
                    ))}
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Tillbaka</AlertDialogCancel>
                    <FormSubmit
                        className="w-full border border-black" variant="success"
                        onClick={() => formRef.current?.requestSubmit()}
                        >
                        {mode === "rsvp" ? "Skicka" : "Spara"}
                    </FormSubmit>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}