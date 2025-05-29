export * from './try-catch'
export * from './get-secret'
export * from './cookie'






// // ✅ lib/auth.ts
// import bcrypt from 'bcryptjs';
// import { getAuthCookie } from './cookies';
// import { verifyJwt } from './jwt';
// import { db } from './db';

// export function hashPassword(password: string) {
//   return bcrypt.hash(password, 10);
// }

// export function comparePassword(password: string, hash: string) {
//   return bcrypt.compare(password, hash);
// }

// export async function getCurrentUser() {
//   const token = getAuthCookie();
//   if (!token) return null;
//   const payload = verifyJwt(token);
//   if (!payload) return null;
//   return await db.user.findFirst({ where: { id: payload.id } });
// }

// // ✅ lib/cookies.ts
// import { cookies } from 'next/headers';
// import { serialize } from 'cookie';

// export function setAuthCookie(token: string) {
//   cookies().set('auth_token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     path: '/',
//     maxAge: 60 * 60 * 24 * 7,
//   });
// }

// export function getAuthCookie() {
//   return cookies().get('auth_token')?.value || null;
// }

// export function clearAuthCookie() {
//   cookies().set('auth_token', '', { path: '/', maxAge: 0 });
// }


// const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

// export function signJwt(payload: object) {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
// }

// export function verifyJwt(token: string) {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch {
//     return null;
//   }
// }