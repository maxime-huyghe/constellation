import { deleteSession } from "$lib/auth";
import { parse, serialize } from "cookie";
import type { RequestHandler } from "./__types";

export const post: RequestHandler = async ({ locals, request, url }) => {
  const cookieHeader = request.headers.get("cookie");
  const cookies = parse(cookieHeader ?? "");
  if (cookies.session_id) {
    await deleteSession(locals.prisma, cookies.session_id);
  }
  const ref = url.searchParams.get("ref");
  return {
    status: 303,
    headers: {
      "Set-Cookie": serialize("session_id", "", {
        path: "/",
        expires: new Date(0),
      }),
      location: ref ?? "/",
    },
  };
};
