"use client"

import { createGalleryPost } from "@/actions/create-gallery-post"
import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit"
import { FormSwitch } from "@/components/form/form-switch"
import { FormTextarea } from "@/components/form/form-textarea"
import { useAction } from "@/hooks/use-action"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"

export const UploadImageForm = () => {
    const formRef = useRef<ElementRef<"form">>(null);

    const [file, setFile] = useState<File | null>(null);
    const [hidden, setHidden] = useState<boolean>(false);

    const { execute, fieldErrors } = useAction(createGalleryPost, {
        onSuccess: async (data) => {
            if (data.presignedUrl && file) {
                const uploadResponse = await fetch(data.presignedUrl, {
                    method: "PUT",
                    body: file,
                });

                if (uploadResponse.ok) {
                    toast.success("Image uploaded successfully!");
                } else {
                    toast.error("Failed to upload image.");
                }
            }
        },
        onError: () => {
            toast.error("Something went wrong!");
        }
    });

    const handleSubmit = async (formData: FormData) => {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const comment = formData.get("comment") as string;
        const hidden = formData.get("hidden") === "on";

        if (file) {
            const fileName = file.name;
            const fileType = file.type;

            execute({ name, email, comment, fileName, fileType, hidden });
        }
    };

    return (
        <form ref={formRef} action={handleSubmit}>
            <FormInput id="name" placeholder="Namn" />
            <FormInput id="email" type="email" placeholder="E-postadress" />
            <FormTextarea id="comment" placeholder="Kommentarer" />
            <FormInput id="image" type="file" onChange={(e) => setFile(e.target.files[0])} />
            <FormSwitch id="hidden" label="Göm" description="Bilden kommer enbart vara synlig för brudparet." defaultChecked={hidden} onChange={(checked) => setHidden(checked)} />
            <FormSubmit>Ladda upp</FormSubmit>
        </form>
    )
}