import * as Dialog from "@radix-ui/react-dialog";

export default function EmailSendedDialog() {
  return (
    <>
      <Dialog.Overlay className="fixed inset-0 data-[state=open]:bg-black/[0.3]" />
      <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-400 max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-white p-30 shadow-lg focus:outline-none">
        <Dialog.Title className="text-center font-bold text-gray-900">
          인증 이메일이 발송 되었습니다. <br /> 이메일을 확인하세요
        </Dialog.Title>
        <div className="mt-[25px] flex justify-center">
          <Dialog.Close asChild>
            <button className="flex h-44 w-130 items-center justify-center rounded-8 bg-purple-100 focus:outline-none">
              <span className="text-14 font-semibold text-white">확인</span>
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </>
  );
}
