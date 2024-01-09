import { PropsWithChildren } from "react";
import { cn } from "utils/common";

interface Props {
  title: string;
  variant?: Variant;
}

export default function ContentTitle({
  title,
  variant = "common",
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn("flex h-54 w-full items-center rounded-16 px-30", {
        "bg-main-2": variant === "common",
        "flex-col bg-gray-300 sm:flex-row": variant === "detail",
      })}
    >
      <h1
        className={cn("text-22 font-semibold", {
          "text-white": variant === "common",
        })}
      >
        {title}
      </h1>
      <div className="ml-auto">{children}</div>
    </div>
  );
}

type Variant = "common" | "detail";
