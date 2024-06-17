"use client";
import React from "react";
import SignupForm from "./form";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="relative m-auto flex h-[100vh] w-full flex-col items-center justify-center bg-gradient-to-br from-secondary-100 via-white to-secondary-50 pl-2 pr-2">
      <div className=" z-50 mt-auto  flex w-[380px]  justify-center sm:w-[468px] sm:">
        <Card>
          <CardBody>
            <Link className="text-3xl font-bold p-2" href="/">
              Expense Tracker
            </Link>
          </CardBody>
        </Card>
      </div>
      <div className="z-50 flex mb-auto w-[380px] flex-col justify-center p-6 sm:w-[468px] sm:p-10">
        <SignupForm />
      </div>
    </main>
  );
}
