import { PrismaClient } from "@prisma/client";
import type { Handle } from "@sveltejs/kit";

const PRISMA_CLIENT = new PrismaClient();

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.prisma = PRISMA_CLIENT;
  const response = resolve(event);
  return response;
};
