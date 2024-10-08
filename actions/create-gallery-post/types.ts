import * as z from "zod";
import { GalleryPost } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateGalleryPost } from "./schema";

export type InputType = z.infer<typeof CreateGalleryPost>;
export type ReturnType = ActionState<InputType, { galleryPost: GalleryPost, presignedUrl: string }>;
