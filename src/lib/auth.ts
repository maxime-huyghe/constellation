import { Prisma, type PrismaClient, type Session, type User } from "@prisma/client";
import { randomBytes, pbkdf2 } from "crypto";

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

async function hashPassword(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    pbkdf2(Buffer.from(password, "utf8"), salt, 100_000, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      }
      resolve(key);
    });
  });
}

export async function createUser(
  prisma: PrismaClient,
  params: { email: string; username: string; password: string },
): Promise<User> {
  const salt = randomBytes(64);
  const hash = await hashPassword(params.password, salt);
  const newUser = prisma.user.create({
    data: {
      email: params.email,
      name: params.username,
      auth: {
        create: {
          hash,
          salt,
        },
      },
    },
  });

  return newUser;
}

export async function checkPassword(
  prisma: PrismaClient,
  user: User,
  password: string,
): Promise<boolean> {
  const auth = await prisma.userAuth.findUnique({ where: { userId: user.id } });
  // SAFETY: users are always created with a corresponding auth
  const calculatedHash = await hashPassword(password, auth!.salt);
  return calculatedHash.compare(auth!.hash) === 0;
}
