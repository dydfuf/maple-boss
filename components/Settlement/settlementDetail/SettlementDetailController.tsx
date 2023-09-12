import * as Dialog from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import usePartyDetail from "hooks/party/usePartyDetail";
import useSettlementDelete from "hooks/settlement/useSettlementDelete";
import SettlementDeleteDialog from "./SettlementDeleteDialog";

export default function SettlementDetailController() {
  const router = useRouter();
  const { partyId, settlementId } = router.query;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>();

  const { partyDetail } = usePartyDetail({ partyId: Number(partyId) });
  const { settlementDelete } = useSettlementDelete({
    partySettlementId: Number(settlementId),
  });
  const { name } = partyDetail || { name: "" };

  const handleSettlementDeleteClick = () => {
    setDialogType("SETTLEMENT_DELETE");
    setDialogOpen(true);
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="flex items-center gap-x-20 text-14 font-semibold text-white">
        <button className="flex h-26 w-60 shrink-0 items-center justify-center rounded-4 bg-purple-100 px-16 py-6">
          확정
        </button>
        <button
          className="-mr-10 flex h-26 shrink-0 items-center justify-center rounded-4 py-6"
          onClick={handleSettlementDeleteClick}
        >
          삭제
        </button>
      </div>
      {dialogType === "SETTLEMENT_DELETE" && (
        <Dialog.Portal>
          <SettlementDeleteDialog
            partyName={name}
            onSubmit={settlementDelete}
          />
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
}

type DialogType = "SETTLEMENT_CONFIRM" | "SETTLEMENT_DELETE";
