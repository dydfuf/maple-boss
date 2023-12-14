import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useAlarm from "hooks/alarm/useAlarm";
import AlarmPopover from "./AlarmPopover";
import UserInfoPopover from "./UserInfoPopover";
import Alarm from "@/public/images/Alarm.png";
import MainLogo from "@/public/images/MainLogo.png";
import Setting from "@/public/images/Setting.png";

export default function Gnb() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const router = useRouter();

  const { alarms } = useAlarm();
  const alarmCount = alarms.length;

  const MENU_LINK_LIST = [
    { label: "보스", href: "/boss" },
    {
      label: "랭킹",
      href: "/ranking",
    },
    {
      label: "파티",
      href: "/party",
    },
    {
      label: "정산",
      href: "/settlement",
    },
    !isLoggedIn && {
      label: "로그인",
      href: `/login?callbackUrl=${encodeURIComponent(router.asPath)}`,
    },
    isLoggedIn && {
      label: "문의",
      href: "/inquiry",
    },
  ].filter(Boolean);

  const SUB_MENU_LIST = [
    { src: Setting.src, alt: "setting", type: "user-info" },
    { src: Alarm.src, alt: "alarm", type: "alarm" },
  ];

  return (
    <header className="flex h-80 w-full border-b-1 border-main-2 px-12">
      <div className="mx-auto mt-10 flex w-full max-w-[1440px]">
        <Link href="/boss">
          <Image
            src={MainLogo.src}
            width={150}
            height={65}
            alt="MainLogo"
            className="h-65 w-150"
          />
        </Link>
        <div className="ml-auto flex items-center gap-x-20 sm:gap-x-40">
          {MENU_LINK_LIST.map((menu) => (
            <Link key={menu.href} href={menu.href} className="shrink-0">
              <span className="text-22 font-bold text-white">{menu.label}</span>
            </Link>
          ))}
        </div>
        <div className="my-auto ml-20 flex gap-x-20 sm:ml-40 sm:gap-x-40">
          {isLoggedIn &&
            SUB_MENU_LIST.map((submenu) => (
              <Popover.Root key={submenu.src}>
                <Popover.Trigger asChild>
                  <button className="relative">
                    <Image
                      key={submenu.src}
                      src={submenu.src}
                      width={32}
                      height={32}
                      alt={submenu.alt}
                      className="cursor-pointer"
                    />
                    {submenu.type === "alarm" && alarmCount > 0 && (
                      <div className="absolute right-5 top-0 flex h-20 w-20 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-gray-100 text-12 font-bold">
                        {alarmCount}
                      </div>
                    )}
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
  );
}
