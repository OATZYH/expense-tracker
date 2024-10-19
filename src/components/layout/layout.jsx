"use client";
import { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();
  return (
    <section className="flex">
      <Sidebar />
      <Header showDatePicker={pathname === "/dashboard"}>
        {children}
      </Header>
    </section>
  );
}
