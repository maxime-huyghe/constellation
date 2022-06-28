import { Prisma } from "@prisma/client";
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
