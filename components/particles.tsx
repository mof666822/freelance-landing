"use client";

import { motion } from "framer-motion";

const dots = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 2 + (i % 4),
  delay: (i % 8) * 0.35,
  duration: 6 + (i % 5),
}));

export function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,158,217,0.25),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(0,255,163,0.12),_transparent_45%)]" />
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full bg-telegram/50"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
