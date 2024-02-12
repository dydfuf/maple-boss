import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "components/common/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "components/common/Form";
import Input from "components/common/Input";
import Text from "components/common/Text";
import Textarea from "components/common/Textarea";

interface Props {
  nickName: string;
  handleCreateParty: (name: string, description: string) => Promise<void>;
  isLoading?: boolean;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "파티 이름을 입력해주세요" })
    .max(15, { message: "이메일은 30자 이내로 입력해주세요" }),
  description: z.string().min(1, { message: "파티 설명을 입력해주세요" }),
});

export default function CreatePartyDialog({
  nickName,
  handleCreateParty,
  isLoading,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, description } = values;
    await handleCreateParty(name, description);
    form.reset();
  };

  return (
    <>
      <Dialog.Overlay className="fixed inset-0 data-[state=open]:bg-black/[0.3]" />
      <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-360 -translate-x-1/2 -translate-y-1/2 rounded-20 bg-white p-30 shadow-default focus:outline-none">
        <Dialog.Title asChild>
          <Text size={5} className="font-bold">
            파티 생성
          </Text>
        </Dialog.Title>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-20 flex flex-col space-y-12"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="파티 이름을 입력해주세요"
                      className="text-gray4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="ml-20" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="파티 설명을 입력해주세요"
                      className="text-gray4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="ml-20" />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-between rounded-10 bg-gray9 px-20 py-11">
              <Text size={3} className="text-gray1">
                파티장
              </Text>
              <Text size={3} className="font-bold">
                {nickName}
              </Text>
            </div>
            <div className="!mt-30 flex w-full gap-x-10">
              <Dialog.Close asChild>
                {/** @TODO 디자인이 나오는대로 수정해야한다. */}
                <Button label="취소" />
              </Dialog.Close>
              <Button
                type="submit"
                label={`${isLoading ? "생성중..." : "생성"}`}
                disabled={isLoading}
              />
            </div>
          </form>
        </Form>
      </Dialog.Content>
    </>
  );
}
