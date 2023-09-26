import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSettlementDetailInfo, {
  PartySettlement,
} from "hooks/settlement/useSettlementDetailInfo";
import { DetailInfo } from "./DetailInfo";
import { Items } from "./Items";
import { SettlementRate } from "./SettlementRate";

// 추후에 저장기능시 사용할 인터페이스입니다!
// interface EditSettlement {
//   partySettlementId: number;
//   percentage: number;
//   items: {
//     bossItemId: number;
//     amount: number;
//     meso: number;
//   }[];
//   dividends: {
//     memberId: number;
//     rate: number;
//   }[];
// }

export default function SettlementDetailContent() {
  const router = useRouter();
  const { settlementId } = router.query;
  const { partySettlement } = useSettlementDetailInfo({
    settlementId: Number(settlementId),
  });

  const [editSettlement, setEditSettlement] = useState<
    PartySettlement | undefined
  >(partySettlement);

  // 저장기능이 아직이라 제대로 수정된 editSettlement가 전달되었는지 확인용 코드입니다. 개발 완료시 삭제하겠습니다!
  const onClickConfirm = () => {
    console.log(editSettlement);
  };

  useEffect(() => {
    partySettlement && setEditSettlement(partySettlement);
  }, [partySettlement]);

  return (
    <div className="flex flex-col">
      <div className="mt-40 flex w-full gap-20 ">
        <DetailInfo setEditSettlement={setEditSettlement} />
        <Items
          items={editSettlement?.items}
          setEditSettlement={setEditSettlement}
        />
        <SettlementRate />
      </div>
      <div className="mt-50 flex w-full justify-center">
        <div className="flex gap-8">
          <button className="h-44 w-166 rounded-8 bg-gray-200 font-semibold text-gray-800">
            취소
          </button>
          <button
            className="h-44 w-166 rounded-8 bg-purple-100 font-semibold text-white"
            onClick={onClickConfirm}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
