import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authConfig } from "@/lib/firebase/admin";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { idToken, refreshToken } = await request.json();

    if (!idToken || !refreshToken) {
      return NextResponse.json({ error: "Missing ID token or refresh token" }, { status: 400 });
    }

    const cookieStore = cookies();
    
    cookieStore.set(authConfig.cookieName, idToken, authConfig.cookieSerializeOptions);
    // next-firebase-auth-edge expects {cookieName}.sig for signatures, but if we don't sign, it uses just the value?
    // Actually, setting AuthToken and AuthRefreshToken is standard if using un-signed or we can let middleware handle it.
    // However, it's safer to just set the AuthToken directly.
    
    // next-firebase-auth-edge automatically looks for AuthToken cookie. 
    // And for refresh token, it looks for AuthRefreshToken.
    cookieStore.set('AuthRefreshToken', refreshToken, authConfig.cookieSerializeOptions);

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error creating session cookie:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = cookies();
    cookieStore.delete(authConfig.cookieName);
    cookieStore.delete("AuthRefreshToken");
    
    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting session cookie:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
