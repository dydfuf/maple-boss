import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import Text from "components/common/Text";
import usePartyDetail from "hooks/party/usePartyDetail";
import useUpdatePartyDetail from "hooks/party/useUpdatePartyDetail";
import UpdatePartyDialog from "./UpdatePartyDialog";
import Edit from "@/public/images/Edit.png";

export default function PartyDetailTopInfo() {
  const router = useRouter();
  const { partyId } = router.query;

  const { partyDetail } = usePartyDetail({
    partyId: Number(partyId),
  });
  const { updateParty, isLoading } = useUpdatePartyDetail({
    partyId: Number(partyId),
  });

  const { name, description, isLeader, leaderNickname } = partyDetail || {
    name: "",
    description: "",
    iosLeader: false,
    leaderNickname: "",
  };

  const [updatePartyDialogOpen, setUpdatePartyDialogOpen] = useState(false);

  return (
    <>
      <div className="z-10 mt-100 flex w-1080 flex-col space-y-10">
        <div className="flex items-center space-x-11">
          <Text size={5} className="font-bold text-white">
            {name}
          </Text>
          {isLeader && (
            <img
              src={Edit.src}
              alt="edit"
              className="h-24 w-24 cursor-pointer"
              onClick={() => setUpdatePartyDialogOpen(true)}
            />
          )}
        </div>
        <Text size={2} className="text-white">
          {description}
        </Text>
      </div>
      {updatePartyDialogOpen && (
        <Dialog.Root
          open={updatePartyDialogOpen}
          onOpenChange={setUpdatePartyDialogOpen}
        >
          <UpdatePartyDialog
            initialPartyName={name}
            initialPartyDescription={description}
            onSubmit={async (name, description) => {
              await updateParty({ name, description });
              setUpdatePartyDialogOpen(false);
            }}
            nickName={leaderNickname}
            isLoading={isLoading}
          />
        </Dialog.Root>
      )}
    </>
  );
}
