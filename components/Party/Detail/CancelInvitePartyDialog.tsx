import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  onConfirm: () => void;
}

export default function CancelInvitePartyDialog({ onConfirm }: Props) {
  return (
    <>
      <Dialog.Overlay className="fixed inset-0 data-[state=open]:bg-black/[0.3]" />
      <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-400 max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-white p-30 shadow-lg focus:outline-none">
        <div className="flex w-full flex-col items-center justify-center">
          <Dialog.Title className="mr-auto text-center text-24 font-bold text-gray-900">
            초대를 취소하시겠습니까?
          </Dialog.Title>
          <div className="mt-30 flex w-full gap-x-12">
            <Dialog.Close asChild>
              <button className="flex h-44 w-full items-center justify-center rounded-8 bg-gray-200 focus:outline-none">
                <span className="text-14 font-semibold text-gray-800">
                  취소
                </span>
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="flex h-44 w-full items-center justify-center rounded-8 bg-purple-100 focus:outline-none"
                onClick={onConfirm}
              >
                <span className="text-14 font-semibold text-white">확인</span>
              </button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </>
  );
}
