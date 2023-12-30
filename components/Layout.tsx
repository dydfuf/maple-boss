import localFont from "next/font/local";
import { PropsWithChildren } from "react";
import { cn } from "utils/common";
import Footer from "./Footer";
import Gnb from "./Gnb";

interface Props {
  hideGnb?: boolean;
}

export const MapleFont = localFont({
  src: [
    {
      path: "../fonts/Maplestory_OTF_Bold.otf",
      weight: "700",
      style: "bold",
    },
    { path: "../fonts/Maplestory_OTF_Light.otf", weight: "500" },
  ],
});

export default function Layout({
  hideGnb,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        "flex min-h-[100dvh] flex-col bg-main",
        MapleFont.className
      )}
    >
      {!hideGnb && <Gnb />}
      <main className="flex flex-1">{children}</main>
      <Footer />
    </div>
  );
}
