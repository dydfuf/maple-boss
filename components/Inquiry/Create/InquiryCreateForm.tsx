import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import Image from "next/image";
import { useRouter } from "next/router";
import useCreateInquiry from "hooks/inquiry/useCreateInquiry";
import { Type } from "hooks/inquiry/useGetInquiry";
import ArrowDown from "@/public/images/ArrowDown.png";

export default function InquiryCreateForm() {
  const { createInquiry } = useCreateInquiry();
  const router = useRouter();

  return (
    <Form.Root
      className="mt-30 flex w-full flex-col gap-y-8"
      onSubmit={async (event) => {
        event.preventDefault();
        const { inquiryContent, inquiryTitle, inquiryType } =
          Object.fromEntries(new FormData(event.currentTarget));

        const { data } = await createInquiry({
          title: inquiryTitle as string,
          content: inquiryContent as string,
          type: inquiryType as Type,
        });
        if (data.code === "S000") {
          router.push("/inquiry");
          return;
        }
        alert("알수없는 이유로 생성에 실패했습니다. 다시 시도해주세요.");
      }}
    >
      <Form.Field className="mb-10 flex items-center" name="inquiryType">
        <div className="flex justify-between">
          <Form.Label className="mb-4 flex h-24 items-center px-8 text-20 font-bold text-gray-900">
            문의 타입 :
          </Form.Label>
          <Form.Message className="text-10" match="valueMissing">
            문의 문의 타입을 선택하세요
          </Form.Message>
        </div>
        <Form.Control asChild>
          <Select.Root>
            <Select.Trigger className="inline-flex h-50 w-120 items-center justify-center rounded-8 border-1 border-white-100 bg-white outline-none">
              <div className="flex w-full items-center justify-between px-16 text-13 text-gray-500">
                <Select.Value placeholder="문의 타입" />
                <Select.Icon>
                  <Image
                    src={ArrowDown.src}
                    width={16}
                    height={16}
                    alt="arrow-down"
                    className="h-16 w-16"
                  />
                </Select.Icon>
              </div>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="h-full w-120 overflow-auto rounded-8 bg-white"
                position="popper"
                sideOffset={2}
              >
                <Select.Viewport className="h-full w-full rounded-8 border-1 text-13 text-gray-500">
                  {SelectItemList.map((item) => (
                    <Select.Item
                      key={item}
                      className="relative flex h-50 w-full cursor-pointer items-center px-16"
                      value={item}
                    >
                      <Select.ItemText>{TypeToNameMap[item]}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </Form.Control>
      </Form.Field>

      <Form.Field className="mb-10 flex items-center" name="inquiryTitle">
        <div className="flex shrink-0 items-baseline justify-between">
          <Form.Label className="mb-4 flex h-24 items-center px-8 text-20 font-bold text-gray-900">
            문의 제목 :
          </Form.Label>
          <Form.Message className="text-10" match="valueMissing">
            문의 제목을 입력하세요
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="flex h-50 w-full items-center rounded-8 border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500 focus:outline-none"
            type="text"
            required
            placeholder="문의 제목을 입력해주세요."
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="mb-10 flex items-start" name="inquiryContent">
        <div className="flex shrink-0 items-baseline justify-between">
          <Form.Label className="mb-4 flex h-24 items-center px-8 text-20 font-bold text-gray-900">
            문의 내용 :
          </Form.Label>
          <Form.Message className="text-10" match="valueMissing">
            문의 내용을 입력해주세요
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className="flex h-600 w-full items-center rounded-8 border-1 border-white-100 bg-white px-16 py-8 text-14 font-normal text-gray-500 focus:outline-none"
            required
            placeholder="문의 내용을 입력해주세요."
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="mt-20 flex h-44 w-full items-center justify-center rounded-8 border-1 bg-purple-100">
          <span className="text-14 font-semibold leading-14 text-white">
            문의하기
          </span>
        </button>
      </Form.Submit>
    </Form.Root>
  );
}

const SelectItemList: Type[] = ["INQUIRY", "TENDINOUS"];
const TypeToNameMap: Record<Type, string> = {
  INQUIRY: "문의",
  TENDINOUS: "건의",
};
