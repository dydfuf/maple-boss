import { useRouter } from "next/router";
import CommonDialogButtonGroup from "components/common/Dialog/CommonDialogButtonGroup";
import CommonDialogContent from "components/common/Dialog/CommonDialogContent";
import CommonDialogTitle from "components/common/Dialog/CommonDialogTitle";
import useSettlementDetailInfo from "hooks/settlement/useSettlementDetailInfo";

interface Props {
  onSubmit: () => void;
}

export default function SettlementConfirmDialog({ onSubmit }: Props) {
  const router = useRouter();
  const { settlementId } = router.query;

  const { partySettlement } = useSettlementDetailInfo({
    settlementId: Number(settlementId),
  });

  const { items } = partySettlement || {};

  const isValidItem = () => {
    let result = true;

    items?.forEach((item) => {
      if (item.amount === 0 || item.meso === 0) {
        result = false;
      }
    });

    return result;
  };

  const handleConfirmClick = () => {
    if (items?.length === 0) {
      alert("추가된 아이템 목록이 없습니다.");
      return;
    }
    if (!isValidItem()) {
      alert("수량이 0인 항목 또는 메소가 0인 항목이 있습니다.");
      return;
    }
    onSubmit();
  };

  return (
    <CommonDialogContent>
      <CommonDialogTitle title="정산 확정" />
      <p className="mt-24 text-14 font-normal text-gray-500">
        해당 정산을 확정 하시겠습니까?
      </p>
      <CommonDialogButtonGroup
        confirmLabel="확정"
        onClickConfirm={handleConfirmClick}
      />
    </CommonDialogContent>
  );
}
