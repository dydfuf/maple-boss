import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "components/common/Button";
import usePartyDetail from "hooks/party/usePartyDetail";
import LeavePartyDialog from "./LeavePartyDialog";

export default function LeavePartyButton() {
  const router = useRouter();
  const { partyId } = router.query;

  const { partyDetail } = usePartyDetail({
    partyId: Number(partyId),
  });
  const { isLeader, name } = partyDetail || {
    name: "",
  };

  const [leavePartyDialogOpen, setLeavePartyDialogOpen] = useState(false);

  return (
    <>
      {isLeader && (
        <>
          <div className="mt-60">
            <Button
              roundSize="full"
              className="mx-auto flex h-50 w-300 items-center justify-center bg-gray7 text-gray4"
              label="탈퇴하기"
              onClick={() => setLeavePartyDialogOpen(true)}
            />
          </div>
          <Dialog.Root
            open={leavePartyDialogOpen}
            onOpenChange={setLeavePartyDialogOpen}
          >
            {/** @TODO: 탈퇴하기 디자인을 적용해야합니다. */}
            <LeavePartyDialog
              onSubmit={() => {
                console.log("leave party");
              }}
              partyName={name}
              isLeader={isLeader}
            />
          </Dialog.Root>
        </>
      )}
    </>
  );
}
