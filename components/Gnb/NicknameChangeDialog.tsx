/** @TODO #125 Topbar의 팝오버를 구현할때 제거되어야 합니다. */
import * as Dialog from "@radix-ui/react-alert-dialog";
import * as Form from "@radix-ui/react-form";
import CommonDialogContent from "components/common/Dialog/CommonDialogContent";
import CommonDialogTitle from "components/common/Dialog/CommonDialogTitle";

interface Props {
  onSubmit: (nickname: string) => void;
}

export default function NicknameChangeDialog({ onSubmit }: Props) {
  const validateNickNameLength = (value: string) => {
    return value.length <= 1 || value.length >= 8;
  };

  const validateNickNameEngKorNum = (value: string) => {
    return !/^[A-Za-z0-9가-힣]*$/.test(value);
  };

  return (
    <CommonDialogContent contentClassName="w-400">
      <Form.Root
        className="flex w-full flex-col gap-y-8"
        onSubmit={async (event) => {
          event.preventDefault();
          const { nickname } = Object.fromEntries(
            new FormData(event.currentTarget)
          );
          onSubmit(nickname as string);
        }}
      >
        <CommonDialogTitle title="닉네임 변경" />
        <Form.Field className="mt-24 grid w-full" name="nickname">
          <div className="flex items-baseline justify-between">
            <Form.Message className="p-4 text-12" match="valueMissing">
              닉네임을 입력하세요
            </Form.Message>
            <Form.Message
              className="p-4 text-12 text-red-100"
              match={validateNickNameLength}
            >
              닉네임은 2~7자리로 설정해주세요
            </Form.Message>
            <Form.Message
              className="p-4 text-12 text-red-100"
              match={validateNickNameEngKorNum}
            >
              닉네임은, 한글, 영어, 숫자만 입력 가능합니다.
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
          <Dialog.Cancel asChild>
            <button className="flex h-44 w-full items-center justify-center rounded-8 bg-gray-200 focus:outline-none">
              <span className="text-14 font-semibold text-gray-800">취소</span>
            </button>
          </Dialog.Cancel>
          <Form.Submit asChild>
            <button className="flex h-44 w-full items-center justify-center rounded-8 bg-purple-100 focus:outline-none">
              <span className="text-14 font-semibold text-white">변경</span>
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </CommonDialogContent>
  );
}
