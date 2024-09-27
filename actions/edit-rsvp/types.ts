import * as z from "zod";
import { Party } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { EditRSVP } from "./schema";

export type InputType = z.infer<typeof EditRSVP>
export type ReturnType = ActionState<InputType, Party>