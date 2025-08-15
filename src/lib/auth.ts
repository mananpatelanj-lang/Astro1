
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";

export function signInMock(email: string) {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
  return token;
}

export function getUserEmailFromCookie(): string | null {
  const c = cookies().get("auth")?.value;
  if (!c) return null;
  try {
    const dec = jwt.verify(c, JWT_SECRET) as any;
    return dec.email as string;
  } catch {
    return null;
  }
}
