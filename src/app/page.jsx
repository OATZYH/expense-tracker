"use client";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col space-y-4 p-5 items-center justify-center ">
      <div>landing</div>
      <Link href="/dashboard">go to dashboard</Link>
      <Link href="/login">go to login</Link>
      <Link href="/signup">go to signup</Link>
    </main>
  );
}
