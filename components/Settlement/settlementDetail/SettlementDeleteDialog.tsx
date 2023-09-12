import { useState } from "react";
import CommonDialogButtonGroup from "components/common/Dialog/CommonDialogButtonGroup";
import CommonDialogContent from "components/common/Dialog/CommonDialogContent";
import CommonDialogTitle from "components/common/Dialog/CommonDialogTitle";

interface Props {
  partyName: string;
  onSubmit: () => void;
}

export default function SettlementDeleteDialog({ partyName, onSubmit }: Props) {
  const [value, setValue] = useState("");

  const isValueValid = () => {
    return value === `${partyName}/정산 삭제`;
  };

  return (
    <CommonDialogContent>
      <CommonDialogTitle title="정산 삭제" />
      <p className="mt-24 text-14 font-normal text-gray-500">
        정산을 삭제하시려면{" "}
        <span className="font-semibold text-purple-100">{`${partyName}/정산 삭제`}</span>
        를 입력하세요.
      </p>
      <input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="파티 이름/정산 삭제"
        className="mt-12 flex h-50 w-full items-center justify-center rounded-8 border-1 border-white-100 px-16 text-14 font-normal"
      />
      <CommonDialogButtonGroup
        confirmDisabled={!isValueValid()}
        confirmLabel="삭제"
        onClickConfirm={() => {
          if (isValueValid()) {
            onSubmit();
          }
        }}
      />
    </CommonDialogContent>
  );
}
