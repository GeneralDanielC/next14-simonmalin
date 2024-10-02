import * as z from "zod";
import { Gift } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteGift } from "./schema";

export type InputType = z.infer<typeof DeleteGift>
export type ReturnType = ActionState<InputType, Gift>