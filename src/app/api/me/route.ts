
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureUserAndQuotas } from "@/lib/quotas";
import { getUserEmailFromCookie } from "@/lib/auth";

export async function GET() {
  const email = getUserEmailFromCookie();
  if (!email) return NextResponse.json(null);
  
  const { user } = await ensureUserAndQuotas(email);
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { quotas: true, identities: true }
  });
  
  if (!dbUser) return NextResponse.json(null);
  
  // Auto-transition to PRO_EXPIRED if needed
  if (dbUser.state === 'PRO_ACTIVE' && dbUser.proExpiresAt && dbUser.proExpiresAt < new Date()) {
    await prisma.user.update({
      where: { id: dbUser.id },
      data: { state: 'PRO_EXPIRED' }
    });
  }
  
  return NextResponse.json({
    email,
    state: dbUser.state,
    proExpiresAt: dbUser.proExpiresAt,
    quotas: dbUser.quotas ?? { trialTotal: 0, trialUsed: 0, emailTotal: 0, emailUsed: 0 },
    identities: dbUser.identities.map(p => ({
      id: p.id,
      label: p.label,
      fullName: p.fullName,
      dob: p.dob,
      tob: p.tob,
      place: p.place
    }))
  });
}
