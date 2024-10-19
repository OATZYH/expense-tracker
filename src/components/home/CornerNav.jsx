"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuMenu } from "react-icons/lu";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button, Link, Spacer } from "@nextui-org/react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Login", href: "/login" },
  // { name: "Github", href: "https://github.com/OATZYH" },
  { name: "My resume", href: "https://sarun-resume.vercel.app/" },
];

const socialIcons = [
  { name: "Github", icon: <FaGithub size={64} />, href: "https://github.com/OATZYH" },
  {
    name: "LinkedIn",
    icon: <FaLinkedin size={64} />,
    href: "https://www.linkedin.com/in/sarun-khumthai/",
  },
  // { name: "Instagram", icon: "instagram", href: "#" },
  // { name: "YouTube", icon: "youtube", href: "#" },
];

export default function CornerNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        isIconOnly
        color="default"
        className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full shadow-md"
        {...(isOpen && { color: "default", variant: "solid" })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <LuX className="h-6 w-6" />
          ) : (
            <LuMenu className="h-6 w-6" />
          )}
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 bg-primary text-white rounded-3xl shadow-2xl overflow-hidden z-40"
          >
            <div className="h-full p-12 flex flex-col justify-between">
              <nav>
                <ul className="text-8xl font-bold space-y-10">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-gray-200 transition-colors"
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <Spacer y={2} />

              <div className="space-y-8">
                <div className="flex space-x-8 justify-center">
                  {socialIcons.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <span className="sr-only">{item.name}</span>
                      {item.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
