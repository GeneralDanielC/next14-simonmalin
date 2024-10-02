import * as z from "zod";
import { Gift } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { ClientLogin } from "./schema";

export type InputType = z.infer<typeof ClientLogin>
export type ReturnType = ActionState<InputType, boolean>