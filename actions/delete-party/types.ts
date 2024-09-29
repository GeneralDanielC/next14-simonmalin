import * as z from "zod";
import { Party } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteParty } from "./schema";

export type InputType = z.infer<typeof DeleteParty>
export type ReturnType = ActionState<InputType, Party>