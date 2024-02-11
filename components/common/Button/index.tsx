import { ButtonHTMLAttributes } from "react";
import { RoundSize } from "types/common";
import { cn } from "utils/common";
import Text, { Size } from "../Text";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  roundSize?: RoundSize;
  textSize?: Size;
}

export default function Button({
  className,
  roundSize = "default",
  label,
  textSize = 3,
  ...rest
}: Props) {
  return (
    <button
      className={cn(
        {
          "rounded-full py-16": roundSize === "full",
          "rounded-10 py-11": roundSize === "default",
        },
        "w-full bg-primary1 text-white disabled:bg-gray8 disabled:text-gray4",
        className
      )}
      {...rest}
    >
      <Text size={textSize}>{label}</Text>
    </button>
  );
}
