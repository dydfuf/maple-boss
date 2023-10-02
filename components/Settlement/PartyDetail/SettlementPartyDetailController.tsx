import { useRouter } from "next/router";
import { useState } from "react";
import usePartySettlementPayInfo from "hooks/settlement/usePartySettlementPayInfo";
import CreateSettlementDialogRoot from "./CreateSettlementDialog/CreateSettlementDialogRoot";

export default function SettlementPartyDetailController() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { partyId } = router.query;

  const { payInfo } = usePartySettlementPayInfo({ partyId: Number(partyId) });
  const { isLeader } = payInfo || { isLeader: false };

  const handleCreateClick = () => {
    setOpen(true);
  };

  return (
    <div className="flex items-center gap-x-20 text-14 font-semibold text-white">
      {isLeader && (
        <button
          className="flex h-26 w-60 shrink-0 items-center justify-center rounded-4 bg-purple-100 px-16 py-6"
          onClick={handleCreateClick}
        >
          생성
        </button>
      )}
      {open && <CreateSettlementDialogRoot open={open} setOpen={setOpen} />}
    </div>
  );
}
