import { PropsWithChildren } from "react";
import { cn } from "utils/common";

interface Props {
  size?: Size;
  className?: string;
}

type Size = 1 | 2 | 3 | 4 | 5 | 6;

export default function Text({
  size = 1,
  className,
  children,
}: PropsWithChildren<Props>) {
  // @TODO: breakpoint가 정해지지 전까지 임의로 sm을 사용한다.
  return (
    <span
      className={cn(
        PC_TEXT_VARIANTS[size],
        MOBILE_TEXT_VARIANTS[size],
        className
      )}
    >
      {children}
    </span>
  );
}

const PC_TEXT_VARIANTS: Record<Size, string> = {
  1: "sm:text-14 sm:leading-22",
  2: "sm:text-16 sm:leading-24",
  3: "sm:text-18 sm:leading-28",
  4: "sm:text-20 sm:leading-30",
  5: "sm:text-24 sm:leading-36",
  6: "sm:text-28 sm:leading-42",
};

const MOBILE_TEXT_VARIANTS: Record<Size, string> = {
  1: "text-14 leading-22",
  2: "text-14 leading-22",
  3: "text-16 leading-24",
  4: "text-18 leading-28",
  5: "text-20 leading-30",
  6: "text-24 leading-36",
};
