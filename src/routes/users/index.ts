import type { User } from "@prisma/client";
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
  const user = await prisma.user.create({
    data: {
      email: fd.get("email") as string,
      name: fd.get("name") as string,
    },
  });

  return {
    status: 303,
    headers: {
      location: `${request.url}/${user.id}`,
    },
  };
};
