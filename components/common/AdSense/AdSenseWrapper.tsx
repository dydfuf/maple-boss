import { PropsWithChildren } from "react";

export default function AdSenseWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <div className="mr-30 h-600 w-300 bg-gray1" />
      <div className="flex flex-col space-y-30">
        <div className="h-120 w-full bg-gray1" />
        {children}
      </div>
      <div className="ml-30 h-600 w-300 bg-gray1" />
    </div>
  );
}
