"use client";
import Link from "next/link";
import { useSession  } from "next-auth/react";
import CornerNav from "@/components/CornerNav";
export default function Home() {
  const { data: session, status } = useSession ();
  return (
    <main className="flex min-h-screen flex-col p-5 items-center justify-center ">
      <CornerNav />
      {/* <div>landing {session?.user?.id}</div>
      <Link href="/dashboard">go to dashboard</Link>
      <Link href="/login">go to login</Link>
      <Link href="/signup">go to signup</Link> */}
    </main>
  );
}
