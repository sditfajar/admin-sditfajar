import { getFirebaseAuth } from 'next-firebase-auth-edge/lib/auth';

export const serverConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
};

export const authConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  cookieName: 'AuthToken',
  cookieSignatureKeys: [process.env.COOKIE_SECRET || 'secret-key-for-session-cookies-very-long'],
  cookieSerializeOptions: {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 5 * 24 * 60 * 60, // 5 days
  },
  serviceAccount: serverConfig,
};

export const adminAuth = getFirebaseAuth({
  serviceAccount: serverConfig,
  apiKey: authConfig.apiKey
});

// Mock adminDb since firebase-admin is not supported on Edge Runtime
// You should use Firebase Client SDK (firestore) instead for any DB operations on the server in Edge
export const adminDb = null;
