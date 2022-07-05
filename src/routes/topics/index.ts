import { parseFormData, ToInt } from "$lib/formData";
import { Prisma } from "@prisma/client";
import { object, string } from "superstruct";
import type { RequestHandler } from "./__types/index.d";

const topicWithAuthorName = Prisma.validator<Prisma.TopicArgs>()({
  include: { author: { select: { name: true } } },
});
export type TopicWithAuthorName = Prisma.TopicGetPayload<typeof topicWithAuthorName>;

export const get: RequestHandler<{ topics: TopicWithAuthorName[] }> = async ({
  locals: { prisma },
}) => {
  return {
    body: {
      topics: await prisma.topic.findMany({ include: { author: { select: { name: true } } } }),
    },
  };
};

export const post: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return {
      status: 401,
    };
  }
  const fd = await request.formData();
  const { title, text } = parseFormData(
    fd,
    object({
      title: string(),
      text: string(),
    }),
  );

  const topic = await locals.prisma.topic.create({
    data: {
      title,
      authorId: locals.user.id,
      posts: {
        create: {
          text,
          authorId: locals.user.id,
        },
      },
    },
  });

  return {
    status: 303,
    headers: {
      location: `${request.url}/${topic.id}/posts`,
    },
  };
};
