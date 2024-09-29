import * as z from "zod";
import { Guest } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { EditGuestInParty } from "./schema";

export type InputType = z.infer<typeof EditGuestInParty>
export type ReturnType = ActionState<InputType, Guest>