import Link from "next/link";
import { cn } from "utils/common";
import Text from "../Text";

interface Props {
  activeTab: Key;
}

export default function PartySettlementTab({ activeTab }: Props) {
  return (
    <div className="z-10 mt-100 flex w-1080">
      {TabList.map((tab) => {
        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={cn("px-20 py-10 text-white", {
              "border-b-3 border-white": activeTab === tab.key,
            })}
          >
            <Text size={5} className="font-bold">
              {tab.value}
            </Text>
          </Link>
        );
      })}
    </div>
  );
}

type Key = "PARTY" | "SETTLEMENT";

const TabList: { key: Key; value: string; href: string }[] = [
  { key: "PARTY", value: "내파티", href: "/party" },
  { key: "SETTLEMENT", value: "정산", href: "/settlement" },
];
