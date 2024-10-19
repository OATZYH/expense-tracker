import React from "react";
import { Avatar } from "@nextui-org/react";

export default function HeadSidebar() {
  return (
    <div className="flex flex-col gap-8 items-center px-6 text-default mt-5">
      <h1 className="text-xl font-bold">Expense Tracker</h1>
      <Avatar
        isBordered
        radius="full"
        src="https://res.cloudinary.com/dtomkzlym/image/upload/v1729308863/profile_primary.jpg"
        className="!w-24 !h-24"
      />
      <p>GITHUB : OATZYH</p>
    </div>
  );
}
