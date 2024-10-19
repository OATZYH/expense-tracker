"use client";
import Link from "next/link";
import { useSession  } from "next-auth/react";
import { Button } from "@nextui-org/react";
import CornerNav from "@/components/home/CornerNav";
import BentoFeature from "@/components/home/BentoFeature";
export default function Home() {
  const { data: session, status } = useSession ();
  return (
    <main className="flex min-h-screen flex-col p-5 items-center justify-center ">
      <CornerNav />
      {/* <div>landing {session?.user?.id}</div>
      <Link href="/dashboard">go to dashboard</Link>
      <Link href="/login">go to login</Link>
      <Link href="/signup">go to signup</Link> */}
      <h1 className="text-3xl font-bold text-center dark:text-white mb-10">
        Expense tracker
      </h1>
      <Button
        size="lg"
        color="primary"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
        className="mb-10"
      >
        Get Start
      </Button>
      <BentoFeature />
    </main>
  );
}
