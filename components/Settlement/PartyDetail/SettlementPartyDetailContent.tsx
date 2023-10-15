import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Badge from "components/common/Badge";
import usePartySettlementPay from "hooks/settlement/usePartySettlementPay";
import usePartySettlementPayInfo from "hooks/settlement/usePartySettlementPayInfo";
import usePartySettlementSummary from "hooks/settlement/usePartySettlementSummary";

export default function SettlementPartyDetailContent() {
  const router = useRouter();
  const { partyId } = router.query;

  const {
    summaries,
    isLoading: isLoadingPartySettlementSummary,
    isNotFound: isNotFoundPartySettlementSummary,
  } = usePartySettlementSummary({ partyId: Number(partyId) });
  const {
    payInfo,
    isLoading: isLoadingPartySettlementPayInfo,
    isNotFound: isNotFoundPartySettlementPayInfo,
  } = usePartySettlementPayInfo({ partyId: Number(partyId) });
  const { count, sumMeso, userPayInfo, isLeader } = payInfo || {
    count: 0,
    sumMeso: 0,
    userPayInfo: {},
    isLeader: false,
  };
  const { partySettlementPay, isLoading: isLoadingPartySettlementPay } =
    usePartySettlementPay({
      partyId: Number(partyId),
    });

  const isLoading = [
    isLoadingPartySettlementPay,
    isLoadingPartySettlementPayInfo,
    isLoadingPartySettlementSummary,
  ].some(Boolean);

  useEffect(() => {
    if (isNotFoundPartySettlementSummary && isNotFoundPartySettlementPayInfo) {
      alert("해당 정산을 찾을 수 없습니다.");
      router.back();
    }
  }, [
    isNotFoundPartySettlementPayInfo,
    isNotFoundPartySettlementSummary,
    router,
  ]);

  const hasWillPay = Object.keys(userPayInfo).length !== 0;

  const showPayButton = hasWillPay && isLeader;

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="mt-40 flex w-full flex-col gap-32 lg:flex-row">
      <div className="h-full w-full lg:order-last lg:w-600">
        <div className="flex items-center justify-between">
          <span className="text-22 font-bold text-gray-900">
            지급 예정 <span className="text-12 font-normal">(수수료 제외)</span>
          </span>
          <span className="text-14 text-purple-100">{`확정된 정산 수 : ${count}`}</span>
        </div>
        <div className="mt-20 flex flex-col gap-y-8 rounded-8 border-1 border-white-100 px-20 py-12">
          {Object.entries(userPayInfo).map(([username, amount]) => (
            <div
              key={`payment-user-${username}`}
              className="flex justify-between text-12 font-normal"
            >
              <span className="text-gray-600">{username}</span>
              <span className="text-gray-900">{amount.toLocaleString()}</span>
            </div>
          ))}
          {!hasWillPay && <div>지급 예정이 없습니다.</div>}
        </div>
        {hasWillPay && (
          <div className="mt-18 flex items-center justify-between font-bold text-gray-900">
            <span>총 메소</span>
            <span>{sumMeso.toLocaleString()}</span>
          </div>
        )}
        {showPayButton && (
          <button
            className="mt-24 flex h-44 w-full items-center justify-center rounded-8 bg-purple-100"
            onClick={() => {
              if (summaries.length === 0) {
                alert("지급 예정 정산이 없습니다.");
                return;
              }
              partySettlementPay();
            }}
          >
            <span className="text-14  font-semibold text-white">지급</span>
          </button>
        )}
      </div>
      <div className="grid w-full grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {summaries.map((summary) => (
          <Link
            key={`summary-${summary.id}`}
            className="h-full w-full rounded-8 bg-gray-200 p-20"
            href={`/settlement/${partyId}/detail/${summary.id}`}
          >
            <div className="flex gap-x-6">
              <Badge variant={summary.type}>{summary.type}</Badge>
              <Badge variant={summary.status}>
                {STATUS_MAP[summary.status as "CONFIRMED" | "IN_PROGRESS"]}
              </Badge>
              <Badge variant={summary.bossClazz}>
                {BOSS_CLAZZ_TO_HANGEUL[summary.bossClazz]}
              </Badge>
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
        {summaries.length === 0 && <p>아직 정산이 없습니다.</p>}
      </div>
    </div>
  );
}

const BOSS_CLAZZ_TO_HANGEUL = {
  EASY: "이지",
  HARD: "하드",
  NORMAL: "노말",
  EXTREME: "익스트림",
  CHAOS: "카오스",
};

const STATUS_MAP = {
  CONFIRMED: "CONFIRMED",
  IN_PROGRESS: "IN-PROGRESS",
};
