import { motion } from 'motion/react';
import { useScrollState } from '../ScrollContext';

export function AmbientBackground() {
  const { globalProgress } = useScrollState();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="texture-grain absolute inset-0" />
      <div className="texture-dots absolute inset-0 opacity-60" />

      <motion.div
        className="absolute -left-32 top-[10%] h-[420px] w-[420px] rounded-full bg-brand-cyan/20 blur-[100px]"
        animate={{ x: globalProgress * 80, y: globalProgress * 40 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />
      <motion.div
        className="absolute -right-24 top-[35%] h-[500px] w-[500px] rounded-full bg-brand-mid-blue/15 blur-[120px]"
        animate={{ x: -globalProgress * 60, y: -globalProgress * 30 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[30%] h-[360px] w-[360px] rounded-full bg-brand-navy/10 blur-[90px]"
        animate={{ scale: 1 + globalProgress * 0.15 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#29ABE2" />
            <stop offset="100%" stopColor="#14467F" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.line
            key={i}
            x1={`${15 + i * 18}%`}
            y1="0"
            x2={`${55 + i * 8}%`}
            y2="100%"
            stroke="url(#lineGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 + globalProgress * 0.3 }}
            transition={{ duration: 1.2, delay: i * 0.15 }}
          />
        ))}
      </svg>
    </div>
  );
}
