import * as z from "zod";
import { Gift } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateGiftOrder } from "./schema";

export type InputType = z.infer<typeof UpdateGiftOrder>
export type ReturnType = ActionState<InputType, Gift[]>