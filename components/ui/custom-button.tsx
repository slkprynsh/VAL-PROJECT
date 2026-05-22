'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useRef } from 'react';

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function CustomButton({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: CustomButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleCountRef = useRef(0);

  const variants = {
    primary: 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/30',
    secondary: 'bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200',
    outline: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50',
    ghost: 'text-teal-600 hover:bg-teal-50',
    gradient:
      'bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 text-white shadow-lg shadow-teal-500/30',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: rippleCountRef.current++,
      x,
      y,
    };

    setRipples([...ripples, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    props.onClick?.(e);
  };

  return (
    <Button
      ref={buttonRef}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold overflow-hidden',
        'transition-all duration-300 hover:scale-105 active:scale-95',
        'group',
        variants[variant],
        sizes[size],
        className,
      )}
      onMouseEnter={(e) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        onMouseLeave?.(e);
      }}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/40 animate-ping"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '10px',
            height: '10px',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.6s ease-out',
          }}
        />
      ))}

      {/* Shimmer effect on hover */}
      {isHovered && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}

      {/* Button content */}
      <span className="relative flex items-center gap-2">
        {icon && <span className="flex items-center">{icon}</span>}
        {children}
      </span>

      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 10px;
            height: 10px;
            opacity: 1;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }
      `}</style>
    </Button>
  );
}
