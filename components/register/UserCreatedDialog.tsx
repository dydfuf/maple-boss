import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";

export default function UserCreatedDialog() {
  const router = useRouter();

  return (
    <>
      <Dialog.Overlay className="fixed inset-0 data-[state=open]:bg-black/[0.3]" />
      <Dialog.Content
        className="fixed left-1/2 top-1/2 max-h-[85vh] w-400 max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-white p-30 shadow-lg focus:outline-none"
        onInteractOutside={() => {
          router.push("/login");
        }}
      >
        <Dialog.Title className="text-center font-bold text-gray-900">
          회원가입이 완료 되었습니다.
        </Dialog.Title>
        <div className="mt-[25px] flex justify-center">
          <Dialog.Close asChild>
            <button
              className="flex h-44 w-130 items-center justify-center rounded-8 bg-purple-100 focus:outline-none"
              onClick={() => {
                router.push("/login");
              }}
            >
              <span className="text-14 font-semibold text-white">
                로그인 하러 가기
              </span>
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </>
  );
}
