import * as z from "zod";
import { Party } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateRSVP } from "./schema";

export type InputType = z.infer<typeof CreateRSVP>
export type ReturnType = ActionState<InputType, Party>