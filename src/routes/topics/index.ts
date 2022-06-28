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

export const post: RequestHandler = async ({ request, locals: { prisma } }) => {
  const fd = await request.formData();
  const input = parseFormData(
    fd,
    object({
      title: string(),
      author: ToInt,
    }),
  );

  const topic = await prisma.topic.create({
    data: input,
  });

  return {
    status: 303,
    headers: {
      location: `${request.url}/${topic.id}/posts`,
    },
  };
};
