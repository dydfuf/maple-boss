import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";

interface Props {
  nickName: string;
  onSubmit: (name: string, description: string) => void;
}

export default function CreatePartyDialog({ nickName, onSubmit }: Props) {
  return (
    <>
      <Dialog.Overlay className="fixed inset-0 data-[state=open]:bg-black/[0.3]" />
      <Form.Root
        className="mt-30 flex w-full flex-col gap-y-8"
        onSubmit={async (event) => {
          event.preventDefault();
          const { name, description } = Object.fromEntries(
            new FormData(event.currentTarget)
          );
          onSubmit(name as string, description as string);
        }}
      >
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-400 max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-white p-30 shadow-lg focus:outline-none">
          <div className="flex w-full flex-col items-center justify-center">
            <Dialog.Title className="mr-auto text-center text-24 font-bold text-gray-900">
              파티 생성
            </Dialog.Title>

            <Form.Field className="mt-24 grid w-full" name="name">
              <div className="flex items-baseline justify-between">
                <Form.Label className="mb-2 flex h-24 items-center px-8 text-13 font-normal leading-13 text-gray-900">
                  파티 이름
                </Form.Label>
                <Form.Message className="text-10" match="valueMissing">
                  파티 이름을 입력해주세요
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="flex h-50 items-center rounded-8 border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500"
                  type="text"
                  required
                  placeholder="파티 이름을 입력해주세요"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="mt-12 grid w-full" name="description">
              <div className="flex items-baseline justify-between">
                <Form.Label className="mb-2 flex h-24 items-center px-8 text-13 font-normal leading-13 text-gray-900">
                  파티 설명
                </Form.Label>
                <Form.Message className="text-10" match="valueMissing">
                  파티 설명을 입력해주세요
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="flex h-50 items-center rounded-8 border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500"
                  type="text"
                  required
                  placeholder="파티 설명을 입력해주세요"
                />
              </Form.Control>
            </Form.Field>

            <div className="mt-20 flex w-full justify-between rounded-8 bg-gray-200 p-16 text-13 text-gray-900">
              <span className="font-normal">파티장</span>
              <span className="font-semibold">{nickName}</span>
            </div>

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
                  <span className="text-14 font-semibold text-white">생성</span>
                </button>
              </Form.Submit>
            </div>
          </div>
        </Dialog.Content>
      </Form.Root>
    </>
  );
}
