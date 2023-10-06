import { PropsWithChildren } from "react";
import { cn } from "utils/common";

interface Props {
  variant?: Variant;
  className?: string;
}

export default function Badge({
  variant,
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        "flex h-22 w-fit items-center rounded-full px-8 text-12 leading-18",
        {
          "bg-green-100/10 text-green-100": variant === "EASY",
          "bg-brown-700/10 text-brown-700": variant === "NORMAL",
          "bg-red-100/10 text-red-100": variant === "HARD",
          "bg-tomato-100/10 text-tomato-100": variant === "EXTREME",
          "bg-red-900/10 text-red-900": variant === "CHAOS",
          "bg-gray-300 text-gray-500": variant === "CONFIRMED",
          "bg-blue-100/10 text-blue-100": variant === "IN_PROGRESS",
          "bg-purple-100/10 text-purple-100": variant === "AUTO",
          "bg-yellow-100/10 text-yellow-100": variant === "MANUAL",
          "bg-gray-100 text-gray-900": variant === "CONTRAST",
        },
        className
      )}
    >
      {children}
    </div>
  );
}

type Variant =
  | "EASY"
  | "HARD"
  | "NORMAL"
  | "EXTREME"
  | "CHAOS"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "DELETED"
  | "AUTO"
  | "MANUAL"
  | "CONTRAST";
