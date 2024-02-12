import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import Button from "components/common/Button";
import Text from "components/common/Text";
import usePartyMemberList from "hooks/party/usePartyMemberList";
import Close from "@/public/images/Close.png";
interface Props {
  onSubmit: (memberId: number) => void;
  isLoading: boolean;
}

export default function ChangeLeaderDialog({ onSubmit, isLoading }: Props) {
  const router = useRouter();
  const { partyId } = router.query;

  const { members } = usePartyMemberList({ partyId: Number(partyId) });

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 data-[state=open]:bg-black/[0.3]" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] min-h-500 w-360 -translate-x-1/2 -translate-y-1/2 rounded-20 bg-white p-30 shadow-default focus:outline-none">
        <Dialog.Title>
          <Text size={5} className="font-bold">
            리더 변경
          </Text>
        </Dialog.Title>
        <Dialog.Close>
          <img
            src={Close.src}
            alt="close"
            className="absolute right-24 top-24 h-36 w-36"
          />
        </Dialog.Close>
        <div className="mt-20">
          {members.map((member) => (
            <div
              key={`change-leader-member-${member.id}`}
              className="flex items-center border-b-1 pb-20 pl-10 pt-10"
            >
              <div className="flex flex-col">
                <Text size={3} className="font-bold">
                  {member.nickName}
                </Text>
                <Text size={1} className="text-gray4">
                  {member.email}
                </Text>
              </div>
              <Button
                roundSize="full"
                className="ml-auto flex h-30 !w-50 items-center justify-center"
                label={isLoading ? "위임중" : "위임"}
                onClick={() => onSubmit(member.id)}
              />
            </div>
          ))}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
