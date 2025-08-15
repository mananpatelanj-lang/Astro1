
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";

export function signInMock(email: string) {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
  return token;
}

export function getUserEmailFromCookie(): string | null {
  // In a React app, we'll use localStorage instead of cookies for simplicity
  const token = localStorage.getItem("auth");
  if (!token) return null;
  try {
    const dec = jwt.verify(token, JWT_SECRET) as any;
    return dec.email as string;
  } catch {
    return null;
  }
}

export function setAuthToken(token: string) {
  localStorage.setItem("auth", token);
}

export function removeAuthToken() {
  localStorage.removeItem("auth");
}
