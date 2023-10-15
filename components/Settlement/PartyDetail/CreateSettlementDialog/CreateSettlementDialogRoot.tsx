import * as Dialog from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { SearchedBossItem } from "hooks/boss/useBossItemList";
import useStep from "hooks/common/useStep";
import usePartySettlementCreate from "hooks/settlement/usePartySettlementCreate";
import { SettlementType } from "types/common";
import { CreateSettlementContents as Contents } from "./CreateSettlementContents";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateSettlementDialogRoot({ open, setOpen }: Props) {
  const router = useRouter();
  const { partyId } = router.query;

  const { createPartySettlement } = usePartySettlementCreate({
    partyId: Number(partyId),
  });

  const { currentStepValue, next } = useStep({
    steps: [
      "ChooseBossAndSettlementType",
      "ChooseItems",
      "ChooseDividends",
      "ChoosePercentage",
    ],
  });

  // ChooseBossAndSettlementType
  const [selectedSettlementType, setSelectedSettlementType] =
    useState<SettlementType>();
  const [selectedBossId, setSelectedBossId] = useState(0);

  // ChooseItems
  const [choosedBossItemList, setChoosedBossItemList] = useState<
    Array<ChoosedBossItem>
  >([]);

  // ChooseDividends
  const [choosedDividends, setChoosedDividens] = useState<Array<Dividens>>([]);

  // ChoosePercentage
  const [choosedPercentage, setChoosedPercentage] = useState<Percentage>();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {currentStepValue === "ChooseBossAndSettlementType" && (
        <Contents.ChooseBossAndSettlementType
          selectedSettlementType={selectedSettlementType}
          setSelectedSettlementType={setSelectedSettlementType}
          setSelectedBossId={setSelectedBossId}
          onClickNext={next}
        />
      )}
      {currentStepValue === "ChooseItems" && (
        <Contents.ChooseItems
          choosedBossItemList={choosedBossItemList}
          setChoosedBossItemList={setChoosedBossItemList}
          selectedBossId={selectedBossId}
          onClickNext={next}
        />
      )}
      {currentStepValue === "ChooseDividends" && (
        <Contents.ChooseDividends
          choosedDividends={choosedDividends}
          setChoosedDividens={setChoosedDividens}
          onClickNext={next}
        />
      )}
      {currentStepValue === "ChoosePercentage" && (
        <Contents.ChoosePercentage
          setChoosedPercentage={setChoosedPercentage}
          isValid={Boolean(choosedPercentage)}
          onSubmit={async () => {
            if (!selectedSettlementType) return;
            if (!choosedPercentage) return;

            const items = choosedBossItemList.map((choosedBossItem) => ({
              bossItemId: choosedBossItem.bossItem.id,
              amount: choosedBossItem.amount,
              meso: choosedBossItem.meso,
            }));

            const { data } = await createPartySettlement({
              bossId: selectedBossId,
              type: selectedSettlementType,
              items,
              dividends: choosedDividends,
              percentage: choosedPercentage,
            });

            if (data.code === "S000") {
              setOpen(false);
            }
          }}
        />
      )}
    </Dialog.Root>
  );
}

export interface ChoosedBossItem {
  bossItem: SearchedBossItem;
  amount: number;
  meso: number;
}

export interface Dividens {
  memberId: number;
  rate: number;
}

export type Percentage = 3 | 5;
