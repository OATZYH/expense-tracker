"use client";
import React from "react";
import {
  Navbar,
  NavbarContent,
} from "@nextui-org/react";

export default function Header({ children }) {
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
        <NavbarContent className="w-full ">
          Content
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <div>end</div>
         </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
}
