import type { Variants } from 'motion/react';

export const launcherOverlay: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 1.02,
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  },
};

export const launcherCategory: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export const launcherTile: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 28 },
  },
  tap: { scale: 0.92 },
  selected: {
    scale: 1.08,
    transition: { type: 'spring', stiffness: 500, damping: 22 },
  },
};

export const detailShell: Variants = {
  idle: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  behindLauncher: {
    opacity: 0.5,
    scale: 0.99,
    filter: 'blur(0px)',
    transition: { duration: 0.2 },
  },
  reveal: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export const detailContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

export const detailSection: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
};

export const detailTableRow: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

export const detailTableBody: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.28 },
  },
};

export const detailTabSwitch: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -4, transition: { duration: 0.18 } },
};
