import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Gnb from "./Gnb";

interface Props {
  hideGnb?: boolean;
}

export default function Layout({
  hideGnb,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-main">
      <Gnb hideGnb={hideGnb} />
      <main className="flex flex-1">{children}</main>
      <Footer />
    </div>
  );
}
