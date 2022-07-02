import { Prisma, type PrismaClient, type Session } from "@prisma/client";

export async function createSession(prisma: PrismaClient, userId: number): Promise<Session> {
  return prisma.session.create({ data: { userId } });
}

const includeQuery = { user: { select: { email: true, id: true, name: true } } };
const sessionWithUser = Prisma.validator<Prisma.SessionArgs>()({
  include: includeQuery,
});
type SessionWithUser = Prisma.SessionGetPayload<typeof sessionWithUser>;
export async function getSessionWithUser(
  prisma: PrismaClient,
  sessionId: string,
): Promise<SessionWithUser | null> {
  return prisma.session.findUnique({
    where: { id: sessionId },
    include: includeQuery,
  });
}

export async function deleteSession(prisma: PrismaClient, sessionId: string) {
  return prisma.session.delete({ where: { id: sessionId } });
}
