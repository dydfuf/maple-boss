import * as Dialog from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import usePartyDetail from "hooks/party/usePartyDetail";
import useSettlementConfirm from "hooks/settlement/useSettlementConfirm";
import useSettlementDelete from "hooks/settlement/useSettlementDelete";
import useSettlementDetailInfo from "hooks/settlement/useSettlementDetailInfo";
import SettlementConfirmDialog from "./SettlementConfirmDialog";
import SettlementDeleteDialog from "./SettlementDeleteDialog";

export default function SettlementDetailController() {
  const router = useRouter();
  const { partyId, settlementId } = router.query;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>();

  const { partyDetail } = usePartyDetail({ partyId: Number(partyId) });
  const { partySettlement } = useSettlementDetailInfo({
    settlementId: Number(settlementId),
  });

  const { settlementDelete } = useSettlementDelete({
    partySettlementId: Number(settlementId),
  });
  const { settlementConfirm } = useSettlementConfirm({
    partySettlementId: Number(settlementId),
  });

  const { name, isLeader } = partyDetail || { name: "", isLeader: false };
  const { mainData } = partySettlement || {};
  const { status } = mainData || {};

  const handleSettlementDeleteClick = () => {
    setDialogType("SETTLEMENT_DELETE");
    setDialogOpen(true);
  };

  const handleSettlementConfirmClick = () => {
    setDialogType("SETTLEMENT_CONFIRM");
    setDialogOpen(true);
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      {status !== "CONFIRMED" && isLeader && (
        <div className="flex items-center gap-x-20 text-14 font-semibold text-white">
          <button
            className="flex h-26 w-60 shrink-0 items-center justify-center rounded-4 bg-purple-100 px-16 py-6"
            onClick={handleSettlementConfirmClick}
          >
            확정
          </button>
          <button
            className="-mr-10 flex h-26 shrink-0 items-center justify-center rounded-4 py-6"
            onClick={handleSettlementDeleteClick}
          >
            삭제
          </button>
        </div>
      )}
      {dialogType === "SETTLEMENT_DELETE" && (
        <SettlementDeleteDialog partyName={name} onSubmit={settlementDelete} />
      )}
      {dialogType === "SETTLEMENT_CONFIRM" && (
        <SettlementConfirmDialog onSubmit={settlementConfirm} />
      )}
    </Dialog.Root>
  );
}

type DialogType = "SETTLEMENT_CONFIRM" | "SETTLEMENT_DELETE";
