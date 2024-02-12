import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import useCreateParty from "hooks/party/useCreateParty";
import useParty from "hooks/party/useParty";
import useMyInfo from "hooks/user/useMyInfo";
import CreatePartyDialog from "./CreatePartyDialog";
import PartyCard from "./PartyCard";
import PartyCreateCard from "./PartyCreateCard";

export default function PartyListContent() {
  const { parties, refetch } = useParty();
  const { createParty, isLoading } = useCreateParty();
  const { info } = useMyInfo();
  const { nickname } = info || { nickname: "" };

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCreateParty = async (name: string, description: string) => {
    await createParty({ name, description });
    refetch();
    setDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-3 gap-20">
      <PartyCreateCard onCreateCardClick={() => setDialogOpen(true)} />
      {parties?.map((party, idx) => (
        <PartyCard key={`${party.name}-${idx}`} party={party} />
      ))}

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <CreatePartyDialog
          nickName={nickname}
          handleCreateParty={handleCreateParty}
          isLoading={isLoading}
        />
      </Dialog.Root>
    </div>
  );
}
