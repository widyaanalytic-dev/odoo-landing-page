import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variants: Record<ButtonVariant, string> = {
  primary:
    'rounded-full bg-brand-cyan px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-cyan/30 transition-all hover:bg-brand-mid-blue hover:shadow-brand-mid-blue/30',
  secondary:
    'rounded-full border border-brand-navy/15 bg-white/50 px-8 py-4 text-base font-semibold text-brand-navy backdrop-blur-sm transition-all hover:border-brand-cyan hover:text-brand-cyan',
  ghost:
    'rounded-full px-4 py-1.5 text-sm font-medium text-brand-navy transition-all hover:bg-white/60',
};

type BaseProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({ variant = 'primary', className, children, href, ...props }: ButtonAsButton | ButtonAsLink) {
  const classes = cn(variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
