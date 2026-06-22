import { cn } from './cn';

/** JPG/WebP portfolio cards from IdeaLab ship with opaque white backgrounds. */
export function partnerLogoNeedsBlend(src: string, status?: string): boolean {
  if (status === 'fallback') return false;
  return /\.(jpe?g|webp)$/i.test(src);
}

export function partnerLogoImgClass(src: string, status?: string, extra?: string): string {
  return cn(
    'h-full w-full object-contain',
    partnerLogoNeedsBlend(src, status) && 'partner-logo-img',
    extra,
  );
}
