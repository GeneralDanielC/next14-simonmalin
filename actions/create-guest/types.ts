import * as z from "zod";
import { Guest } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateGuest } from "./schema";

export type InputType = z.infer<typeof CreateGuest>
export type ReturnType = ActionState<InputType, Guest>