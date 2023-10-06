import * as Select from "@radix-ui/react-select";
import { useClickAway } from "@uidotdev/usehooks";
import { isNaN } from "lodash-es";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import CommonDialogButtonGroup from "components/common/Dialog/CommonDialogButtonGroup";
import CommonDialogContent from "components/common/Dialog/CommonDialogContent";
import CommonDialogTitle from "components/common/Dialog/CommonDialogTitle";
import useSearchBoss from "hooks/boss/useSearchBoss";
import useSearchBossItem from "hooks/boss/useSearchBossItem";
import usePartyMemberList from "hooks/party/usePartyMemberList";
import { SettlementType } from "types/common";
import { cn } from "utils/common";
import {
  ChoosedBossItem,
  Dividens,
  Percentage,
} from "./CreateSettlementDialogRoot";
import ArrowDown from "@/public/images/ArrowDown.png";
import Search from "@/public/images/Search.png";

export const CreateSettlementContents = Object.assign(() => <></>, {
  ChooseBossAndSettlementType,
  ChooseItems,
  ChooseDividends,
  ChoosePercentage,
});

interface ChooseBossAndSettlementTypeProps {
  setSelectedSettlementType: (settlementType: SettlementType) => void;
  setSelectedBossId: (id: number) => void;
  onClickNext: () => void;
  isValid: boolean;
}

function ChooseBossAndSettlementType({
  setSelectedSettlementType,
  setSelectedBossId,
  onClickNext,
  isValid,
}: ChooseBossAndSettlementTypeProps) {
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const [searchBossNameValue, setSearchBossNameValue] = useState("");

  const { searchedBossList } = useSearchBoss({
    searchValue: searchBossNameValue,
  });

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsSearchListOpen(false);
  });

  return (
    <CommonDialogContent contentClassName="w-630">
      <CommonDialogTitle title="정산 생성" subTitle="기본정보 선택" />
      <div className="mt-24 flex gap-x-10">
        <div
          ref={ref}
          className={cn(
            "relative inline-flex h-50 w-full items-center justify-center border-1 border-white-100 bg-white px-16 text-14 font-normal text-gray-500 focus:outline-none",
            {
              "rounded-8": !isSearchListOpen,
              "rounded-t-8": isSearchListOpen,
            }
          )}
        >
          <input
            className="h-full w-full"
            placeholder="보스 검색어 입력"
            value={searchBossNameValue}
            onFocus={() => setIsSearchListOpen(true)}
            onChange={(e) => {
              setSearchBossNameValue(e.currentTarget.value);
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
            <div className="absolute -left-1 top-48 w-[calc(100%+2px)] rounded-b-8 border-1 border-white-100 bg-white focus:outline-none">
              {searchedBossList.map((searchedBoss) => (
                <div
                  key={`searched-boss-${searchedBoss.id}`}
                  className="flex h-50 w-full cursor-pointer items-center px-16"
                  onClick={() => {
                    setSearchBossNameValue(searchedBoss.name);
                    setIsSearchListOpen(false);
                    const selectedBossId =
                      searchedBossList.find((x) => x.name === searchedBoss.name)
                        ?.id || 0;
                    setSelectedBossId(selectedBossId);
                  }}
                >
                  {searchedBoss.name}
                </div>
              ))}
              {searchedBossList.length === 0 && (
                <div className="flex h-50 w-full items-center px-16">
                  {"검색 결과가 없습니다."}
                </div>
              )}
            </div>
          )}
        </div>
        <Select.Root
          onValueChange={(value) =>
            setSelectedSettlementType(value as SettlementType)
          }
        >
          <Select.Trigger className="inline-flex h-50 w-full items-center justify-center rounded-8 border-1 border-white-100 bg-white outline-none">
            <div className="flex w-full items-center justify-between px-16 text-14 font-normal text-gray-500">
              <Select.Value placeholder="정산 타입을 선택하세요" />
              <Select.Icon>
                <Image
                  src={ArrowDown.src}
                  width={16}
                  height={16}
                  alt="arrow-down"
                  className="h-16 w-16"
                />
              </Select.Icon>
            </div>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              className="w-full rounded-8 bg-white text-gray-500"
              position="popper"
              sideOffset={2}
            >
              <Select.Viewport className="w-280 rounded-8 border-1">
                {/* @TODO: 공통화 및 수정 필요 */}
                <Select.Item
                  className="relative flex h-50 w-full cursor-pointer items-center px-16"
                  value={"MANUAL"}
                >
                  <Select.ItemText>{"MANUAL"}</Select.ItemText>
                </Select.Item>
                <Select.Item
                  className="relative flex h-50 w-full cursor-pointer items-center px-16"
                  value={"AUTO"}
                >
                  <Select.ItemText>{"AUTO"}</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <CommonDialogButtonGroup
        confirmLabel={isValid ? "다음" : "기본정보를 선택해주세요"}
        confirmDisabled={!isValid}
        preventConfirm
        onClickConfirm={() => {
          if (!isValid) {
            return;
          }
          onClickNext();
        }}
      />
    </CommonDialogContent>
  );
}

interface ChooseItemsProps {
  choosedBossItemList: ChoosedBossItem[];
  setChoosedBossItemList: Dispatch<SetStateAction<ChoosedBossItem[]>>;
  selectedBossId: number;
  onClickNext: () => void;
  isValid: boolean;
}

function ChooseItems({
  choosedBossItemList,
  setChoosedBossItemList,
  selectedBossId,
  onClickNext,
  isValid,
}: ChooseItemsProps) {
  const [isSearchListOpen, setIsSearchListOpen] = useState(false);
  const [searchBossItemValue, setSearchBossItemValue] = useState("");
  const [bossItemId, setBossItemId] = useState(0);
  const [amount, setAmount] = useState(1);
  const [meso, setMeso] = useState(0);

  const [showErrorMessage, setShowMessage] = useState(false);

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
    if (!isValidItem()) {
      setShowMessage(true);
      return;
    }
    setShowMessage(false);
    setChoosedBossItemList((prev) => [
      ...prev,
      { bossItem: { id: bossItemId, name: searchBossItemValue }, amount, meso },
    ]);
    initializeValue();
  };

  return (
    <>
      <CommonDialogContent>
        <CommonDialogTitle title="정산 생성" subTitle="아이템 선택">
          <button
            className="ml-auto flex h-26 items-center justify-center rounded-4 bg-gray-200 px-16"
            onClick={handleAddItemClick}
          >
            <span className="text-14 font-semibold text-gray-800">
              아이템 추가
            </span>
          </button>
        </CommonDialogTitle>
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
        {showErrorMessage && (
          <p className="mt-4 pl-4 text-12 font-normal text-red-100">
            아이템이 선택되지 않았거나, 수량이 1개 또는 메소가 0원 미만 입니다.
          </p>
        )}
        <p className="mt-12 px-8 pb-4 text-13 font-normal text-gray-900">
          선택된 아이템
        </p>
        {choosedBossItemList.map((choosedBossItem, idx) => (
          <div className="mt-2 flex gap-x-10" key={`choosed-boss-item-${idx}`}>
            <input
              value={choosedBossItem.bossItem.name}
              disabled
              className="flex h-50 w-200 items-center justify-center rounded-8 border-1 border-gray-300 px-16 text-14 font-normal text-gray-500 focus:outline-none"
            />
            <input
              value={choosedBossItem.amount}
              disabled
              className="flex h-50 w-50 items-center justify-center rounded-8 border-1 border-gray-300 px-16 text-center text-14 font-normal text-gray-500 focus:outline-none"
            />
            <input
              value={choosedBossItem.meso.toLocaleString()}
              disabled
              className="flex h-50 w-150 items-center justify-center rounded-8 border-1 border-gray-300 px-16 text-center text-14 font-normal text-gray-500 focus:outline-none"
            />
          </div>
        ))}
        <p className="mt-40 flex w-full items-center justify-center font-bold text-gray-900">
          {`총 메소 : ${totalMeso.toLocaleString()}`}
        </p>
        <CommonDialogButtonGroup
          confirmLabel={isValid ? "다음" : "아이템을 추가해주세요"}
          confirmDisabled={!isValid}
          preventConfirm
          onClickConfirm={() => {
            if (!isValid) {
              return;
            }
            onClickNext();
          }}
        />
      </CommonDialogContent>
    </>
  );
}

interface ChooseDividendsProps {
  choosedDividends: Array<Dividens>;
  setChoosedDividens: Dispatch<SetStateAction<Dividens[]>>;
  onClickNext: () => void;
}

function ChooseDividends({
  choosedDividends,
  setChoosedDividens,
  onClickNext,
}: ChooseDividendsProps) {
  const router = useRouter();
  const { partyId } = router.query;
  const { members } = usePartyMemberList({ partyId: Number(partyId) });

  const arrayOf1To100 = useMemo(
    () => Array.from(Array(101)).map((_, i) => String(i)),
    []
  );

  const totalDividens = useMemo(
    () => choosedDividends.reduce((acc, cur) => acc + cur.rate, 0),
    [choosedDividends]
  );

  const isValid = totalDividens === 100;

  useEffect(() => {
    setChoosedDividens(
      members.map((member) => ({ memberId: member.id, rate: 0 }))
    );
  }, [members, setChoosedDividens]);

  return (
    <CommonDialogContent>
      <CommonDialogTitle title="정산 생성" subTitle="분배율 선택" />
      <div className="mt-24 flex gap-x-10 text-13 font-normal text-gray-900">
        <p className="flex h-24 w-200 items-center px-8">이름</p>
        <p className="flex h-24 w-200 items-center px-8">분배율</p>
      </div>
      {members.map((member) => (
        <div
          key={`memeber-${member.id}`}
          className="my-10 flex gap-x-10 text-14 font-normal text-gray-900"
        >
          <div className="flex h-50 w-200 items-center rounded-8 border-1 border-white-100 px-16">
            {member.nickName}
          </div>
          <Select.Root
            defaultValue="0"
            onValueChange={(value) => {
              setChoosedDividens((prev) => {
                const idx = prev.findIndex(
                  (dividen) => dividen.memberId === member.id
                );
                const result = [...prev];
                result[idx].rate = Number(value);
                return result;
              });
            }}
          >
            <Select.Trigger className="inline-flex h-50 w-200 items-center justify-center rounded-8 border-1 border-white-100 bg-white outline-none">
              <div className="flex w-full items-center justify-between px-16">
                <Select.Value />
                <Select.Icon>
                  <Image
                    src={ArrowDown.src}
                    width={16}
                    height={16}
                    alt="arrow-down"
                    className="h-16 w-16"
                  />
                </Select.Icon>
              </div>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="h-200 w-200 overflow-auto rounded-8 bg-white"
                position="popper"
                sideOffset={2}
              >
                <Select.Viewport className="h-200 w-200 overflow-auto rounded-8 border-1">
                  {arrayOf1To100.map((value) => (
                    <Select.Item
                      key={value}
                      className={cn(
                        "relative flex h-50 w-full cursor-pointer items-center px-16"
                      )}
                      value={value}
                    >
                      <Select.ItemText>{`${value} %`}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      ))}
      <div className="mt-40 flex w-full flex-col items-center gap-y-8 font-bold">
        <p className="text-gray-900">{`총 분배율 ${totalDividens}%`}</p>
        {totalDividens !== 100 && (
          <p className="text-red-200">{"100% 맞춰주세요"}</p>
        )}
      </div>
      <CommonDialogButtonGroup
        confirmLabel="다음"
        confirmDisabled={!isValid}
        preventConfirm
        onClickConfirm={() => {
          if (!isValid) {
            return;
          }

          onClickNext();
        }}
      />
    </CommonDialogContent>
  );
}

interface ChoosePercentageProps {
  setChoosedPercentage: (percentage: Percentage) => void;
  isValid: boolean;
  onSubmit: () => void;
}

function ChoosePercentage({
  isValid,
  onSubmit,
  setChoosedPercentage,
}: ChoosePercentageProps) {
  return (
    <CommonDialogContent>
      <CommonDialogTitle title="정산 생성" subTitle="수수료 선택" />
      <Select.Root
        onValueChange={(value) => {
          setChoosedPercentage(value as unknown as Percentage);
        }}
      >
        <Select.Trigger className="mt-20 inline-flex h-50 w-400 items-center justify-center rounded-8 border-1 border-white-100 bg-white outline-none">
          <div className="flex w-full items-center justify-between px-16 text-13 text-gray-500">
            <Select.Value placeholder="수수료를 선택 해주세요." />
            <Select.Icon>
              <Image
                src={ArrowDown.src}
                width={16}
                height={16}
                alt="arrow-down"
                className="h-16 w-16"
              />
            </Select.Icon>
          </div>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="h-full w-400 overflow-auto rounded-8 bg-white"
            position="popper"
            sideOffset={2}
          >
            <Select.Viewport className="h-full w-full overflow-auto rounded-8 border-1 text-13 text-gray-500">
              <Select.Item
                key={"3"}
                className={cn(
                  "relative flex h-50 w-full cursor-pointer items-center px-16"
                )}
                value={"3"}
              >
                <Select.ItemText>{`${3} %`}</Select.ItemText>
              </Select.Item>
              <Select.Item
                key={"5"}
                className={cn(
                  "relative flex h-50 w-full cursor-pointer items-center px-16"
                )}
                value={"5"}
              >
                <Select.ItemText>{`${5} %`}</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <CommonDialogButtonGroup
        confirmLabel="생성"
        confirmDisabled={!isValid}
        preventConfirm
        onClickConfirm={() => {
          if (!isValid) {
            return;
          }

          onSubmit();
        }}
      />
    </CommonDialogContent>
  );
}
