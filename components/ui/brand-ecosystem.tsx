"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";

const brands = [
  {
    id: "gritscape",
    name: "Gritscape",
    logo: "/gritscape_logo.png",
    color: "#006B3F",
    glow: "rgba(0, 107, 63, 0.6)",
    description: "Gritscape transforms innovative ideas into real startups through expert mentorship, strategic guidance, and hands-on startup programs.",
    tags: ["MENTORSHIP", "STARTUP ACCELERATOR", "INVESTOR NETWORK"]
  },
  {
    id: "mediatrix",
    name: "Mediatrix",
    logo: "/mediatrix_logo.png",
    color: "#FFD700",
    glow: "rgba(255, 215, 0, 0.6)",
    description: "Mediatrix is a performance-driven digital marketing agency helping brands grow through strategic storytelling and data-driven marketing.",
    tags: ["PERFORMANCE MARKETING", "CONTENT STRATEGY", "SEO/SEM"]
  }
];

export const BrandEcosystem = () => {
  const [activeBrand, setActiveBrand] = useState(brands[0]);
  const [mounted, setMounted] = useState(false);

  const playSound = () => {
    if (typeof window === 'undefined' || !mounted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(660, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.03);

      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.03);
    } catch (e) {}
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) playSound();
  }, [activeBrand, mounted]);

  const stars = useMemo(() => {
    return Array.from({ length: 250 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      driftX: (Math.random() - 0.5) * 80,
      driftY: (Math.random() - 0.5) * 80,
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full min-h-[700px] bg-black overflow-hidden flex flex-col items-center justify-center py-24">
      
      {/* Nebula/Galaxy Background - Enhanced Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Nebulas */}
        <motion.div 
          animate={{ 
            x: [0, 80, -80, 0], 
            y: [0, -50, 50, 0],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] opacity-25"
          style={{ background: "radial-gradient(circle, var(--c-brand), transparent)" }}
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 60, 0], 
            y: [0, 60, -60, 0],
            rotate: [360, 270, 180, 90, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full blur-[180px] opacity-20"
          style={{ background: "radial-gradient(circle, var(--c-accent), transparent)" }}
        />
        <motion.div 
          animate={{ 
            x: [0, 40, -40, 0], 
            y: [0, 70, -30, 0],
            scale: [1.3, 1, 1.3]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15"
          style={{ background: "radial-gradient(circle, var(--c-sky), transparent)" }}
        />

        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: [0.1, 0.7, 0.1],
              x: [0, star.driftX],
              y: [0, star.driftY]
            }}
            transition={{
              duration: star.duration * 5,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              boxShadow: "0 0 10px rgba(255,255,255,0.4)"
            }}
          />
        ))}
      </div>


      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-20 px-4"
      >
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
          In <span className="gradient-text-primary">collaboration</span> with
        </h2>
      </motion.div>

      {/* Binary System Hub Animation */}
      <div className="relative z-20 flex flex-col md:flex-row justify-center items-center gap-20 md:gap-60 px-4 w-full max-w-7xl mb-16 h-[400px]">
        
        {/* The Connection Path - Kinetic Pipeline */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[2px] hidden md:block">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
           {/* Pulsing Light Stream */}
           <motion.div 
             animate={{ x: ["-100%", "200%"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute inset-y-0 w-80 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"
           />
           {/* Nano-Packets */}
           {[...Array(3)].map((_, j) => (
             <motion.div 
               key={j}
               animate={{ x: ["-50%", "150%"] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: j * 0.5 }}
               className="absolute top-1/2 -translate-y-1/2 w-4 h-[2px] bg-white shadow-[0_0_15px_white]"
             />
           ))}
        </div>

        {brands.map((brand, i) => (
          <div key={brand.id} className="relative flex flex-col items-center">
            {/* Technical Node Labels */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute -top-24 whitespace-nowrap z-30 flex flex-col items-center transition-all duration-700 ${activeBrand.id === brand.id ? 'opacity-100' : 'opacity-40 blur-[2px]'}`}
            >
               <div className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 mb-2">SYSTEM_NODE_{String(i + 1).padStart(2, '0')}</div>
               <div className="h-[2px] w-20 bg-white/10 relative overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-white shadow-[0_0_10px_white]"
                  />
               </div>
            </motion.div>

            <motion.div
              onMouseEnter={() => setActiveBrand(brand)}
              whileHover={{ scale: 1.1 }}
              className={`relative w-40 h-40 md:w-56 md:h-56 rounded-full border border-white/10 transition-all duration-700 flex items-center justify-center overflow-hidden bg-black group cursor-pointer ${
                activeBrand.id === brand.id ? "scale-105 shadow-[0_0_80px_rgba(255,255,255,0.05)] border-white/40" : "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
              }`}
              style={{
                boxShadow: activeBrand.id === brand.id 
                  ? `0 0 70px ${brand.glow}, inset 0 0 60px ${brand.glow}` 
                  : `0 0 20px rgba(0,0,0,0.8)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-10" />
              
              <div className="relative w-full h-full p-4 flex items-center justify-center">
                 <Image 
                    src={brand.logo} 
                    alt={brand.name} 
                    fill 
                    className={`object-cover transition-all duration-1000 ${activeBrand.id === brand.id ? 'scale-105' : 'scale-100'}`}
                  />
              </div>

              {/* HUD Target Lock */}
              <motion.div 
                animate={{ rotate: activeBrand.id === brand.id ? 180 : 0 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-0 border-[2px] border-dashed border-white/5 rounded-full transition-opacity duration-700 ${activeBrand.id === brand.id ? 'opacity-40' : 'opacity-0'}`}
              />
            </motion.div>
            
            {/* Active Tag HUD */}
            <AnimatePresence>
              {activeBrand.id === brand.id && (
                <motion.div 
                  initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, x: i === 0 ? -240 : 240 }}
                  exit={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                  className={`absolute top-0 hidden xl:flex flex-col gap-2 w-48 text-${i === 0 ? 'right' : 'left'}`}
                >
                   {brand.tags?.map((tag) => (
                     <div key={tag} className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5 whitespace-nowrap">
                        {tag}
                     </div>
                   ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Description Panel */}
      <div className="relative z-10 w-full max-w-4xl px-6 min-h-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBrand.id}
            initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -30 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium max-w-3xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              &quot;{activeBrand.description}&quot;
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
