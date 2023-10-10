import * as Select from "@radix-ui/react-select";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Dividends,
  PartySettlement,
} from "hooks/settlement/useSettlementDetailInfo";
import { cn } from "utils/common";
import ArrowDown from "@/public/images/ArrowDown.png";

interface Props {
  isDisabled: boolean;
  dividends?: Dividends[];
  setEditSettlement: Dispatch<SetStateAction<PartySettlement | undefined>>;
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}

export const SettlementRate = ({
  isDisabled,
  dividends,
  setEditSettlement,
  isValid,
  setIsValid,
}: Props) => {
  const [editDividends, setEditDividends] = useState<Array<Dividends>>(
    dividends || []
  );

  const arrayOf1To100 = useMemo(
    () => Array.from(Array(101)).map((_, i) => String(i)),
    []
  );

  const totalDividens = useMemo(
    () => editDividends.reduce((acc, cur) => acc + cur.rate, 0),
    [editDividends]
  );

  const handleChangeRate = (id: number, value: string) => {
    const newDividends =
      editDividends &&
      editDividends.map((member) =>
        member.userId === id ? { ...member, rate: Number(value) } : member
      );
    newDividends && setEditDividends(newDividends);
    setIsValid(totalDividens === 100);
  };

  useEffect(() => {
    dividends && setEditDividends(dividends);
  }, [dividends]);

  useEffect(() => {
    setEditSettlement(
      (prev) =>
        prev && {
          ...prev,
          dividends: editDividends,
        }
    );
  }, [editDividends, setEditSettlement]);

  useEffect(() => {
    setIsValid(totalDividens === 100);
  }, [totalDividens, setIsValid]);

  return (
    <div className="h-486 w-504 overflow-auto rounded-8 bg-gray-200 p-30">
      <div className="flex items-center justify-between">
        <span className="text-18 font-bold text-gray-800">분배율</span>
        <span className="text-16 font-bold text-purple-100">
          총 분배율{" "}
          <span className={isValid ? "" : "text-red-200"}>
            {totalDividens}%
          </span>
        </span>
      </div>
      <div className="mt-24 flex gap-x-10 text-13 font-normal text-gray-900">
        <p className="flex h-24 w-200 items-center px-8">이름</p>
        <p className="flex h-24 w-200 items-center px-8">분배율</p>
      </div>
      {editDividends.map((member) => (
        <div
          key={`memeber-${member.userId}`}
          className="my-10 flex gap-x-10 text-14 font-normal text-gray-900"
        >
          <div className="flex h-50 w-200 items-center rounded-8 border-1 border-white-100 px-16">
            {member.userName}
          </div>
          <Select.Root
            defaultValue={String(member.rate)}
            onValueChange={(value) => {
              handleChangeRate(member.userId, value);
            }}
            disabled={isDisabled}
          >
            <Select.Trigger
              className={`inline-flex h-50 w-200 items-center justify-center rounded-8 border-1 border-white-100 outline-none ${
                !isDisabled && "bg-white"
              }`}
            >
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
    </div>
  );
};
