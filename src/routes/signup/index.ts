import { createSession, createUser } from "$lib/auth";
import { parseFormData } from "$lib/formData";
import { object, string } from "superstruct";
import { serialize } from "cookie";
import type { RequestHandler } from "./__types";

export const get: RequestHandler = async ({ url, locals }) => {
  const ref = url.searchParams.get("ref");
  if (locals.user) {
    return {
      status: 303,
      headers: { location: ref ?? "/" },
    };
  }

  return {
    status: 200,
  };
};

export const post: RequestHandler = async ({ request, locals, url }) => {
  const fd = await request.formData();
  const input = parseFormData(
    fd,
    object({ email: string(), username: string(), password: string() }),
  );
  const user = await createUser(locals.prisma, input);
  const { id } = await createSession(locals.prisma, user.id);
  const ref = url.searchParams.get("ref");
  return {
    status: 303,
    headers: {
      "Set-Cookie": serialize("session_id", id, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // one week
      }),
      location: ref ?? "/users/me",
    },
  };
};
