import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import useKickOutMember from "hooks/party/useKickOutMember";
import usePartyDetail from "hooks/party/usePartyDetail";
import usePartyMemberList from "hooks/party/usePartyMemberList";
import KickOutMemberDialog from "./KickOutMemberDialog";

export default function PartyMember() {
  const router = useRouter();
  const { partyId } = router.query;

  const { members, refetch } = usePartyMemberList({ partyId: Number(partyId) });
  const { partyDetail } = usePartyDetail({ partyId: Number(partyId) });
  const { kickOutMember } = useKickOutMember({ partyId: Number(partyId) });

  const [dialogOpen, setDialogOpen] = useState(false);

  const [kickOutMemberEmail, setKickOutMemberEmail] = useState<string>("");
  const [kickOutMemberId, setKickOutMemberId] = useState<number>(0);

  const { isLeader } = partyDetail || {
    isLeader: false,
  };

  const handleKickOutClick = (memberEmail: string, memberId: number) => {
    setDialogOpen(true);
    setKickOutMemberEmail(memberEmail);
    setKickOutMemberId(memberId);
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="flex w-full gap-x-64 rounded-16 border-1 border-white-100 p-30 pb-10">
        <div className="shrink-0 text-22 font-bold text-purple-100">파티원</div>
        <div className="grid w-full grid-cols-1 gap-x-30 gap-y-10 md:max-lg:grid-cols-2 xl:grid-cols-2">
          {members.map((member) => {
            return (
              <div
                key={`party-member-${member.id}`}
                className="flex items-center border-b-1 border-white-100 pb-16"
              >
                <div className="flex h-full w-full flex-col gap-y-6">
                  <p className="text-16 font-semibold text-gray-900">
                    {member.nickName}
                  </p>
                  <p className="text-12 text-gray-600">{member.email}</p>
                </div>
                {isLeader && !member.isLeader && (
                  <button
                    className="flex h-20 w-60 items-center justify-center rounded-full bg-white-100"
                    onClick={() => {
                      handleKickOutClick(member.email, member.id);
                    }}
                  >
                    <span className="text-12 font-semibold text-gray-500">
                      강퇴
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <KickOutMemberDialog
          onSubmit={async () => {
            await kickOutMember({ memberId: kickOutMemberId });
            setDialogOpen(false);
            refetch();
          }}
          kickOutMemberEmail={kickOutMemberEmail}
        />
      </div>
    </Dialog.Root>
  );
}
