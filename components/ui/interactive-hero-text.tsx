"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const InteractiveHeroText = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 5,
    }));
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative group cursor-default py-12 md:py-24 select-none overflow-visible w-full h-full flex items-center justify-center"
    >
      {mounted && (
        <div className="absolute inset-[-100px] pointer-events-none overflow-hidden">
          {stars.map((star, i) => (
            <motion.div
              key={star.id}
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                backgroundColor: i % 3 === 0 ? '#5B4DFF' : i % 3 === 1 ? '#F08A8A' : '#FF6B9D',
                borderRadius: '50%',
                boxShadow: i % 3 === 0
                  ? '0 0 8px rgba(91, 77, 255, 0.4)'
                  : i % 3 === 1
                    ? '0 0 8px rgba(240, 138, 138, 0.4)'
                    : '0 0 8px rgba(255, 107, 157, 0.4)',
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        style={{ left: springX, top: springY }}
        className="absolute w-[300px] md:w-[700px] h-[300px] md:h-[700px] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0"
      />

      <h1
        className="text-6xl sm:text-7xl md:text-[10rem] lg:text-[12rem] font-serif leading-[0.8] tracking-tighter relative z-10 transition-all duration-1000 group-hover:tracking-normal animate-shimmer-text animate-breathing-glow text-center"
      >
        AKRONIX
      </h1>
    </div>
  );
};
