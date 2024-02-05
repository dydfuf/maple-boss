import type { Meta, StoryObj } from "@storybook/react";

import Text from "../Text";
import Input from "./index";

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const DEFAULT: Story = {
  render: () => (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-8">
        <p>Default</p>
        <Input placeholder="파티이름을 입력해주세요" />
      </div>
      <div className="flex flex-col gap-8">
        <p>Button</p>
        <Input
          innerButton={
            <button className="flex shrink-0 items-center rounded-full bg-gray8 px-12 py-4">
              <Text size={2} className="text-gray4">
                전송
              </Text>
            </button>
          }
        />
      </div>
      <div className="flex flex-col gap-8">
        <p>Focused</p>
        <Input autoFocus />
      </div>
      <div className="flex flex-col gap-8">
        <p>Disabled</p>
        <Input disabled placeholder="파티이름을 입력해주세요" />
      </div>
      <div className="flex flex-col gap-8">
        <p>Error</p>
        <Input disabled placeholder="파티이름을 입력해주세요" />
      </div>
      <div className="flex flex-col gap-8">
        <p>Entered</p>
        <Input value="파티이름을 입력해주세요" />
      </div>
    </div>
  ),
};

export const FULL_ROUND: Story = {
  render: () => (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-8">
        <p>Default</p>
        <Input roundSize="full" placeholder="파티이름을 입력해주세요" />
      </div>
      <div className="flex flex-col gap-8">
        <p>Button</p>
        <Input
          roundSize="full"
          innerButton={
            <button className="flex shrink-0 items-center rounded-full bg-gray8 px-12 py-4">
              <Text size={2} className="text-gray4">
                전송
              </Text>
            </button>
          }
        />
      </div>
      <div className="flex flex-col gap-8">
        <p>Focused</p>
        <Input roundSize="full" autoFocus />
      </div>
      <div className="flex flex-col gap-8">
        <p>Disabled</p>
        <Input
          roundSize="full"
          disabled
          placeholder="파티이름을 입력해주세요"
        />
      </div>
      <div className="flex flex-col gap-8">
        <p>Error</p>
        <Input roundSize="full" placeholder="파티이름을 입력해주세요" />
      </div>
      <div className="flex flex-col gap-8">
        <p>Entered</p>
        <Input roundSize="full" value="파티이름을 입력해주세요" />
      </div>
    </div>
  ),
};
