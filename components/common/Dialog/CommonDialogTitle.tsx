import * as Dialog from "@radix-ui/react-alert-dialog";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
  subTitle?: string;
}

export default function CommonDialogTitle({
  title,
  subTitle,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Dialog.Title className="mr-auto flex w-full items-center gap-x-8 text-gray-900">
        <span className="text-24 font-bold">{title}</span>
        <span className="text-16">{subTitle}</span>
        {children}
      </Dialog.Title>
    </div>
  );
}
