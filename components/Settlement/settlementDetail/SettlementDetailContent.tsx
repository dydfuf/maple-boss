import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import usePartySettlementEdit, {
  EditSettlement,
} from "hooks/settlement/usePartySettlementEdit";
import useSettlementDetailInfo, {
  PartySettlement,
} from "hooks/settlement/useSettlementDetailInfo";
import { DetailInfo } from "./DetailInfo";
import { Items } from "./Items";
import { SettlementRate } from "./SettlementRate";

const convertToEditSettlement = (
  partySettlement: PartySettlement
): EditSettlement => {
  const editSettlement: EditSettlement = {
    partySettlementId: partySettlement.id || 0,
    percentage: partySettlement.mainData.percentage,
    items:
      partySettlement.items?.map((item) => ({
        bossItemId: item.id,
        amount: item.amount,
        meso: item.meso,
      })) || [],
    dividends:
      partySettlement.dividends?.map((dividend) => ({
        memberId: dividend.userId,
        rate: dividend.rate,
      })) || [],
  };

  return editSettlement;
};

export default function SettlementDetailContent() {
  const router = useRouter();
  const { settlementId } = router.query;

  const { partySettlement } = useSettlementDetailInfo({
    settlementId: Number(settlementId),
  });

  const [editSettlement, setEditSettlement] = useState<
    PartySettlement | undefined
  >(partySettlement);

  const [isValid, setIsValid] = useState<boolean>(false);

  const { editPartySettlement } = usePartySettlementEdit();


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
        <SettlementRate
          dividends={editSettlement?.dividends}
          setEditSettlement={setEditSettlement}
          isValid={isValid}
          setIsValid={setIsValid}
        />
      </div>
      <div className="mt-50 flex w-full justify-center">
        <div className="flex gap-8">
          <button className="h-44 w-166 rounded-8 bg-gray-200 font-semibold text-gray-800">
            취소
          </button>
          <button
            className="h-44 w-166 rounded-8 bg-purple-100 font-semibold text-white"
            onClick={async () => {
              const settlement =
                editSettlement && convertToEditSettlement(editSettlement);
              if (isValid) {
                settlement && (await editPartySettlement(settlement));
              } else {
                alert("분배율을 100%로 맞춰주세요.");
              }
            }}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

