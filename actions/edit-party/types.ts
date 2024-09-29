import * as z from "zod";
import { Party } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { EditParty } from "./schema";

export type InputType = z.infer<typeof EditParty>
export type ReturnType = ActionState<InputType, Party>