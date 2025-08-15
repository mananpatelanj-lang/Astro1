
import { NextRequest, NextResponse } from "next/server";
import { signInMock } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") || `user${Math.floor(Math.random() * 999)}@demo.local`;
  const token = signInMock(email);
  const res = NextResponse.redirect(new URL("/dashboard", req.url));
  res.cookies.set("auth", token, { 
    httpOnly: true, 
    path: "/", 
    maxAge: 60 * 60 * 24 * 30 
  });
  return res;
}
