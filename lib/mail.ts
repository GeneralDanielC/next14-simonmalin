import { getUserByEmail } from "@/data/auth/user";
import { GiftWithAssignments, PartyWithGuests } from "@/types";
import { Gift, GiftAssignment, Guest, Party } from "@prisma/client";
import { Resend } from "resend";

// Create a new instance of the Resend class using the API key from environment variables.
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the domain variable using the environment variable which holds the application's URL.
const domain = process.env.NEXT_PUBLIC_APP_URL;
const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

// Define an asynchronous function to send a two-factor authentication (2FA) code via email.
export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    await resend.emails.send({
        from: "Malin & Simons bröllop <info@malinsimon2025.se>",
        to: email,
        subject: `Malin & Simon // 2FA Code: ${token}`,
        html: `<p>Your 2FA code: ${token}</p>`,
    });
}

// Define an asynchronous function to send a password reset email.
export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "Malin & Simons bröllop <info@malinsimon2025.se>",
        to: email,
        subject: "Malin & Simon // Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    });
}

// Define an asynchronous function to send an email verification email.
export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "Malin & Simons bröllop <info@malinsimon2025.se>",
        to: email,
        subject: "Malin & Simon // Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
}

export const sendRSVPConfirmation = async (
    email: string,
    party: PartyWithGuests,
) => {
    const link = `${domain}/osa/${party.id}`;

    const guestDetails = party?.guests.map(guest => `
        <div style="margin-bottom: 16px;">
            <h2 style="margin: 0;">${guest.firstName} ${guest.lastName}</h2>
            <p style="margin: 0;"><strong>Allergier & Specialkost:</strong> ${guest.foodPreferences || 'Inga'}</p>
            <p style="margin: 0;"><strong>Alkoholfritt:</strong> ${guest.alcoholPreference ? 'Ja' : 'Nej'}</p>
            <p style="margin: 0;"><strong>Kommer att närvara:</strong> ${guest.willAttend ? 'Ja' : 'Nej'}</p>
            ${guest.willAttend ? 
                `<p style="margin: 0;"><strong>Närvara på vigsel:</strong> ${guest.willAttendNuptials ? 'Ja' : 'Nej'}</p>
            <p style="margin: 0;"><strong>Närvara på mottagning:</strong> ${guest.willAttendReception ? 'Ja' : 'Nej'}</p>` : ""}
            <br/>
        </div>
        `).join('');

    await resend.emails.send({
        from: "Malin & Simons bröllop <info@malinsimon2025.se>",
        to: email,
        subject: `Malin & Simons bröllop // OSA Bekräftelse`,
        html: `
            <h1>Tack!</h1>
            <p>Vi ser fram emot att se er på bröllopet!</p>
            <p>Här är detaljerna för ditt sällskap:</p>
            ${guestDetails}
            <a href="${link}">Klicka här för att se och ändra dina val.</a>
            <br/>
            <p>Du kan inte svara på detta mejl.</p>
        `
    });
}

export const sendNewAssignedGiftToClient = async (
    email: string,
    gift: Gift
) => {
    await resend.emails.send({
        from: "Malin & Simons bröllop <info@malinsimon2025.se>",
        to: email,
        subject: `Malin & Simons bröllop // Presentbekräftelse`,
        html: `
            <h1>Tack!</h1>
            <p>Dina val:</p>
            <p style="font-weight: bold;">${gift.title}</p>
            <p style="">${gift.backstory}</p>
            <a href=${gift.url}>${gift.url}</a>
            <br/>
            <p>Du kan inte svara på detta mejl.</p>
            `
    });
}

export const sendGiftConfirmation = async (
    email: string,
    gift: GiftWithAssignments,
    giftAssignment: GiftAssignment
) => {
    await resend.emails.send({
        from: "Malin & Simons bröllop <info@malinsimon2025.se>",
        to: email,
        subject: `Malin & Simons bröllop // Presentbekräftelse`,
        html: `
            <h1>Tack! Presenten är nu paxad.</h1>
            <p>Kontakta ${supportEmail} om du inte längre vill köpa denna present.</p>
            <br/>
            <p style="font-weight: bold;">Presentinfo</p>
            <p style="">${gift.title}</p>
            <p style="">${gift.backstory}</p>
            <p style="">${gift.quantity && `Antal: ${giftAssignment.count}`}</p>
            <a href=${gift.url}>${gift.url}</a>
            <br/>
            <p>Du kan inte svara på detta mejl.</p>
            `
    });
}
