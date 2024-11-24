"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { ClientLogin } from "./schema";
import { getPartyByEmail } from "@/data/data";
import { sendRSVPConfirmation } from "@/lib/mail";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const CLIENT_LOGIN_COOKIE = 'client_auth';

const handler = async (data: InputType): Promise<ReturnType> => {

    const { password } = data;

    const websitePassword = process.env.NEXT_PUBLIC_WEBSITE_PASSWORD || "MS9697";

    if (password !== websitePassword) return { error: "Incorrect Password." }

    cookies().set(CLIENT_LOGIN_COOKIE, 'authenticated', { path: '/', maxAge: 60 * 60 * 24 * 7 });

    revalidatePath(`/auth/client-login`);
    return { data: true };
}

export const clientLogin = createSafeAction(ClientLogin, handler);