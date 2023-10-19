import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { find } from "lodash-es";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import usePartyMemberList, { Member } from "hooks/party/usePartyMemberList";
import { cn } from "utils/common";
import ArrowDown from "@/public/images/ArrowDown.png";

interface Props {
  onSubmit: (memberId: number) => void;
}

export default function ChangeLeaderDialog({ onSubmit }: Props) {
  const router = useRouter();
  const { partyId } = router.query;

  const { members } = usePartyMemberList({ partyId: Number(partyId) });
  const leaderMemberNickname = members.filter((member) => member.isLeader).at(0)
    ?.nickName;

  const [value, setValue] = useState(leaderMemberNickname);

  const getLeaderId = (members: Member[]) => {
    const leader = members.filter((member) => member.isLeader === true);
    return leader[0].id;
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 data-[state=open]:bg-black/[0.3]" />
      <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-400 max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-8 bg-white p-30 shadow-lg focus:outline-none">
        <div className="flex w-full flex-col items-center justify-center">
          <Dialog.Title className="mr-auto text-center text-24 font-bold text-gray-900">
            리더 변경
          </Dialog.Title>

          <Select.Root
            defaultValue={leaderMemberNickname}
            value={value}
            onValueChange={setValue}
          >
            <Select.Trigger className="mt-12 inline-flex h-50 w-full items-center justify-center rounded-8 border-1 border-white-100 bg-white outline-none">
              <div className="flex w-full items-center justify-between px-16">
                <Select.Value />
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
                className="w-full rounded-8 bg-white"
                position="popper"
                sideOffset={2}
              >
                <Select.Viewport className="w-340 rounded-8 border-1">
                  {members.map((member) => (
                    <Select.Item
                      key={member.nickName}
                      className={cn(
                        "relative flex h-50 w-full cursor-pointer items-center px-16",
                        { hidden: member.nickName === value }
                      )}
                      value={member.nickName}
                    >
                      <Select.ItemText>{member.nickName}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <div className="mt-30 flex w-full gap-x-12">
            <Dialog.Close asChild>
              <button className="flex h-44 w-full items-center justify-center rounded-8 bg-gray-200 focus:outline-none">
                <span className="text-14 font-semibold text-gray-800">
                  취소
                </span>
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="flex h-44 w-full items-center justify-center rounded-8 bg-purple-100 focus:outline-none"
                onClick={() => {
                  const selectedMemberId = find(members, { nickName: value })
                    ?.id;
                  if (selectedMemberId === getLeaderId(members)) {
                    alert("변경할 파티장을 선택해주세요.");
                  } else if (selectedMemberId) {
                    onSubmit(selectedMemberId);
                    alert("파티장 변경에 성공했습니다.");
                  }
                }}
              >
                <span className="text-14 font-semibold text-white">확인</span>
              </button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
