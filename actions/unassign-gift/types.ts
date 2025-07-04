import * as z from "zod";
import { GiftAssignment } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UnassignGift } from "./schema";

export type InputType = z.infer<typeof UnassignGift>
export type ReturnType = ActionState<InputType, GiftAssignment>