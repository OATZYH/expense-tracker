import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconStack3Filled,
  IconTransfer,
  IconCarambolaFilled,
  IconTableColumn,
} from "@tabler/icons-react";
import { AnimatedTooltipPreview } from "./TechStack";
import Image from "next/image";
import ImageExpand from "./ImageExpand";

export default function BentoFeature() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl 
               bg-white/[0.2] 
               [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  
               border border-gray-200 
               bg-neutral-100"
  ></div>
);

const TextComingSoon = () => (
  <div className="flex items-center justify-center w-full h-full">
    <h1 className="text-2xl font-bold text-neutral-500">Coming soon</h1>
  </div>
);
const items = [
  {
    title: "Tech Stack",
    description: "The tools and technologies that power this project.",
    header: <AnimatedTooltipPreview />,
    className: "md:col-span-2",
    icon: <IconStack3Filled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Custom transactions",
    description: "Create and manage your own transactions.",
    header: (
      <ImageExpand
        path="/images/transaction.png"
        alt="Custom Transactions"
        height={150}
        width={150}
        exH={500}
        exW={500}
      />
    ),
    className: "md:col-span-1",
    icon: <IconTransfer className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Follow subscriptions",
    description: "Track your subscriptions and get notified.",
    header: <TextComingSoon />,
    className: "md:col-span-1",
    icon: <IconCarambolaFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Dashboard",
    description: "Get a bird's eye view of your expenses and income.",
    header: (
      <ImageExpand
        path="/images/Dashboard.png"
        alt="Dashboard"
        height={300}
        width={300}
        exH={800}
        exW={800}
      />
    ),
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
