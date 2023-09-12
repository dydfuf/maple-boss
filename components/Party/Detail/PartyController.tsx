import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import useChangeLeader from "hooks/party/useChangeLeader";
import useLeaveParty from "hooks/party/useLeaveParty";
import usePartyDetail from "hooks/party/usePartyDetail";
import useUpdatePartyDetail from "hooks/party/useUpdatePartyDetail";
import ChangeLeaderDialog from "./ChangeLeaderDialog";
import LeavePartyDialog from "./LeavePartyDialog";
import UpdatePartyDialog from "./UpdatePartyDialog";

export default function PartyController() {
  const router = useRouter();
  const { partyId } = router.query;

  const { partyDetail, refetch } = usePartyDetail({ partyId: Number(partyId) });
  const { isLeader, name, description } = partyDetail || {
    name: "",
    description: "",
  };

  const { changeLeader } = useChangeLeader({ partyId: Number(partyId) });
  const { updateParty } = useUpdatePartyDetail({ partyId: Number(partyId) });
  const { leaveParty } = useLeaveParty({ partyId: Number(partyId) });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>(undefined);

  const handleUpdatePartyDetailClick = () => {
    setDialogType("UPDATE_PARTY_DETAIL");
    setDialogOpen(true);
  };
  const handleChangeLeaderClick = () => {
    setDialogType("CHANGE_LEADER");
    setDialogOpen(true);
  };
  const handleLeavePartyClick = () => {
    setDialogType("LEAVE_PARTY");
    setDialogOpen(true);
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="absolute">
        {dialogType === "UPDATE_PARTY_DETAIL" && (
          <UpdatePartyDialog
            onSubmit={async (name: string, description: string) => {
              const { data } = await updateParty({ name, description });
              if (data.code === "S000") {
                setDialogOpen(false);
                refetch();
                return;
              }
              alert(data.message);
            }}
            initialPartyName={name}
            initialPartyDescription={description}
          />
        )}
        {dialogType === "CHANGE_LEADER" && (
          <ChangeLeaderDialog
            onSubmit={async (memberId: number) => {
              await changeLeader({ memberId });
            }}
          />
        )}
        {dialogType === "LEAVE_PARTY" && (
          <LeavePartyDialog
            onSubmit={async () => {
              await leaveParty();
            }}
            partyName={name}
            isLeader={isLeader}
          />
        )}
      </div>
      <div className="flex items-center gap-x-20 text-14 font-semibold text-white">
        {isLeader && (
          <>
            <button className="shrink-0" onClick={handleUpdatePartyDetailClick}>
              수정
            </button>
            <button className="shrink-0" onClick={handleChangeLeaderClick}>
              리더변경
            </button>
          </>
        )}
        <button
          className="flex h-26 w-60 shrink-0 items-center justify-center rounded-4 bg-purple-100 px-16 py-6"
          onClick={handleLeavePartyClick}
        >
          탈퇴
        </button>
      </div>
    </Dialog.Root>
  );
}

type DialogType =
  | "UPDATE_PARTY_DETAIL"
  | "CHANGE_LEADER"
  | "LEAVE_PARTY"
  | undefined;
