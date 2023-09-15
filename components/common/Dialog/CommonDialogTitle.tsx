import * as Dialog from "@radix-ui/react-alert-dialog";
import { PropsWithChildren } from "react";
import { cn } from "utils/common";

interface Props {
  title: string;
  subTitle?: string;
  className?: string;
}

export default function CommonDialogTitle({
  title,
  subTitle,
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Dialog.Title
        className={cn(
          "mr-auto flex w-full items-center gap-x-8 text-gray-900",
          className
        )}
      >
        <span className="text-24 font-bold">{title}</span>
        <span className="text-16">{subTitle}</span>
        {children}
      </Dialog.Title>
    </div>
  );
}
