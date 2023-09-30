import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import Link from "next/link";
import AlarmPopover from "./AlarmPopover";
import UserInfoPopover from "./UserInfoPopover";
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
            <Link href="/party">
              <Image
                src={MainLogo.src}
                width={150}
                height={65}
                alt="MainLogo"
                className="h-65 w-150"
              />
            </Link>
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
                <Popover.Root key={submenu.src}>
                  <Popover.Trigger asChild>
                    <button>
                      <Image
                        key={submenu.src}
                        src={submenu.src}
                        width={32}
                        height={32}
                        alt={submenu.alt}
                        className="cursor-pointer"
                      />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className="w-320 rounded-16 bg-white px-20 py-30 shadow-md focus:shadow-lg"
                      sideOffset={5}
                    >
                      {submenu.type === "alarm" && <AlarmPopover />}
                      {submenu.type === "user-info" && <UserInfoPopover />}
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
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
    href: "/settlement",
  },
];

const SUB_MENU_LIST = [
  { src: Setting.src, alt: "setting", type: "user-info" },
  { src: Alarm.src, alt: "alarm", type: "alarm" },
];
