import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import usePartySettlementPay from "hooks/settlement/usePartySettlementPay";
import usePartySettlementPayInfo from "hooks/settlement/usePartySettlementPayInfo";
import { cn } from "utils/common";

export default function SettlementPartyDetailContent() {
  const router = useRouter();
  const { partyId } = router.query;

  // const { summary } = usePartySettlementSummary({ partyId: Number(partyId) });
  const { payInfo } = usePartySettlementPayInfo({ partyId: Number(partyId) });
  const { count, totalMeso, userPayInfo } = payInfo || {
    count: 0,
    totalMeso: 0,
    userPayInfo: {},
  };
  const { partySettlementPay } = usePartySettlementPay({
    partyId: Number(partyId),
  });

  return (
    <div className="mt-40 flex w-full flex-col gap-32 lg:flex-row">
      <div className="h-full w-full lg:order-last lg:w-600">
        <div className="flex items-center justify-between">
          <span className="text-22 font-bold text-gray-900">지급 예정</span>
          <span className="text-14 text-purple-100">{`확정된 정산 수 : ${count}`}</span>
        </div>
        <div className="mt-20 flex flex-col gap-y-8 rounded-8 border-1 border-white-100 px-20 py-12">
          {Object.entries(userPayInfo).map(([username, amount]) => (
            <div
              key={`payment-user-${username}`}
              className="flex justify-between text-12 font-normal"
            >
              <span className="text-gray-600">{username}</span>
              <span className="text-gray-900">{amount}</span>
            </div>
          ))}
          {Object.keys(userPayInfo).length === 0 && (
            <div>지급 예정이 없습니다.</div>
          )}
        </div>
        <div className="mt-18 flex items-center justify-between font-bold text-gray-900">
          <span>총 메소</span>
          <span>{totalMeso}</span>
        </div>
        <button
          className="mt-24 flex h-44 w-full items-center justify-center rounded-8 bg-purple-100"
          onClick={async () => {
            await partySettlementPay();
          }}
        >
          <span className="text-14  font-semibold text-white">지급</span>
        </button>
      </div>
      <div className="grid w-full grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {SUMMARY.map((summary) => (
          <Link
            key={`summary-${summary.id}`}
            className="h-full w-full rounded-8 bg-gray-200 p-20"
            href={`/settlement/${partyId}/detail/${summary.id}`}
          >
            <div className="flex gap-x-6">
              <div
                className={cn(BADGE_CLASSNAME, {
                  "bg-purple-100/10 text-purple-100": summary.type === "AUTO",
                  "bg-yellow-100/10 text-yellow-100": summary.type === "MANUAL",
                })}
              >
                {summary.type}
              </div>
              <div
                className={cn(BADGE_CLASSNAME, {
                  "bg-gray-300 text-gray-500": summary.status === "CONFIRMED",
                  "bg-blue-100/10 text-blue-100":
                    summary.status === "IN_PROGRESS",
                })}
              >
                {STATUS_MAP[summary.status as "CONFIRMED" | "IN_PROGRESS"]}
              </div>
              <div
                className={cn(BADGE_CLASSNAME, {
                  "bg-red-100/10 text-red-100": summary.bossClazz === "HARD",
                  "bg-green-100/10 text-green-100":
                    summary.bossClazz === "EASY",
                })}
              >
                {BOSS_CLAZZ_TO_HANGEUL[summary.bossClazz as "HARD" | "EASY"]}
              </div>
            </div>
            <p className="mt-10 text-18 font-bold">{summary.bossName}</p>
            <div className="mt-24 flex flex-col text-12 font-normal text-gray-500">
              <p>{`생성 : ${format(
                new Date(summary.createdAt),
                "yyyy.MM.dd HH:mm:ss"
              )}`}</p>
              {summary.confirmedAt && (
                <p>
                  {`확정 : ${format(
                    new Date(summary.confirmedAt),
                    "yyyy.MM.dd HH:mm:ss"
                  )}`}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const BADGE_CLASSNAME =
  "flex h-22 items-center rounded-full px-8 text-12 leading-18";

const BOSS_CLAZZ_TO_HANGEUL = {
  EASY: "이지",
  HARD: "하드",
};

const STATUS_MAP = {
  CONFIRMED: "CONFIRMED",
  IN_PROGRESS: "IN-PROGRESS",
};

// @TODO: 아래의 상수값들은 모킹값으로 제거 필요.
const SUMMARY = [
  {
    id: 15,
    bossName: "루시드",
    bossClazz: "HARD",
    type: "MANUAL",
    status: "IN_PROGRESS",
    createdAt: "2023-08-18T03:53:09.937757Z",
  },
  {
    id: 16,
    bossName: "윌",
    bossClazz: "EASY",
    type: "AUTO",
    status: "CONFIRMED",
    createdAt: "2023-08-18T03:53:09.941471Z",
    confirmedAt: "2023-08-18T03:53:09.937757Z",
  },
  {
    id: 17,
    bossName: "윌",
    bossClazz: "EASY",
    type: "MANUAL",
    status: "IN_PROGRESS",
    createdAt: "2023-08-18T03:53:09.937757Z",
  },
  {
    id: 18,
    bossName: "윌",
    bossClazz: "EASY",
    type: "AUTO",
    status: "CONFIRMED",
    createdAt: "2023-08-18T03:53:09.941471Z",
    confirmedAt: "2023-08-18T03:53:09.937757Z",
  },
  {
    id: 25,
    bossName: "윌",
    bossClazz: "EASY",
    type: "MANUAL",
    status: "IN_PROGRESS",
    createdAt: "2023-08-18T03:53:09.937757Z",
  },
  {
    id: 26,
    bossName: "윌",
    bossClazz: "EASY",
    type: "AUTO",
    status: "CONFIRMED",
    createdAt: "2023-08-18T03:53:09.941471Z",
    confirmedAt: "2023-08-18T03:53:09.937757Z",
  },
  {
    id: 27,
    bossName: "윌",
    bossClazz: "EASY",
    type: "MANUAL",
    status: "IN_PROGRESS",
    createdAt: "2023-08-18T03:53:09.937757Z",
  },
  {
    id: 28,
    bossName: "윌",
    bossClazz: "EASY",
    type: "AUTO",
    status: "CONFIRMED",
    createdAt: "2023-08-18T03:53:09.941471Z",
    confirmedAt: "2023-08-18T03:53:09.937757Z",
  },
];
