"use client";
import React from "react";
import { Navbar, NavbarContent} from "@nextui-org/react";
import DatePicker from "../DatePicker";

export default function Header({ children, showDatePicker = false }) {
  
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
        <NavbarContent className="w-fit">Content</NavbarContent>
        <NavbarContent>
          {showDatePicker ? (
            <DatePicker />
          
          ) : 
          null}
        </NavbarContent>
        <NavbarContent justify="end" className="w-fit">
          <div>end</div>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
}
