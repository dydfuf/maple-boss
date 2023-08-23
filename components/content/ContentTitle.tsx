import { PropsWithChildren } from "react";

interface Props {
  title: string;
}

export default function ContentTitle({
  title,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex h-54 w-full items-center rounded-16 bg-main-2 px-30">
      <span className="text-22 font-semibold text-white">{title}</span>
      <div className="ml-auto">{children}</div>
    </div>
  );
}
