import useSettlementDetailInfo from "hooks/settlement/useSettlementDetailInfo";
import { useRouter } from "next/router";
import React from "react";

export const Items = () => {
  const router = useRouter();
  const { settlementId } = router.query;
  const { partySettlement } = useSettlementDetailInfo({
    settlementId: Number(settlementId),
  });
  const items = (partySettlement && partySettlement.items) || [
    { name: "", amount: 0, meso: 0 },
  ];

  return (
    <div className="h-486 w-504 overflow-auto rounded-8 bg-gray-200 p-30">
      <div className="flex items-center justify-between">
        <span className="text-18 font-bold text-gray-800">아이템</span>
        <button className="h-26 rounded-4 bg-gray-300 px-8 text-center text-14 font-semibold leading-26 text-gray-800">
          아이템추가
        </button>
      </div>
      {items[0].name !== "" ? (
        <div className="mt-30 flex gap-10">
          <div className="flex w-195 flex-col">
            <span className="mb-8 ml-8 text-13">이름</span>
            <ul className="flex flex-col gap-10">
              {items.map((item) => (
                <li
                  key={item.name}
                  className="h-50 w-full rounded-8 border-1 border-white-100 bg-white pl-16 leading-50"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-50 flex-col">
            <span className="mb-8 ml-8 text-13">수량</span>
            <ul className="flex flex-col gap-10">
              {items.map((item) => (
                <li
                  key={`items-amount-${item.name}`}
                  className="h-50 w-full rounded-8 border-1 border-white-100 bg-white text-center leading-50"
                >
                  {item.amount}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-160 flex-col">
            <span className="mb-8 ml-8 text-13">메소</span>
            <ul className="flex flex-col gap-10">
              {items.map((item) => (
                <li
                  key={`items-meso-${item.name}`}
                  className="h-50 w-full rounded-8 border-1 border-white-100 bg-white pl-16 leading-50"
                >
                  {item.meso.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-30">아이템이 존재하지 않습니다.</div>
      )}
    </div>
  );
};
