'use client';
import React from 'react';

const SidebarMenu = ({ title, children }) => {
  return (
    <div className="flex gap-2 flex-col">
      <span className="text-xs font-normal text-default">{title}</span>
      {children}
    </div>
  );
};

export default SidebarMenu;
