import { PropsWithChildren } from "react";

interface Props {
  isFixed?: boolean;
}

export default function ContentWrapper({
  children,
  isFixed,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={`mx-auto mb-90 mt-50 flex min-h-[780px] ${
        isFixed ? "w-[1080px]" : "w-full max-w-[1080px]"
      } flex-col rounded-16 bg-white p-30`}
    >
      {children}
    </div>
  );
}
