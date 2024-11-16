import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';

// Define the type of the extended Prisma client
const extendedPrismaClient = new PrismaClient().$extends(withAccelerate());
type ExtendedPrismaClient = typeof extendedPrismaClient;

// Declare global for ExtendedPrismaClient
declare global {
    var prisma: ExtendedPrismaClient | undefined;
}

// Create or assign the Prisma client
export const db = globalThis.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
