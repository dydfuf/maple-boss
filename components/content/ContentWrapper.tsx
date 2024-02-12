import { PropsWithChildren } from "react";

interface Props {
  isFixed?: boolean;
}

export default function ContentWrapper({ children }: PropsWithChildren<Props>) {
  return <div className="w-1080">{children}</div>;
}
