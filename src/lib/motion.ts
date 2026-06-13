/** Primary easing for visual enter/exit transitions */
export const fluidEase = [0.45, 0.05, 0.55, 0.95] as const;

/** Softer easing for copy and shell animations */
export const smoothEase = [0.22, 1, 0.36, 1] as const;

export const fadeUpTransition = { duration: 0.5, ease: fluidEase } as const;

export const gridPanelTransition = { duration: 0.22, ease: fluidEase } as const;
