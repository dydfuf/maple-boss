import * as Dialog from "@radix-ui/react-alert-dialog";
import { PropsWithChildren } from "react";
import { cn } from "utils/common";

interface Props {
  contentClassName?: string;
}

export default function CommonDialogContent({
  contentClassName,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 data-[state=open]:bg-black/[0.3]" />
      <Dialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-white p-30 shadow-lg focus:outline-none",
          contentClassName
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
