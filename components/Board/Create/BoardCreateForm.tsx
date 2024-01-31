import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import { Editor } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useRef } from "react";
import useCreateBoard from "hooks/board/useCreateBoard";
import { Category } from "hooks/board/useGetBoard";
import ArrowDown from "@/public/images/ArrowDown.png";

const ToastEditor = dynamic(() => import("components/common/Editor"), {
  ssr: false,
});

export default function BoardCreateForm() {
  const { createBoard } = useCreateBoard();
  const router = useRouter();

  const textRef = useRef<Editor>(null);

  return (
    <Form.Root
      className="mt-30 flex w-full flex-col gap-y-8"
      onSubmit={async (event) => {
        event.preventDefault();
        const { boardTitle, boardCategory } = Object.fromEntries(
          new FormData(event.currentTarget)
        );

        const { data } = await createBoard({
          title: boardTitle as string,
          content: textRef?.current?.getInstance().getHTML() ?? "",
          category: boardCategory as Category,
        });

        if (data.code === "S000") {
          router.push("/board");
          return;
        }
      }}
    >
      <div className="flex gap-20">
        <Form.Field className="mb-10 flex items-center" name="boardCategory">
          <Form.Control asChild>
            <Select.Root defaultValue={SelectItemList[0]}>
              <Select.Trigger className="inline-flex h-50 w-120 items-center justify-center rounded-8 border-1 border-white-100 bg-white outline-none">
                <div className="flex w-full items-center justify-between px-16 text-13 text-gray-500">
                  <Select.Value placeholder="카테고리" />
                  <Select.Icon>
                    <img
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
                  className="z-50 h-full w-120 overflow-auto rounded-8 bg-white "
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
                        <Select.ItemText>
                          {CategoryToNameMap[item]}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </Form.Control>
        </Form.Field>

        <Form.Field
          className="mb-10 flex w-full items-center"
          name="boardTitle"
        >
          <Form.Control asChild>
            <input
              className="flex h-50 w-full items-center rounded-8 border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500 focus:outline-none"
              type="text"
              required
              placeholder="게시글 제목을 입력해주세요."
            />
          </Form.Control>
        </Form.Field>
      </div>
      <Form.Field className="mb-10 flex w-full items-start" name="boardContent">
        <ToastEditor
          textRef={textRef}
          placeholder="게시글 내용을 입력해주세요."
        />
      </Form.Field>
      <div className="ml-auto flex gap-8">
        <button className="flex h-44 w-60 items-center justify-center rounded-8 border-1 bg-purple-100">
          <span className="text-14 font-semibold leading-14 text-white">
            취소
          </span>
        </button>
        <Form.Submit asChild>
          <button className="flex h-44 w-60 items-center justify-center rounded-8 border-1 bg-purple-100">
            <span className="text-14 font-semibold leading-14 text-white">
              등록
            </span>
          </button>
        </Form.Submit>
      </div>
    </Form.Root>
  );
}

const SelectItemList: Category[] = ["FREE", "TIP", "WALK_THROUGH"];
export const CategoryToNameMap: Record<Category, string> = {
  FREE: "자유",
  TIP: "팁",
  WALK_THROUGH: "공략",
};
