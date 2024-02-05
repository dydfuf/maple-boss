import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Menu, MenuType } from "types/common";
import Menulist from "./Menulist";
import UserMenuList from "./UserMenuList";
import LogoWithText from "@/public/images/LogoWithText.png";

export default function Topbar() {
  const router = useRouter();

  const getActiveMenu = (pathname: string) => {
    if (pathname.includes("/party")) return MenuType.PARTY;
    if (pathname.includes("/settlement")) return MenuType.SETTLEMENT;
    if (pathname.includes("/ranking")) return MenuType.RANKING;
    if (pathname.includes("/board")) return MenuType.BOARD;
    if (pathname.includes("/boss")) return MenuType.BOSS;
    if (pathname.includes("/union-simulator")) return MenuType.UNION_SIMULATOR;
    return;
  };

  const activeMenu = useMemo(
    () => getActiveMenu(router.pathname),
    [router.pathname]
  );

  return (
    <header className="flex h-64 justify-center bg-white">
      <div className="flex w-full max-w-[1080px] items-center">
        <Link href="/boss">
          <img
            src={LogoWithText.src}
            width={135}
            height={50}
            alt="MainLogo"
            className="h-50 w-135"
          />
        </Link>
        <div className="ml-auto flex items-center">
          <Menulist submenuList={MENU_LIST} activeMenu={activeMenu} />
          <UserMenuList />
        </div>
      </div>
    </header>
  );
}

const MENU_LIST: Menu[] = [
  {
    label: "파티/정산",
    type: "party-settlement",
    subMenus: [
      { key: MenuType.PARTY, label: "파티 관리", href: "/party" },
      {
        key: MenuType.SETTLEMENT,
        label: "파티 정산 관리",
        href: "/settlement",
      },
    ],
  },
  {
    label: "게시판",
    type: "board",
    subMenus: [
      { key: MenuType.RANKING, label: "랭킹 게시판", href: "/ranking" },
      { key: MenuType.BOARD, label: "자유 게시판", href: "/board" },
    ],
  },
  {
    label: "부가기능",
    type: "extra",
    subMenus: [
      { key: MenuType.BOSS, label: "보스 정보", href: "/boss" },
      {
        key: MenuType.UNION_SIMULATOR,
        label: "유니온 계산기",
        href: "/union-simulator",
      },
    ],
  },
];
