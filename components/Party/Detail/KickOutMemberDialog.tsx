import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";

interface Props {
  onSubmit: (email: string, memberEmail: string) => void;
  kickOutMemberEmail: string;
}

export default function KickOutMemberDialog({
  onSubmit,
  kickOutMemberEmail,
}: Props) {
  const [isMismatch, setIsMismatch] = useState<boolean>(true);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 data-[state=open]:bg-black/[0.3]" />
      <Form.Root
        className="mt-30 flex w-full flex-col gap-y-8"
        onSubmit={async (event) => {
          event.preventDefault();
          const { email } = Object.fromEntries(
            new FormData(event.currentTarget)
          );
          onSubmit(email as string, kickOutMemberEmail);
        }}
      >
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-400 max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-white p-30 shadow-lg focus:outline-none">
          <div className="flex w-full flex-col items-center justify-center">
            <Dialog.Title className="mr-auto text-center text-24 font-bold text-gray-900">
              파티원 강퇴
            </Dialog.Title>

            <Form.Field className="mt-24 grid w-full" name="email">
              <div className="flex items-baseline justify-between">
                <Form.Label className="mb-2 flex h-24 items-center px-8 text-13 font-normal leading-13 text-gray-500">
                  <span>강퇴를 원하시면</span>
                  <span className="font-semibold text-purple-100">
                    &nbsp;이메일
                  </span>
                  <span>을 입력하세요</span>
                </Form.Label>
                <Form.Message className="text-10" match="valueMissing">
                  이메일을 입력해주세요
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="flex h-50 items-center rounded-8 border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500"
                  type="email"
                  required
                  placeholder="이메일을 입력해주세요"
                  onChange={(e) =>
                    setIsMismatch(e.target.value !== kickOutMemberEmail)
                  }
                />
              </Form.Control>
            </Form.Field>
            <div className="mt-30 flex w-full gap-x-12">
              <Dialog.Close asChild>
                <button className="flex h-44 w-full items-center justify-center rounded-8 bg-gray-200 focus:outline-none">
                  <span className="text-14 font-semibold text-gray-800">
                    취소
                  </span>
                </button>
              </Dialog.Close>
              <Form.Submit asChild>
                <button
                  className="flex h-44 w-full items-center justify-center rounded-8 bg-purple-100 focus:outline-none disabled:opacity-50"
                  disabled={isMismatch}
                >
                  <span className="text-14 font-semibold text-white">강퇴</span>
                </button>
              </Form.Submit>
            </div>
          </div>
        </Dialog.Content>
      </Form.Root>
    </Dialog.Portal>
  );
}
