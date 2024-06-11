"use client";
import React, { useState } from "react";
import {
  SidebarWrapper as SidebarStyles,
  Overlay,
  Header,
  Body,
  Footer,
} from "./sidebar.styles";
import SidebarItem from "./SidebarItem";
import SidebarMenu from "./SidebarMenu";
import HeadSidebar from "./HeadSidebar";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";

const Sidebar = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useState(false);

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Overlay()} onClick={setCollapsed(false)} />
      ) : null}
      <div className={SidebarStyles({ collapsed })}>
        <div>
          <HeadSidebar />
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className={Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Transactions">
              <SidebarItem
                isActive={pathname === "/expenses"}
                title="Expenses"
                icon={<AccountsIcon />}
                href="expenses"
              />
              <SidebarItem
                isActive={pathname === "/incomes"}
                title="Incomes"
                icon={<PaymentsIcon />}
                href="incomes"
              />
            </SidebarMenu>

            <SidebarMenu title="Features">
              <SidebarItem
                isActive={pathname === "/subscriptions"}
                title="Subscriptions"
                icon={<DevIcon />}
                href="subscriptions"
              />
              {/* <SidebarItem isActive={pathname === "/investments"} title="Investments" icon={} /> */}
            </SidebarMenu>
          </div>
          <div className={Footer()}>
            <Button variant="ghost" size="lg" color="danger">Logout</Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
