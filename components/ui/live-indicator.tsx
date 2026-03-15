"use client";

import { motion } from "framer-motion";

export const LiveIndicator = ({ label = "Live" }: { label?: string }) => {
  return (
    <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
      <motion.div 
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
      />
      <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{label}</span>
    </div>
  );
};
