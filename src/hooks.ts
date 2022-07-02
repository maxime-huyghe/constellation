import { getSessionWithUser } from "$lib/auth";
import { PrismaClient } from "@prisma/client";
import type { GetSession, Handle } from "@sveltejs/kit";
import { parse } from "cookie";

const PRISMA_CLIENT = new PrismaClient();

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = parse(event.request.headers.get("cookie") || "");
  if (cookies.session_id) {
    const session = await getSessionWithUser(PRISMA_CLIENT, cookies.session_id);
    if (session) {
      event.locals.user = session.user;
    }
  }
  event.locals.prisma = PRISMA_CLIENT;
  const response = await resolve(event);
  return response;
};

export const getSession: GetSession = async ({ locals }) => {
  return {
    user: locals.user ?? null,
  };
};
