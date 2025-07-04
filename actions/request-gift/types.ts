import * as z from "zod";
import { Gift, GiftAssignment } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { RequestGift } from "./schema";

export type InputType = z.infer<typeof RequestGift>
export type ReturnType = ActionState<InputType, GiftAssignment>