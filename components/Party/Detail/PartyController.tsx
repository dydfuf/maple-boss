import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "components/common/Button";
import useCancelInviteParty from "hooks/party/useCancelInviteParty";
import useChangeLeader from "hooks/party/useChangeLeader";
import useInvitedPartyMember from "hooks/party/useInvitedPartyMember";
import useInvitePartyMember from "hooks/party/useInvitePartyMember";
import usePartyDetail from "hooks/party/usePartyDetail";
import ChangeLeaderDialog from "./ChangeLeaderDialog";
import InviteMemberDialog from "./InviteMemberDialog";

export default function PartyController() {
  const router = useRouter();
  const { partyId } = router.query;

  const { partyDetail } = usePartyDetail({
    partyId: Number(partyId),
  });
  const { isLeader } = partyDetail || {};

  const { changeLeader, isLoading: isChangeLeaderLoading } = useChangeLeader({
    partyId: Number(partyId),
  });

  const [changeLeaderDialogOpen, setChangeLeaderDialogOpen] = useState(false);
  const [inviteMemberDialogOpen, setInviteMemberDialogOpen] = useState(false);

  const { partyInvites } = useInvitedPartyMember({
    partyId: Number(partyId),
  });
  const { inviteMember } = useInvitePartyMember({ partyId: Number(partyId) });
  const { cancelInviteParty } = useCancelInviteParty();

  return (
    <>
      {isLeader && (
        <div className="ml-auto flex w-246 space-x-22">
          {/** TODO: 버튼을 수정한다. */}
          <Button
            roundSize="full"
            className="flex h-40 items-center justify-center"
            label="리더변경"
            onClick={() => setChangeLeaderDialogOpen(true)}
          />
          <Button
            roundSize="full"
            className="flex h-40 items-center justify-center"
            label="파티원 초대"
            onClick={() => setInviteMemberDialogOpen(true)}
          />
        </div>
      )}
      <Dialog.Root
        open={changeLeaderDialogOpen}
        onOpenChange={setChangeLeaderDialogOpen}
      >
        <ChangeLeaderDialog
          onSubmit={async (memberId: number) => {
            await changeLeader({ memberId });
            setChangeLeaderDialogOpen(false);
          }}
          isLoading={isChangeLeaderLoading}
        />
      </Dialog.Root>
      <Dialog.Root
        open={inviteMemberDialogOpen}
        onOpenChange={setInviteMemberDialogOpen}
      >
        <InviteMemberDialog
          onSubmit={async (email: string) => {
            await inviteMember({ email });
          }}
          partyInvites={partyInvites}
          cancelInviteParty={async (memberId: number) => {
            await cancelInviteParty({ partyInviteId: memberId });
          }}
        />
      </Dialog.Root>
    </>
  );
}
