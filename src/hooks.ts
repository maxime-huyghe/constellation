import { PrismaClient } from "@prisma/client";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.prisma = new PrismaClient();
  const response = resolve(event);
  event.locals.prisma.$disconnect();
  return response;
};
