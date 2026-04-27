import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { authConfig } from "@/lib/firebase/admin";

export const runtime = 'edge';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  
  // Verify token using next-firebase-auth-edge which is fully compatible with Edge runtime!
  const tokens = await getTokens(cookieStore, authConfig);
  
  if (!tokens) {
    console.error("Invalid session or expired token");
    redirect("/login");
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
