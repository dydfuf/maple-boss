import { PropsWithChildren } from "react";

export default function ContentWrapper({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto mb-90 mt-50 flex min-h-[780px] w-full max-w-[1440px] flex-col rounded-16 bg-white p-30">
      {children}
    </div>
  );
}
