
// Simple client-side auth without jsonwebtoken dependency
const AUTH_KEY = "astro-auth";

export function signInMock(email: string) {
  // Create a simple token-like structure for client-side storage
  const authData = {
    email,
    timestamp: Date.now(),
    expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
  };
  const token = btoa(JSON.stringify(authData)); // Base64 encode
  return token;
}

export function getUserEmailFromCookie(): string | null {
  const token = localStorage.getItem(AUTH_KEY);
  if (!token) return null;
  
  try {
    const authData = JSON.parse(atob(token));
    
    // Check if token is expired
    if (Date.now() > authData.expiresAt) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    
    return authData.email as string;
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

export function setAuthToken(token: string) {
  localStorage.setItem(AUTH_KEY, token);
}

export function removeAuthToken() {
  localStorage.removeItem(AUTH_KEY);
}
