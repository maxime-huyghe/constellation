import { parseFormData } from "$lib/formData";
import { Prisma } from "@prisma/client";
import { object, string } from "superstruct";
import type { RequestHandler } from "./__types";

const query = {
  include: { author: { select: { name: true } }, posts: { include: { author: true } } },
};
const topicWithAuthorNameAndPostsWithTheirAuthors = Prisma.validator<Prisma.TopicArgs>()(query);
export type TopicWithAuthorNameAndPostsWithTheirAuthors = Prisma.TopicGetPayload<
  typeof topicWithAuthorNameAndPostsWithTheirAuthors
>;

export const get: RequestHandler<{
  topic: TopicWithAuthorNameAndPostsWithTheirAuthors;
}> = async ({ locals: { prisma }, params }) => {
  const topic = await prisma.topic.findUnique({
    where: { id: parseInt(params.topicId, 10) },
    ...query,
  });
  if (!topic) {
    return { status: 404 };
  }
  return {
    body: {
      topic,
    },
  };
};

export const post: RequestHandler = async ({ locals, request, params }) => {
  const fd = await request.formData();
  const input = parseFormData(fd, object({ text: string() }));
  const topicId = parseInt(params.topicId, 10);
  const authorId = 1; // TODO: get from session when implemented
  const post = await locals.prisma.post.create({
    data: { ...input, authorId, topicId },
  });
  return {
    status: 303,
    headers: {
      location: `${request.url}#${post.id}`,
    },
  };
};
