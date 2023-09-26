import { useClickAway } from "@uidotdev/usehooks";
import Image from "next/image";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import CommonDialogButtonGroup from "components/common/Dialog/CommonDialogButtonGroup";
import CommonDialogContent from "components/common/Dialog/CommonDialogContent";
import CommonDialogTitle from "components/common/Dialog/CommonDialogTitle";
import useSearchBossItem from "hooks/boss/useSearchBossItem";
import { Item } from "hooks/settlement/useSettlementDetailInfo";

import { cn } from "utils/common";
import Search from "@/public/images/Search.png";

interface Props {
  choosedBossItemList: Item[];
  setChoosedBossItemList: Dispatch<SetStateAction<Item[]>>;
  selectedBossId: number;
  onClickConfirm: () => void;
}

export const AddItemDialog = ({
  choosedBossItemList,
  setChoosedBossItemList,
  selectedBossId,
  onClickConfirm,
}: Props) => {
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const [searchBossItemValue, setSearchBossItemValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [bossItemId, setBossItemId] = useState(0);
  const [amount, setAmount] = useState(1);
  const [meso, setMeso] = useState(0);

  const { searchedBossItemList } = useSearchBossItem({
    searchValue: searchBossItemValue,
    bossId: selectedBossId,
  });

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsSearchListOpen(false);
  });

  const totalMeso = useMemo(
    () =>
      choosedBossItemList.reduce((acc, cur) => acc + cur.meso * cur.amount, 0),
    [choosedBossItemList]
  );

  const initializeValue = () => {
    setSearchBossItemValue("");
    setBossItemId(0);
    setAmount(1);
    setMeso(0);
  };

  const isValidItem = () => {
    if (searchBossItemValue === "") return false;
    if (bossItemId === 0) return false;
    if (amount < 0) return false;
    if (meso < 0) return false;
    return true;
  };

  const handleAddItemClick = () => {
    const editArray = choosedBossItemList && [
      ...choosedBossItemList,
      { id: bossItemId, name: searchBossItemValue, amount, meso },
    ];
    setChoosedBossItemList(editArray);
  };

  const handleConfirmClick = () => {
    if (!isValidItem()) {
      setIsValid(false);
      return;
    }
    handleAddItemClick();
    initializeValue();
    onClickConfirm();
  };

  return (
    <>
      <CommonDialogContent>
        <CommonDialogTitle title="아이템 추가"></CommonDialogTitle>
        <div className="mt-24 flex gap-x-10 text-13 font-normal text-gray-900">
          <span className="w-200 px-8">이름</span>
          <span className="w-50 px-8">수량</span>
          <span className="w-150 px-8">메소</span>
        </div>

        <div className="mt-2 flex gap-x-10">
          <div
            ref={ref}
            className={cn(
              "relative inline-flex h-50 w-200 items-center justify-center border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500 focus:outline-none",
              {
                "rounded-8": !isSearchListOpen,
                "rounded-t-8": isSearchListOpen,
              }
            )}
          >
            <input
              className="h-full w-full"
              placeholder="아이템 검색"
              value={searchBossItemValue}
              onFocus={() => setIsSearchListOpen(true)}
              onChange={(e) => {
                setSearchBossItemValue(e.currentTarget.value);
              }}
            />
            <Image
              src={Search.src}
              width={16}
              height={16}
              alt="arrow-down"
              className="h-16 w-16 cursor-pointer"
            />
            {isSearchListOpen && (
              <div className="absolute -left-1 top-48 z-[1000] w-[calc(100%+2px)] rounded-b-8 border-1 border-white-100 bg-white focus:outline-none">
                {searchedBossItemList.map((searchedBossItem) => (
                  <div
                    key={`searched-boss-item-${searchedBossItem.id}`}
                    className="flex h-50 w-full cursor-pointer items-center px-16"
                    onClick={() => {
                      setSearchBossItemValue(searchedBossItem.name);
                      setBossItemId(searchedBossItem.id);
                      setIsSearchListOpen(false);
                    }}
                  >
                    {searchedBossItem.name}
                  </div>
                ))}
                {searchedBossItemList.length === 0 && (
                  <div className="flex h-50 w-full items-center px-16">
                    {"검색 결과가 없습니다."}
                  </div>
                )}
              </div>
            )}
          </div>
          <input
            value={amount}
            onChange={(e) => {
              const value = e.currentTarget.value;
              if (!isNaN(Number(value))) {
                setAmount(Number(value));
              }
            }}
            className="flex h-50 w-50 items-center justify-center rounded-8 border-1 border-gray-300 px-16 text-center text-14 font-normal text-gray-500"
          />
          <input
            value={meso.toLocaleString()}
            onChange={(e) => {
              const value = e.currentTarget.value.replaceAll(",", "");
              if (!isNaN(Number(value))) {
                setMeso(Number(value));
              }
            }}
            className="flex h-50 w-150 items-center justify-center rounded-8 border-1 border-gray-300 px-16 text-center text-14 font-normal text-gray-500"
          />
        </div>
        {!isValid && (
          <p className="mt-4 pl-4 text-12 font-normal text-red-100">
            아이템이 선택되지 않았거나, 수량이 1개 또는 메소가 0원 미만 입니다.
          </p>
        )}
        <p className="mt-40 flex w-full items-center justify-center font-bold text-gray-900">
          {`총 메소 : ${(totalMeso + amount * meso).toLocaleString()}`}
        </p>

        <CommonDialogButtonGroup
          confirmLabel="확인"
          onClickConfirm={handleConfirmClick}
        />
      </CommonDialogContent>
    </>
  );
};
