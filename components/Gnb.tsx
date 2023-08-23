import Image from "next/image";
import Link from "next/link";
import Alarm from "@/public/images/Alarm.png";
import MainLogo from "@/public/images/MainLogo.png";
import Setting from "@/public/images/Setting.png";

interface Props {
  hideGnb?: boolean;
}

export default function Gnb({ hideGnb }: Props) {
  return (
    <>
      {!hideGnb && (
        <header className="flex h-100 w-full border-b-1 border-main-2">
          <div className="mx-auto mt-10 flex w-full max-w-[1440px]">
            <Image
              src={MainLogo.src}
              width={150}
              height={65}
              alt="MainLogo"
              className="h-65 w-150"
            />
            <div className="ml-100 flex items-center gap-x-40">
              {MENU_LINK_LIST.map((menu) => (
                <Link key={menu.href} href={menu.href}>
                  <span className="text-22 font-bold text-white">
                    {menu.label}
                  </span>
                </Link>
              ))}
            </div>
            <div className="my-auto ml-auto flex gap-x-40">
              {SUB_MENU_LIST.map((submenu) => (
                <Image
                  key={submenu.src}
                  src={submenu.src}
                  width={32}
                  height={32}
                  alt={submenu.alt}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </div>
        </header>
      )}
    </>
  );
}

const MENU_LINK_LIST = [
  {
    label: "파티",
    href: "/party",
  },
  {
    label: "정산",
    href: "#정산",
  },
];

const SUB_MENU_LIST = [
  { src: Setting.src, alt: "setting" },
  { src: Alarm.src, alt: "alarm" },
];
