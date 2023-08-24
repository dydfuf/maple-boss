import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import useCancelInviteParty from "hooks/party/useCancelInviteParty";
import useInvitedPartyMember from "hooks/party/useInvitedPartyMember";
import useInvitePartyMember from "hooks/party/useInvitePartyMember";
import CancelInvitePartyDialog from "./CancelInvitePartyDialog";
import InviteMemberDialog from "./InviteMemberDialog";

export default function InvitedPartyMember() {
  const router = useRouter();
  const { partyId } = router.query;

  const { partyInvites, refetch } = useInvitedPartyMember({
    partyId: Number(partyId),
  });
  const { inviteMember } = useInvitePartyMember({ partyId: Number(partyId) });
  const { cancelInviteParty } = useCancelInviteParty();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>(undefined);

  const [cancelInvitePartyId, setCancelInvitePartyId] = useState<number>(0);

  const handleInviteClick = () => {
    setDialogOpen(true);
    setDialogType("INVITE_MEMBER");
  };

  const handleCancelInviteClick = (partyInviteId: number) => {
    setDialogOpen(true);
    setDialogType("CANCEL_INVITE");
    setCancelInvitePartyId(partyInviteId);
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="flex w-full gap-x-64 rounded-16 border-1 border-white-100 p-30">
        <div className="shrink-0 text-22 font-bold text-purple-100">
          초대한
          <br />
          파티원
        </div>
        <div className="flex w-full flex-col gap-y-14">
          <button
            className="ml-auto flex items-center justify-center rounded-4 bg-purple-100 px-16 py-8"
            onClick={handleInviteClick}
          >
            <span className="text-14 font-semibold text-white">초대</span>
          </button>
          <div className="grid w-full grid-cols-1 gap-x-30 gap-y-10 md:max-lg:grid-cols-2 xl:grid-cols-2">
            {partyInvites.map((member) => {
              return (
                <div
                  key={`invited-${member.id}`}
                  className="flex items-center border-b-1 border-white-100 pb-16"
                >
                  <div className="flex h-full w-full flex-col gap-y-6 text-gray-300">
                    <p className="text-16 font-semibold">{member.email}</p>
                  </div>
                  {member.status === "INVITED" && (
                    <button
                      className="flex h-20 w-60 items-center justify-center rounded-full border-1 border-purple-100 bg-white"
                      onClick={() => {
                        handleCancelInviteClick(member.id);
                      }}
                    >
                      <span className="text-12 font-semibold text-purple-100">
                        취소
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {dialogType === "INVITE_MEMBER" && (
          <InviteMemberDialog
            onSubmit={async (email: string) => {
              await inviteMember({ email });
              setDialogOpen(false);
              refetch();
            }}
          />
        )}
        {dialogType === "CANCEL_INVITE" && (
          <CancelInvitePartyDialog
            onConfirm={async () => {
              await cancelInviteParty({ partyInviteId: cancelInvitePartyId });
              refetch();
            }}
          />
        )}
      </div>
    </Dialog.Root>
  );
}

type DialogType = "INVITE_MEMBER" | "CANCEL_INVITE" | undefined;
