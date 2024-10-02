import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes";

const { auth } = NextAuth(authConfig);

const CLIENT_LOGIN_COOKIE = "client_auth";

// The default export of this module is a middleware function that handles authentication.
export default auth((req, ctx) => {
    // Extracts the nextUrl object from the request (req).
    const { nextUrl } = req;

    // Determines if the user is logged in by checking the presence of 'req.auth'.
    const isLoggedIn = !!req.auth;

    const clientAuth = req.cookies.get(CLIENT_LOGIN_COOKIE);

    // Checks if the requested path starts with the API auth prefix, indicating an API auth route.
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    // Checks if the requested path is listed as a public route, meaning no authentication is needed.
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // Checks if the requested path is listed as an auth route, which requires the user to be authenticated.
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // If the request is for an API auth route, no further action is taken (passes through).
    if (isApiAuthRoute) {
        return;
    }

    // If the request is for an auth route and the user is logged in, redirect to the default login redirect URL.
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        // If the user is not logged in, no action is taken (passes through).
        return;
    }

    // If the user is logged in (admin) and is trying to access a public route, no action is taken.
    if (isLoggedIn && isPublicRoute) {
        return;
    }

    // If the user is logged in (admin), but not client, and is trying to access a public route, no action is taken.
    if (isLoggedIn && !clientAuth && isPublicRoute) {
        return;
    }

    // If user tries accessing a protected route without the general password, redirect to client login
    if (!clientAuth && isPublicRoute) {
        let callbackUrl = nextUrl.pathname;


        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        // URL-encodes the callback URL to be passed as a query parameter.
        const encodedCallbackUrl = encodeURIComponent(callbackUrl)

        // Redirects to the login page with the callbackUrl query parameter.
        return Response.redirect(new URL(`/auth/client-login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    // If the user is not logged in and the route is not public, redirect to the login page with a callback URL.
    if (!isLoggedIn && !isPublicRoute) {
        // Constructs the callback URL from the requested path and query string.
        // When a logged out user is trying to access a protected route, the user will get redirected to login page with callbackUrl as an endpoint param. When the user then has logged in, the user will get reverted to this callbackUrl.
        let callbackUrl = nextUrl.pathname;


        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        // URL-encodes the callback URL to be passed as a query parameter.
        const encodedCallbackUrl = encodeURIComponent(callbackUrl)

        // Redirects to the login page with the callbackUrl query parameter.
        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    // If none of the above conditions are met, no action is taken (passes through).
    return;

});

// Configuration for the middleware to specify which paths it should be applied to.
// The matcher array contains regex patterns for the paths to include or exclude.
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}