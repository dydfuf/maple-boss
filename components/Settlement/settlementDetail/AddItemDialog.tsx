import { useClickAway } from "@uidotdev/usehooks";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import CommonDialogButtonGroup from "components/common/Dialog/CommonDialogButtonGroup";
import CommonDialogContent from "components/common/Dialog/CommonDialogContent";
import CommonDialogTitle from "components/common/Dialog/CommonDialogTitle";
import useBossItemList, { SearchedBossItem } from "hooks/boss/useBossItemList";
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
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("아이템을 선택해주세요");
  const [bossItemId, setBossItemId] = useState(0);
  const [amount, setAmount] = useState(1);
  const [meso, setMeso] = useState(0);

  const { bossItemList } = useBossItemList({ bossId: selectedBossId });
  const filteredItemList = bossItemList.filter((item: SearchedBossItem) =>
    item.name.includes(searchBossItemValue)
  );

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

  const isValidItem = useCallback(() => {
    for (const item of bossItemList) {
      if (item.name === searchBossItemValue) {
        return true;
      }
    }
    return false;
  }, [bossItemList, searchBossItemValue]);

  const isExistItem = useCallback(() => {
    for (const item of choosedBossItemList) {
      if (item.name === searchBossItemValue) {
        return true;
      }
    }
    return false;
  }, [choosedBossItemList, searchBossItemValue]);

  const handleAddItemClick = () => {
    const editArray = choosedBossItemList && [
      ...choosedBossItemList,
      { id: bossItemId, name: searchBossItemValue, amount, meso },
    ];
    setChoosedBossItemList(editArray);
  };

  const handleConfirmClick = () => {
    handleAddItemClick();
    initializeValue();
    onClickConfirm();
  };

  useEffect(() => {
    if (!isValidItem()) {
      setIsValid(false);
    } else if (isExistItem()) {
      setIsValid(false);
      setErrorMessage("이미 등록된 아이템입니다");
    } else if (amount === 0) {
      setIsValid(false);
      setErrorMessage("아이템 수량이 0개입니다");
    } else {
      setIsValid(true);
    }
  }, [searchBossItemValue, amount, isValidItem, isExistItem]);

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
            <img
              src={Search.src}
              width={16}
              height={16}
              alt="arrow-down"
              className="h-16 w-16 cursor-pointer"
            />
            {isSearchListOpen && (
              <div className="absolute -left-1 top-48 z-[1000] w-[calc(100%+2px)] rounded-b-8 border-1 border-white-100 bg-white focus:outline-none">
                {filteredItemList.map((searchedBossItem: SearchedBossItem) => (
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
                {filteredItemList.length === 0 && (
                  <div className="flex h-50 w-full items-center px-16">
                    {"검색 결과가 없습니다."}
                  </div>
                )}
              </div>
            )}
          </div>
          <input
            value={amount.toLocaleString()}
            onChange={(e) => {
              const value = Math.abs(
                Number(e.currentTarget.value.replaceAll(",", ""))
              );
              if (!isNaN(Number(value)) && Number(value) < 9999) {
                setAmount(Number(value));
              }
            }}
            className="flex h-50 w-50 items-center justify-center rounded-8 border-1 border-gray-300 text-center text-14 font-normal text-gray-500"
          />
          <input
            value={meso.toLocaleString()}
            onChange={(e) => {
              const value = Math.abs(
                Number(e.currentTarget.value.replaceAll(",", ""))
              );
              if (!isNaN(Number(value))) {
                setMeso(Number(value));
              }
            }}
            className="flex h-50 w-150 items-center justify-center rounded-8 border-1 border-gray-300 px-16 text-center text-14 font-normal text-gray-500"
          />
        </div>
        <p className="mt-40 flex w-full items-center justify-center font-bold text-gray-900">
          {`총 메소 : ${(totalMeso + amount * meso).toLocaleString()}`}
        </p>

        <CommonDialogButtonGroup
          confirmLabel={isValid ? "다음" : errorMessage}
          onClickConfirm={handleConfirmClick}
          confirmDisabled={!isValid}
        />
      </CommonDialogContent>
    </>
  );
};
