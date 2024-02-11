import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { PropsWithChildren, ReactNode } from "react";
interface Props {
  children: ReactNode;
}
export default function PopupContent({ children }: PropsWithChildren<Props>) {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 h-full w-full bg-black/[.70]" />
      <AlertDialog.Content className="fixed left-1/2 top-1/2 min-h-[210px] min-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-20 bg-white px-20 py-40 ">
        {children}
      </AlertDialog.Content>
    </AlertDialog.Portal>
  );
}
