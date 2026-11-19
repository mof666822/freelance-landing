"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ScaleCardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onNavigate?: () => void;
};

export function ScaleCard({ children, className, href, onNavigate }: ScaleCardProps) {
  const [active, setActive] = useState(false);

  const content = (
    <motion.div
      layout
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onTap={() => setActive((v) => !v)}
      animate={{ scale: active ? 1.5 : 1, zIndex: active ? 40 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "relative origin-center rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-md",
        "will-change-transform",
        className,
      )}
      style={{ transformOrigin: "center center" }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          if (onNavigate) {
            e.preventDefault();
            onNavigate();
          }
        }}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-telegram"
      >
        {content}
      </a>
    );
  }

  return content;
}
