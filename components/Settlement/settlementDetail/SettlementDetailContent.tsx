import { DetailInfo } from "./DetailInfo";
import { Items } from "./Items";
import { SettlementRate } from "./SettlementRate";

export default function SettlementDetailContent() {
  return (
    <div className="flex flex-col">
      <div className="mt-40 flex w-full gap-20 ">
        <DetailInfo />
        <Items />
        <SettlementRate />
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
