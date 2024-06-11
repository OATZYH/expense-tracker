'use client';
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

const SidebarItem = ({ icon, title, isActive, href = "" }) => {
  return (
    <Link href={href} className="text-default active:bg-none max-w-full">
      <div
        className={clsx(
          isActive
            ? "bg-primary-100 [&_svg_path]:fill-primary-500 text-content1-foreground"
            : "hover:bg-[#1e1e21]",
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
      >
        {icon}
        {title}
      </div>
    </Link>
  );
};

export default SidebarItem;
