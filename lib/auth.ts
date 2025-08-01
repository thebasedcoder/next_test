// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.AUTH_SECRET || "super-secret-key-for-jwt";
const key = new TextEncoder().encode(secretKey);

// --- JWT ENCRYPTION ---
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h') // Token expires in 1 hour
    .sign(key);
}

// --- JWT DECRYPTION AND VALIDATION ---
export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // This will be caught if the token is invalid or expired
    console.log('Failed to verify token:', error);
    return null;
  }
}

// --- VALIDATE TOKEN (used in middleware) ---
export async function validateToken(token: string): Promise<boolean> {
  const payload = await decrypt(token);
  return payload !== null;
}

// --- LOGIN: CREATE SESSION ---
export async function createSession(userId: string, username: string) {
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  const session = await encrypt({ userId, username, expires });

  // Save the session in a secure, httpOnly cookie
  (await cookies()).set('auth_token', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires,
    sameSite: 'lax',
    path: '/',
  });
}

// --- LOGOUT: DESTROY SESSION ---
export async function deleteSession() {
  (await cookies()).delete('auth_token');
}

// --- GET CURRENT SESSION ---
export async function getSession() {
  const sessionCookie = (await cookies()).get('auth_token')?.value;
  if (!sessionCookie) return null;
  return await decrypt(sessionCookie);
}