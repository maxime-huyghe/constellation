import { optionull, parseFormData } from "$lib/formData";
import type { Prisma, User } from "@prisma/client";
import { object, string } from "superstruct";
import type { RequestHandler } from "./__types/index.d";

export const get: RequestHandler<{ users: User[] }> = async ({ locals: { prisma } }) => {
  return {
    body: {
      users: await prisma.user.findMany(),
    },
  };
};

export const post: RequestHandler = async ({ request, locals: { prisma } }) => {
  const fd = await request.formData();
  const input: Prisma.UserCreateInput = parseFormData(
    fd,
    object({
      name: optionull(string()),
      email: string(),
    }),
  );

  const user = await prisma.user.create({
    data: input,
  });

  return {
    status: 303,
    headers: {
      location: `${request.url}/${user.id}`,
    },
  };
};
