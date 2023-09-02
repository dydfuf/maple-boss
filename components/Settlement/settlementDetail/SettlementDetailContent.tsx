import { DetailInfo } from "./DetailInfo";
import { Items } from "./Items";
import { SettlementRate } from "./SettlementRate";

export default function SettlementDetailContent() {
  return (
    <div className="flex flex-col">
      <div className="mt-40 flex w-full gap-20 ">
        <DetailInfo MAIN_DATA={MAIN_DATA} />
        <Items ITEMS={ITEMS} />
        <SettlementRate SETTLEMENT_RATE={SETTLEMENT_RATE} />
      </div>
      <div className="mt-50 flex w-full justify-center">
        <div className="flex gap-8">
          <button className="h-44 w-166 rounded-8 bg-gray-200 font-semibold text-gray-800">
            취소
          </button>
          <button className="h-44 w-166 rounded-8 bg-purple-100 font-semibold text-white">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

// @TODO: 아래의 상수값들은 모킹값으로 제거 필요.
const DETAIL = {
  data: {
    partySettlement: {
      id: 18,
      mainData: {
        partyId: 30,
        partyName: "파티",
        bossName: "윌",
        bossClazz: "이지",
        userName: "용사-7821",
        isLeader: true,
        createdAt: "2023-08-28T16:08:45.89271Z",
        status: "IN_PROGRESS",
        type: "MANUAL",
        confirmDate: "2023-08-29T16:08:45.89271Z",
        previousSettlementId: 17,
      },
      items: [
        {
          name: "스크롤",
          amount: 1,
          meso: 1000,
        },
        {
          name: "거대한 공포",
          amount: 1,
          meso: 1000,
        },
        {
          name: "경험치 쿠폰",
          amount: 1,
          meso: 1000,
        },
        {
          name: "태초의 정수",
          amount: 1,
          meso: 1000,
        },
        {
          name: "태초의 정수",
          amount: 1,
          meso: 1000,
        },
        {
          name: "태초의 정수",
          amount: 1,
          meso: 1000,
        },
        {
          name: "태초의 정수",
          amount: 1,
          meso: 1000,
        },
        {
          name: "태초의 정수",
          amount: 1,
          meso: 1000,
        },
      ],
      dividends: [
        {
          userName: "용사-7821",
          rate: 50,
        },
        {
          userName: "쩌로",
          rate: 50,
        },
      ],
    },
  },
};

const MAIN_DATA = DETAIL.data.partySettlement.mainData;
const ITEMS = DETAIL.data.partySettlement.items;
const SETTLEMENT_RATE = DETAIL.data.partySettlement.dividends;
