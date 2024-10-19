"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar, NavbarContent, Button} from "@nextui-org/react";
import DatePicker from "../DatePicker";

export default function Header({ children, showDatePicker = false}) {
  const pathname = usePathname();
  const [title, setTitle] = useState("Dashboard");
  useEffect(() => {
    // console.log("Current Path:", pathname);
    if (pathname === "/dashboard") {
      setTitle("Dashboard");
    } else if (pathname === "/dashboard/expenses") {
      setTitle("Expenses");
    } else if (pathname === "/dashboard/incomes") {
      setTitle("Incomes");
    } else if (pathname === "/dashboard/subscriptions") {
      setTitle("Subscriptions");
    }
  }, [pathname]);
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          {/* <BurguerButton /> */}
        </NavbarContent>
        <NavbarContent className="w-fit">{title}</NavbarContent>
        <NavbarContent>
          {showDatePicker ? (
            <DatePicker />
          
          ) : 
          null}
        </NavbarContent>
        <NavbarContent justify="end" className="w-fit">
          <Button auto size="small" color="primary" onPress={
            () => window.location.href = "/"
          }>
            Home
          </Button>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
}
