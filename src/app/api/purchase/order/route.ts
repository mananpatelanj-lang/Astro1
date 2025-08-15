
import { NextRequest, NextResponse } from "next/server";
import { getUserEmailFromCookie } from "@/lib/auth";
import { ensureUserAndQuotas, applyPack } from "@/lib/quotas";

export async function POST(req: NextRequest) {
  const email = getUserEmailFromCookie();
  if (!email) return NextResponse.redirect(new URL('/api/auth/mock', req.url));
  
  const { user } = await ensureUserAndQuotas(email);
  
  // DEV: immediately apply pack (replace with real Razorpay flow + webhook in prod)
  await applyPack(user.id);
  
  return NextResponse.redirect(new URL('/dashboard', req.url));
}
