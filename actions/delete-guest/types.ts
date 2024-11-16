import * as z from "zod";
import { Guest } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteGuest } from "./schema";

export type InputType = z.infer<typeof DeleteGuest>
export type ReturnType = ActionState<InputType, Guest>