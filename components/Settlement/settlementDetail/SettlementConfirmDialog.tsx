import CommonDialogButtonGroup from "components/common/Dialog/CommonDialogButtonGroup";
import CommonDialogContent from "components/common/Dialog/CommonDialogContent";
import CommonDialogTitle from "components/common/Dialog/CommonDialogTitle";

interface Props {
  onSubmit: () => void;
}

export default function SettlementConfirmDialog({ onSubmit }: Props) {
  return (
    <CommonDialogContent>
      <CommonDialogTitle title="정산 삭제" />
      <p className="mt-24 text-14 font-normal text-gray-500">
        해당 정산을 확정 하시겠습니까?
      </p>
      <CommonDialogButtonGroup confirmLabel="확정" onClickConfirm={onSubmit} />
    </CommonDialogContent>
  );
}
