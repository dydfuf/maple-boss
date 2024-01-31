import Link from "next/link";
import Text from "components/common/Text";
import { CDN_HOST } from "constants/common";

export default function Topbar() {
  return (
    <header className="flex h-64 justify-center bg-white">
      <div className="flex w-full max-w-[1080px]">
        <Link href="/boss">
          <img
            src={CDN_HOST + "/common/logo.png"}
            width={148}
            height={64}
            alt="MainLogo"
            className="h-64 w-148"
          />
        </Link>
        <div className="ml-auto flex items-center gap-60">
          {/** @TODO: #125 GNB의 팝오버를 구현해야 합니다. */}
          {POPOVER_LINK_LIST.map((link) => (
            <Text
              key={link.label}
              size={4}
              className="cursor-pointer font-bold"
            >
              {link.label}
            </Text>
          ))}
        </div>
      </div>
    </header>
  );
}

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
      { label: "자유 게시판", href: "/board" },
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
];
