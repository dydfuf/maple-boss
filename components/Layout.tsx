import localFont from "next/font/local";
import { PropsWithChildren } from "react";
import { cn } from "utils/common";
import Footer from "./Footer";
import Gnb from "./Gnb";

interface Props {
  hideGnb?: boolean;
}

export const PretendardFont = localFont({
  src: [
    {
      path: "../fonts/Pretendard-ExtraLight.woff2",
      weight: "200",
    },
    {
      path: "../fonts/Pretendard-Light.woff2",
      weight: "300",
    },
    {
      path: "../fonts/Pretendard-Regular.woff2",
      weight: "400",
    },
    {
      path: "../fonts/Pretendard-Medium.woff2",
      weight: "500",
    },
    {
      path: "../fonts/Pretendard-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../fonts/Pretendard-Bold.woff2",
      weight: "700",
    },
    {
      path: "../fonts/Pretendard-ExtraBold.woff2",
      weight: "800",
    },
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
        PretendardFont.className
      )}
    >
      {!hideGnb && <Gnb />}
      <main className="flex flex-1">{children}</main>
      <Footer />
    </div>
  );
}
