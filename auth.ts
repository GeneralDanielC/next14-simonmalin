import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";

import { getUserById } from "@/data/auth/user";
import { getTwoFactorConfirmationByUserId } from "@/data/auth/two-factor-confirmation";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getAccountByUserId } from "@/data/auth/account";

// A type extension of the default user session object to include additional properties.
// Allowing access to these properties via the session when a user is logged in.
export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;                 // adds a user role property
    isTwoFactorEnabled: boolean;    // indicates if two-factor authentication is enabled
    isOAuth: boolean;               // indicates if the user authenticated via OAuth
};

// Extension of the NextAuth types to include the custom user session properties.
declare module "next-auth" {
    interface Session { 
        user: ExtendedUser;     // Uses the ExtendedUser type for the user session
    }
}

// Destructuring the NextAuth configuration to export handlers for GET and POST requests, along with authentication helper functions.
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    // Configuration for custom pages instead of using NextAuth's defaults.
    pages: {
        signIn: "/auth/login",  // custom sign-in page path
        error: "/auth/error",   // redirect to this instead of pre-made error page by next-auth
    },
    // Event handlers for authentication events.
    events: {
        // An event that updates the email verification status upon linking an account.
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            });
        }
    },
    // Callback functions for customizing the authentication flow.
    callbacks: {
        // Prevents users from signing in if they have not verified their email.
        async signIn({ user, account }) {

            // Allows OAuth authentication without email verification.
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);

            // Prevents sign-in without email verification.
            if (!existingUser?.emailVerified) return false;

            // Additional check for two-factor authentication.
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id);

                if (!twoFactorConfirmation) return false;

                // Deletes the two-factor confirmation for the next sign-in.
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });
            }

            return true;
        },
        // Updates the session with additional user information.
        async session({ token, session }) {
            // Sets the user ID in the session object.
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            // Sets the user role in the session object.
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            // Enables two-factor authentication flag in the session.
            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            // Manually updates name and email in the session for consistency.
            if (session.user) {
                // this needs to be updated manually to update the name in the session.
                session.user.name = token.name;
                // this needs to be updated manually to update the email in the session.
                session.user.email = token.email;
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        // Updates the JWT token with additional user information. Needs both JWT and Session to work on the edge.
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            // Sets additional claims on the JWT token.
            token.isOAuth = !!existingAccount
            token.name = existingUser.name; // this needs to be updated manually to update the name in the session.
            token.email = existingUser.email; // this needs to be updated manually to update the email in the session.
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        }
    },
    // Configures the adapter to use Prisma for database operations.
    adapter: PrismaAdapter(db),
    // Configures session management to use JWT tokens.
    session: { strategy: "jwt" },
    // Spreads additional configuration options defined elsewhere.
    ...authConfig,
});