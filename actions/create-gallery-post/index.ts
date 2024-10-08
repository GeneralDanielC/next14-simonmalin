"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateGalleryPost } from "./schema";
import { generatePresignedUrl } from "@/lib/r2";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { name, email, comment, fileName, fileType, hidden } = data;

    if (!email) return { error: "Something went wrong! Missing email." };

    // Generate presigned URL for file upload
    const presignedUrl = await generatePresignedUrl(fileName, fileType);

    let galleryPost;
    try {
        galleryPost = await db.galleryPost.create({
            data: {
                name,
                email,
                comment,
                imgUrl: `https://${process.env.NEXT_PUBLIC_R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/${fileName}`,
                hidden,
            },
        });
    } catch (error) {
        console.error(error);
        return { error: "Failed to create gallery post." };
    }

    revalidatePath(`/gallery`);
    return { data: { galleryPost, presignedUrl } };
};

export const createGalleryPost = createSafeAction(CreateGalleryPost, handler);
