import Image from "next/image";
import Link from "next/link";
import usePartySettlementDetailCounts from "hooks/settlement/usePartySettlementDetailCounts";
import Crown from "@/public/images/Crown.png";

export default function SettlementListContent() {
  const { partySettlementDetailCounts } = usePartySettlementDetailCounts();

  return (
    <div className="mt-40 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {partySettlementDetailCounts?.map((settlement, idx) => {
        const settlementCountList = [
          { label: "진행중 정산", value: settlement.inProgressCount },
          { label: "확정된 정산", value: settlement.confirmedCount },
          { label: "지금까지 지급된 정산", value: settlement.paidCount },
          { label: "자동 정산", value: settlement.autoCount },
          { label: "수동 정산", value: settlement.manualCount },
        ];
        return (
          <Link
            key={`${settlement.partyId}-${idx}`}
            className="flex h-full w-full flex-col rounded-8 border-1 border-white-100 p-20"
            href={`/settlement/${settlement.partyId}`}
          >
            <div className="flex items-center gap-x-6">
              <p className="text-22 font-bold text-gray-900">
                {settlement.partyName}
              </p>
              {settlement.isLeader && (
                <Image src={Crown.src} width={16} height={16} alt="crown" />
              )}
            </div>
            <div className="mt-20 flex flex-col gap-y-8 rounded-8 bg-gray-200 px-20 py-16">
              {settlementCountList.map((settlementCount) => (
                <div
                  key={settlementCount.label}
                  className="flex w-full justify-between text-14 font-normal"
                >
                  <p className="text-gray-600">{settlementCount.label}</p>
                  <p className="text-gray-800">{settlementCount.value}</p>
                </div>
              ))}
            </div>
          </Link>
        );
      })}
      {partySettlementDetailCounts.length === 0 && (
        <p>정산 데이터가 없습니다.</p>
      )}
    </div>
  );
}
