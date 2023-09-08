import * as Dialog from "@radix-ui/react-alert-dialog";

interface Props {
  cancelLabel?: string;
  confirmLabel?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  onClickCancel?: () => void;
  onClickConfirm?: () => void;
}

export default function CommonDialogButtonGroup({
  cancelLabel = "취소",
  confirmLabel = "확인",
  showCancel = true,
  showConfirm = true,
  onClickCancel,
  onClickConfirm,
}: Props) {
  return (
    <div className="mt-30 flex w-full items-center justify-center gap-x-12">
      {showCancel && (
        <Dialog.Cancel asChild>
          <button
            className="flex h-44 w-180 items-center justify-center rounded-8 bg-gray-200 focus:outline-none"
            onClick={onClickCancel}
          >
            <span className="text-14 font-semibold text-gray-800">
              {cancelLabel}
            </span>
          </button>
        </Dialog.Cancel>
      )}
      {showConfirm && (
        <button
          className="flex h-44 w-180 items-center justify-center rounded-8 bg-purple-100 focus:outline-none"
          onClick={onClickConfirm}
        >
          <span className="text-14 font-semibold text-white">
            {confirmLabel}
          </span>
        </button>
      )}
    </div>
  );
}
