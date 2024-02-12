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
import { PartyInvite } from "hooks/party/useInvitedPartyMember";
import Close from "@/public/images/Close.png";

interface Props {
  onSubmit: (email: string) => Promise<void>;
  partyInvites: PartyInvite[];
  cancelInviteParty: (memberId: number) => Promise<void>;
}

const schema = z.object({
  email: z
    .string()
    .email({ message: "유효한 이메일을 입력해주세요" })
    .max(30, { message: "이메일은 30자 이내로 입력해주세요" }),
});

export default function InviteMemberDialog({
  onSubmit,
  partyInvites,
  cancelInviteParty,
}: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    await onSubmit(values.email);
    form.reset();
  };

  const handleCancelInvite = async (memberId: number) => {
    await cancelInviteParty(memberId);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 data-[state=open]:bg-black/[0.3]" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] min-h-500 w-360 -translate-x-1/2 -translate-y-1/2 rounded-20 bg-white p-30 shadow-default focus:outline-none">
        <Dialog.Title>
          <Text size={5} className="font-bold">
            파티원 초대
          </Text>
        </Dialog.Title>
        <Dialog.Close>
          <img
            src={Close.src}
            alt="close"
            className="absolute right-24 top-24 h-36 w-36"
          />
        </Dialog.Close>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      roundSize="full"
                      placeholder="이메일을 입력해주세요"
                      className="text-gray4"
                      wrapperClassName="!py-10 !pr-10"
                      {...field}
                      innerButton={
                        <Button
                          type="submit"
                          textSize={1}
                          roundSize="full"
                          label="보내기"
                          className="flex h-30 w-auto shrink-0 px-10 py-4"
                        />
                      }
                    />
                  </FormControl>
                  <FormMessage className="ml-20" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="mt-30">
          <Text size={5} className="font-bold">
            초대한 파티원
          </Text>
          {partyInvites.map((member) => {
            return (
              <div
                key={`invited-${member.id}`}
                className="flex items-center border-b-1 pb-20 pl-10 pt-10"
              >
                <div className="flex flex-col">
                  <Text size={1} className="text-gray4">
                    {member.email}
                  </Text>
                </div>
                <Button
                  roundSize="full"
                  className="ml-auto flex h-30 w-50 items-center justify-center border-1 border-gray6 bg-transparent text-gray6"
                  label="취소"
                  onClick={() => handleCancelInvite(member.id)}
                />
              </div>
            );
          })}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
