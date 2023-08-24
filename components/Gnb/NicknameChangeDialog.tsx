import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";

interface Props {
  onSubmit: (nickname: string) => void;
}

export default function NicknameChangeDialog({ onSubmit }: Props) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 data-[state=open]:bg-black/[0.3]" />
      <Form.Root
        className="mt-30 flex w-full flex-col gap-y-8"
        onSubmit={async (event) => {
          event.preventDefault();
          const { nickname } = Object.fromEntries(
            new FormData(event.currentTarget)
          );
          onSubmit(nickname as string);
        }}
      >
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-400 max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-white p-30 shadow-lg focus:outline-none">
          <div className="flex w-full flex-col items-center justify-center">
            <Dialog.Title className="mr-auto text-center text-24 font-bold text-gray-900">
              닉네임 변경
            </Dialog.Title>
            <Form.Field className="mt-24 grid w-full" name="nickname">
              <div className="flex items-baseline justify-between">
                <Form.Message className="text-10" match="valueMissing">
                  닉네임을 입력하세요
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="flex h-50 items-center rounded-8 border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500"
                  type="text"
                  required
                  placeholder="닉네임을 입력해주세요"
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
                <button className="flex h-44 w-full items-center justify-center rounded-8 bg-purple-100 focus:outline-none">
                  <span className="text-14 font-semibold text-white">변경</span>
                </button>
              </Form.Submit>
            </div>
          </div>
        </Dialog.Content>
      </Form.Root>
    </Dialog.Portal>
  );
}
