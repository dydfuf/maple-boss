import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MapleFont } from "components/Layout";
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

  const POPOVER_LINK_LIST = [
    {
      label: "파티/정산",
      type: "party-settlement",
      subMenus: [
        { label: "파티 관리", href: "/party" },
        { label: "파티 정산 관리", href: "/settlement" },
      ],
    },
    {
      label: "게시판",
      type: "board",
      subMenus: [
        { label: "랭킹 게시판", href: "/ranking" },
        // { label: "자유 게시판", href: "" },
      ],
    },
    {
      label: "부가기능",
      type: "extra",
      subMenus: [
        { label: "보스 정보", href: "/boss" },
        { label: "유니온 계산기", href: "/union-simulator" },
      ],
    },
  ].filter(Boolean);

  const SUB_MENU_LIST = [
    { src: Setting.src, alt: "setting", type: "user-info" },
    { src: Alarm.src, alt: "alarm", type: "alarm" },
  ];

  return (
    <header className="flex h-80 w-full border-b-1 border-main-2 px-12">
      <div className="mx-auto mt-10 flex w-full max-w-[1080px]">
        <Link href="/boss" className="hidden sm:block">
          <Image
            src={MainLogo.src}
            width={150}
            height={65}
            alt="MainLogo"
            className="h-65 w-150"
          />
        </Link>
        <div className="ml-auto flex items-center gap-x-20 sm:gap-x-40">
          {POPOVER_LINK_LIST.map((menu) => (
            <Popover.Root key={menu.type}>
              <Popover.Trigger asChild>
                <button className="shrink-0">
                  <span className="text-22 font-bold text-white">
                    {menu.label}
                  </span>
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="flex w-full flex-col items-center gap-12 rounded-16 bg-white p-20 shadow-md focus:shadow-lg"
                  sideOffset={5}
                >
                  {menu.subMenus.map((subMenu) => (
                    <Popover.Close key={subMenu.href} asChild>
                      <Link href={subMenu.href} className={MapleFont.className}>
                        <span className="text-20 font-bold text-gray-400">
                          {subMenu.label}
                        </span>
                      </Link>
                    </Popover.Close>
                  ))}
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          ))}
          {!isLoggedIn && (
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(router.asPath)}`}
              className="shrink-0"
            >
              <span className="text-22 font-bold text-white">로그인</span>
            </Link>
          )}
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
