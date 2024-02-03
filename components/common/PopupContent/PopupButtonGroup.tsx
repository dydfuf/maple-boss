import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Button from "components/common/Button";
import { cn } from "utils/common";
interface Props {
  onActionClick: () => void;
  actionLabel?: string;
  cancelLabel?: string;
  disabledAction?: boolean;
  onCancelClick?: () => void;
}
//TODO cancel버튼 색 변경, 버튼 컴포넌트 변경 필요
export default function PopupButtonGroup({
  onActionClick,
  onCancelClick,
  disabledAction,
  cancelLabel = "취소",
  actionLabel = "확인",
}: Props) {
  return (
    <div
      className={cn(
        !onCancelClick && "mx-auto w-1/2",
        "flex items-center justify-between gap-8"
      )}
    >
      {onCancelClick && (
        <AlertDialog.Cancel asChild>
          <Button onClick={onCancelClick} label={cancelLabel} />
        </AlertDialog.Cancel>
      )}
      <AlertDialog.Action asChild>
        <Button
          disabled={disabledAction}
          onClick={onActionClick}
          label={actionLabel}
        />
      </AlertDialog.Action>
    </div>
  );
}
