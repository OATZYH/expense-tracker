"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
const stack = [
  {
    id: 1,
    name: "Next.js",
    designation: "Fullstack",
    image: "/images/nextjs.png",
  },
  {
    id: 2,
    name: "Prisma",
    designation: "ORM",
    image:
      "/images/prisma.png",
  },
  {
    id: 3,
    name: "Neon",
    designation: "Cloud Database",
    image:
      "/images/neon.png",
  },
  {
    id: 4,
    name: "PostgreSQL",
    designation: "Database",
    image:
      "/images/postgresql.png",
  },
  {
    id: 5,
    name: "Vercel",
    designation: "Deployment",
    image:
      "/images/vercel.png",
  },
];

export function AnimatedTooltipPreview() {
  return (
    (<div className="flex flex-row items-center justify-center  w-full h-full">
      <AnimatedTooltip items={stack} />
    </div>)
  );
}
