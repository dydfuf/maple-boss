import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import useSettlementDetailInfo from "hooks/settlement/useSettlementDetailInfo";
import { cn } from "utils/common";
import Crown from "@/public/images/Crown.png";

export const DetailInfo = () => {
  const router = useRouter();
  const { settlementId } = router.query;
  const { partySettlement } = useSettlementDetailInfo({
    settlementId: Number(settlementId),
  });
  const { mainData } = partySettlement || {};
  const {
    partyName,
    bossName,
    bossClazz,
    isLeader,
    createdAt,
    status,
    type,
    confirmDate,
    previousSettlementId,
  } = mainData || {
    partyId: 0,
    partyName: "",
    bossName: "",
    bossClazz: "",
    userName: "",
    isLeader: false,
    createdAt: "",
    status: "",
    type: "",
    confirmDate: "",
    previousSettlementId: 0,
  };

  return (
    <div className="h-486 w-334 rounded-8 bg-gray-200 p-30">
      <div className="flex items-center justify-between">
        <span className="text-22 font-bold text-gray-900">파티 이름</span>
        <div className="flex h-16">
          <span className="mr-4 leading-16">{partyName}</span>
          {isLeader && (
            <Image src={Crown.src} width={16} height={16} alt="crown" />
          )}
        </div>
      </div>
      <ul className="mt-30 flex h-486 w-334 flex-col gap-10 [&_li]:flex [&_li]:h-54 [&_li]:w-274 [&_li]:items-center [&_li]:rounded-8 [&_li]:bg-white [&_li]:px-20">
        <li className="justify-center gap-6">
          <span className="text-18 font-bold">{bossName}</span>
          <div
            className={cn(BADGE_CLASSNAME, {
              "bg-red-100/10 text-red-100": bossClazz === "하드",
              "bg-green-100/10 text-green-100": bossClazz === "이지",
            })}
          >
            {bossClazz}
          </div>
        </li>
        <li className="justify-between">
          <span className="text-14 font-bold">생성일시</span>
          <span className="text-14">
            {createdAt !== "" &&
              format(new Date(createdAt), "yyyy.MM.dd HH:mm:ss")}
          </span>
        </li>
        <li className="justify-between">
          <span className="text-14 font-bold">상태</span>
          <span
            className={cn(BADGE_CLASSNAME, {
              "bg-gray-300 text-gray-500": status === "CONFIRMED",
              "bg-blue-100/10 text-blue-100": status === "IN_PROGRESS",
            })}
          >
            {STATUS_MAP[status as "CONFIRMED" | "IN_PROGRESS"]}
          </span>
        </li>
        <li className="justify-between">
          <span className="text-14 font-bold">타입</span>
          <span
            className={cn(BADGE_CLASSNAME, {
              "bg-purple-100/10 text-purple-100": type === "AUTO",
              "bg-yellow-100/10 text-yellow-100": type === "MANUAL",
            })}
          >
            {type}
          </span>
        </li>
        <li className="justify-between">
          <span className="text-14 font-bold">확정일시</span>
          <span className="text-14">
            {confirmDate !== "" &&
              format(new Date(confirmDate), "yyyy.MM.dd HH:mm:ss")}
          </span>
        </li>
        <li className="justify-between">
          <span className="text-14 font-bold">이전 정산</span>
          <span className="text-14">{previousSettlementId}</span>
        </li>
      </ul>
    </div>
  );
};

const BADGE_CLASSNAME =
  "flex h-22 items-center rounded-full px-8 text-12 leading-18";

const STATUS_MAP = {
  CONFIRMED: "CONFIRMED",
  IN_PROGRESS: "IN-PROGRESS",
};
