
import { prisma } from "./db";
import { addDays } from "date-fns";

export const PACK_TRIALS = 3;
export const PACK_EMAILS = 3;
export const PLAN_DAYS = 30;

export async function ensureUserAndQuotas(email: string) {
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email } });
  }
  
  let quotas = await prisma.quotas.findUnique({ where: { userId: user.id } });
  if (!quotas) {
    quotas = await prisma.quotas.create({ data: { userId: user.id } });
  }
  
  return { user, quotas };
}

export async function applyPack(userId: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      state: "PRO_ACTIVE",
      proExpiresAt: addDays(new Date(), PLAN_DAYS),
    },
  });
  
  await prisma.quotas.update({
    where: { userId },
    data: {
      trialTotal: { increment: PACK_TRIALS },
      emailTotal: { increment: PACK_EMAILS },
      cycleEnd: addDays(new Date(), PLAN_DAYS),
    },
  });
  
  return user;
}
