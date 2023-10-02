import * as Dialog from "@radix-ui/react-alert-dialog";
import * as Form from "@radix-ui/react-form";
import CommonDialogContent from "components/common/Dialog/CommonDialogContent";
import CommonDialogTitle from "components/common/Dialog/CommonDialogTitle";

interface Props {
  onSubmit: (password: string) => void;
}

export default function PasswordChangeDialog({ onSubmit }: Props) {
  const validatePassword = (value: string) => {
    // 비밀번호 길이가 8~50자인지 확인
    if (value.length < 8 || value.length > 50) {
      return true;
    }
    // 특수문자 포함 여부 확인
    if (!/[!@#$]/.test(value)) {
      return true;
    }
    // 모든 조건을 만족하면 유효한 비밀번호
    return false;
  };

  return (
    <CommonDialogContent contentClassName="w-400">
      <Form.Root
        className="mt-30 flex w-full flex-col gap-y-8"
        onSubmit={async (event) => {
          event.preventDefault();
          const { password } = Object.fromEntries(
            new FormData(event.currentTarget)
          );
          onSubmit(password as string);
        }}
      >
        <CommonDialogTitle title="비밀번호 변경" />
        <Form.Field className="mt-24 grid w-full" name="password">
          <div className="flex items-baseline justify-between">
            <Form.Message className="p-4 text-12" match="valueMissing">
              비밀번호를 입력하세요
            </Form.Message>
            <Form.Message
              className="p-4 text-12 text-red-100"
              match={validatePassword}
            >
              비밀번호는 8~50자, 특수문자를 포함해야 합니다.
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="flex h-50 items-center rounded-8 border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500"
              type="password"
              required
              placeholder="비밀번호를 입력해주세요"
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
