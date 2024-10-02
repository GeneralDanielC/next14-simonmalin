import * as z from "zod";
import { Gift } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateGift } from "./schema";

export type InputType = z.infer<typeof CreateGift>
export type ReturnType = ActionState<InputType, Gift>