"use client";

import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
}

export const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  className,
  color = "#ffffff",
  shineColor = "#ffffff",
}: ShinyTextProps) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={cn(
        "text-transparent bg-clip-text inline-block",
        !disabled && "animate-shine",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(120deg, ${color} 40%, ${shineColor} 50%, ${color} 60%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
};
