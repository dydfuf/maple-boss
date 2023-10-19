import * as Dialog from "@radix-ui/react-alert-dialog";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSettlementDetailInfo, {
  Item,
  PartySettlement,
} from "hooks/settlement/useSettlementDetailInfo";
import { AddItemDialog } from "./AddItemDialog";

import XIcon from "@/public/images/XIcon.png";

interface Props {
  canEdit: boolean;
  items?: Item[];
  setEditSettlement: Dispatch<SetStateAction<PartySettlement | undefined>>;
}

export const Items = ({ canEdit, items, setEditSettlement }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { settlementId } = router.query;
  const { selectedBossId } = useSettlementDetailInfo({
    settlementId: Number(settlementId),
  });
  const [choosedBossItemList, setChoosedBossItemList] = useState<Array<Item>>(
    items || []
  );

  useEffect(() => {
    items && setChoosedBossItemList(items);
  }, [items]);

  useEffect(() => {
    setEditSettlement(
      (prev) =>
        prev && {
          ...prev,
          items: choosedBossItemList,
        }
    );
  }, [choosedBossItemList, setEditSettlement]);

  const handleChangeAmount = (id: number, value: number) => {
    const newItems =
      choosedBossItemList &&
      choosedBossItemList.map((item) =>
        item.id === id ? { ...item, amount: value } : item
      );
    newItems && setChoosedBossItemList(newItems);
  };

  const handleChangeMeso = (id: number, value: number) => {
    const newItems =
      choosedBossItemList &&
      choosedBossItemList.map((item) =>
        item.id === id ? { ...item, meso: value } : item
      );
    newItems && setChoosedBossItemList(newItems);
  };

  const handleRemoveItemClick = (itemId: number) => {
    const newItems =
      choosedBossItemList &&
      choosedBossItemList.filter((item) => item.id !== itemId);
    newItems && setChoosedBossItemList(newItems);
  };

  return (
    <>
      <div className="h-486 w-504 overflow-auto rounded-8 bg-gray-200 p-30">
        <div className="flex items-center justify-between">
          <span className="text-18 font-bold text-gray-800">아이템</span>
          <button
            className={`h-26 rounded-4 bg-gray-300 px-8 text-center text-14 font-semibold leading-26 text-gray-800 ${
              !canEdit && "hidden"
            }`}
            onClick={() => setOpen(true)}
          >
            아이템추가
          </button>
        </div>
        {choosedBossItemList.length !== 0 ? (
          <div className="mt-30 flex gap-10">
            <div className="flex w-225 flex-col">
              <span className="mb-8 ml-8 text-13">이름</span>
              <ul className="flex flex-col gap-10">
                {choosedBossItemList.map((item) => (
                  <li
                    key={item.name}
                    className="h-50 w-full overflow-hidden rounded-8 border-1 border-white-100 pl-16 leading-50"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-50 flex-col">
              <span className="mb-8 ml-8 text-13">수량</span>
              <ul className="flex flex-col gap-10">
                {choosedBossItemList.map((item) => (
                  <li key={`items-amount-${item.name}`}>
                    <input
                      className={`h-50 w-full rounded-8 border-1 border-white-100  text-center leading-50 focus:outline-none ${
                        canEdit && "bg-white"
                      }`}
                      value={item.amount.toLocaleString()}
                      disabled={!canEdit}
                      onChange={(e) => {
                        const value = Math.abs(
                          Number(e.currentTarget.value.replaceAll(",", ""))
                        );
                        if (!isNaN(Number(value)) && Number(value) < 9999) {
                          handleChangeAmount(item.id, Number(value));
                        }
                      }}
                    ></input>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-130 flex-col">
              <span className="mb-8 ml-8 text-13">메소</span>
              <ul className="flex flex-col gap-10">
                {choosedBossItemList.map((item) => (
                  <li key={`items-meso-${item.name}`} className="relative">
                    <input
                      className={`h-50 w-full  rounded-8 border-1 border-white-100 pl-16 leading-50 focus:outline-none ${
                        canEdit && "bg-white"
                      }`}
                      value={item.meso.toLocaleString()}
                      disabled={!canEdit}
                      onChange={(e) => {
                        const value = Math.abs(
                          Number(e.currentTarget.value.replaceAll(",", ""))
                        );
                        if (!isNaN(Number(value))) {
                          handleChangeMeso(item.id, Number(value));
                        }
                      }}
                    ></input>
                    <button
                      className={!canEdit ? "hidden" : ""}
                      onClick={() => handleRemoveItemClick(item.id || 0)}
                    >
                      <Image
                        src={XIcon.src}
                        width={150}
                        height={65}
                        alt="X"
                        className="absolute -right-34 top-13 h-24 w-24"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="mt-30">아이템이 존재하지 않습니다.</div>
        )}
      </div>
      {open && (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <AddItemDialog
            choosedBossItemList={items || []}
            setChoosedBossItemList={setChoosedBossItemList}
            selectedBossId={selectedBossId || 0}
            onClickConfirm={() => setOpen(false)}
          />
        </Dialog.Root>
      )}
    </>
  );
};
