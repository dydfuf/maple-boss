import type { Meta, StoryObj } from "@storybook/react";

import Button from "../Button";
import Text from "../Text";

const meta: Meta<typeof Button> = {
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => {
    return (
      <div>
        <div>
          <p>Login_btn</p>
          <div className=" flex w-332 flex-col gap-25 p-16 outline-dashed outline-1 outline-red-100">
            <div>
              <p>Active</p>
              <Button roundSize="full" label="가입하기" />
            </div>
            <div>
              <p>Disable</p>
              <Button roundSize="full" disabled label="가입하기" />
            </div>
          </div>
        </div>
        <div>
          <p>Popup_btn</p>
          <div className="flex w-158 flex-col gap-25 p-16 outline-dashed outline-1 outline-red-100 ">
            <div>
              <p>Active</p>
              <Button roundSize="default" label="확인" />
            </div>
            <div>
              <p>Disable</p>
              <Button roundSize="default" disabled label="확인" />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

//팝업 안에 들어간 글이 한 줄에 안들어가서 예시를 위해 임의로 tracking-[-2.5px]를 적용해주었습니다.
export const Popup_example: Story = {
  render: () => (
    <>
      <p>popup_example</p>
      <div className="flex gap-25 bg-gray-600 p-20">
        <div className="flex h-210 w-300 flex-col items-center justify-center gap-20 rounded-20 bg-white px-20 py-40 ">
          <div className="flex flex-col items-center justify-center text-center tracking-[-2.5px]">
            <Text size={4}>임시 비밀번호가 발송되었습니다.</Text>
            <Text size={4}>이메일을 확인하세요.</Text>
          </div>
          <div className="flex w-1/2 justify-center">
            <Button label="확인" />
          </div>
        </div>
        <div className="flex h-210 w-300 flex-col gap-20 rounded-20 bg-white px-20 py-40">
          <div className="flex flex-col items-center justify-center text-center tracking-[-2.5px]">
            <Text size={4}>임시 비밀번호가 발송되었습니다.</Text>
            <Text size={4}>이메일을 확인하세요.</Text>
          </div>
          <div className="flex justify-center gap-8">
            <Button disabled label="확인" />
            <Button label="확인" />
          </div>
        </div>
      </div>
    </>
  ),
};
