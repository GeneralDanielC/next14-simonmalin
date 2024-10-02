import * as z from "zod";
import { Party } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateParty } from "./schema";

export type InputType = z.infer<typeof CreateParty>
export type ReturnType = ActionState<InputType, Party>