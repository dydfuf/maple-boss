import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSettlementDetailInfo, {
  Dividends,
} from "hooks/settlement/useSettlementDetailInfo";

export const SettlementRate = () => {
  const router = useRouter();
  const { settlementId } = router.query;
  const { partySettlement } = useSettlementDetailInfo({
    settlementId: Number(settlementId),
  });
  const [dividends, setDividends] = useState<Array<Dividends>>(
    (partySettlement && partySettlement.dividends) || []
  );

  useEffect(() => {
    partySettlement && setDividends(partySettlement.dividends);
  }, [partySettlement]);

  return (
    <div className="h-486 w-504 overflow-auto rounded-8 bg-gray-200 p-30">
      <div className="flex items-center justify-between">
        <span className="text-18 font-bold text-gray-800">분배율</span>
        <span className="text-16 font-bold text-purple-100">
          총 분배율 100%
        </span>
      </div>
      {dividends.length !== 0 && (
        <div className="mt-30 flex gap-10">
          <div className="flex w-197 flex-col">
            <span className="mb-8 ml-8 text-13">이름</span>
            <ul className="flex flex-col gap-10">
              {dividends.map((target) => (
                <li
                  key={`settlement-userName-${target.userName}`}
                  className="h-50 w-full rounded-8 border-1 border-white-100 bg-white pl-16 leading-50 focus:outline-none"
                >
                  {target.userName}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-197 flex-col">
            <span className="mb-8 ml-8 text-13">분배율</span>
            <ul className="flex flex-col gap-10">
              {dividends.map((target) => (
                <li
                  key={`settlement-rate-${target.userName}`}
                  className="h-50 w-full rounded-8 border-1 border-white-100 bg-white pl-16 leading-50 focus:outline-none"
                >
                  {`${target.rate}%`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
