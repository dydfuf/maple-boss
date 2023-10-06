import * as RadioGroup from "@radix-ui/react-radio-group";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import Badge from "components/common/Badge";
import useSettlementDetailInfo, {
  PartySettlement,
} from "hooks/settlement/useSettlementDetailInfo";
import Crown from "@/public/images/Crown.png";

interface Props {
  setEditSettlement: Dispatch<SetStateAction<PartySettlement | undefined>>;
  isDisabled: boolean;
}

export const DetailInfo = ({ setEditSettlement, isDisabled }: Props) => {
  const router = useRouter();
  const { settlementId } = router.query;
  const { partySettlement } = useSettlementDetailInfo({
    settlementId: Number(settlementId),
  });

  const { mainData } = partySettlement || {};
  const {
    partyName,
    bossName,
    bossClazz,
    isLeader,
    createdAt,
    status,
    percentage,
    type,
    confirmDate,
    previousSettlementId,
  } = mainData || {
    partyName: "",
    bossName: "",
    isLeader: false,
    createdAt: "",
    confirmDate: "",
    previousSettlementId: 0,
  };

  return (
    <div className="h-486 w-334 rounded-8 bg-gray-200 p-30">
      <div className="flex items-center justify-between">
        <span className="text-22 font-bold text-gray-900">파티 이름</span>
        <div className="flex h-16">
          <span className="mr-4 leading-16">{partyName}</span>
          {isLeader && (
            <Image src={Crown.src} width={16} height={16} alt="crown" />
          )}
        </div>
      </div>
      <ul className="mt-30 flex h-486 w-334 flex-col gap-10 [&_li]:flex [&_li]:h-44 [&_li]:w-274 [&_li]:items-center [&_li]:rounded-8 [&_li]:bg-white [&_li]:px-20">
        <li className="justify-center gap-6">
          <span className="text-18 font-bold">{bossName}</span>
          <Badge variant={bossClazz}>{bossClazz}</Badge>
        </li>
        <li className="justify-between">
          <span className="text-14 font-bold">생성일시</span>
          <span className="text-14">
            {createdAt !== "" &&
              format(new Date(createdAt), "yyyy.MM.dd HH:mm:ss")}
          </span>
        </li>
        <li className="justify-between">
          <span className="text-14 font-bold">상태</span>
          <Badge variant={status}>
            {STATUS_MAP[status as "CONFIRMED" | "IN_PROGRESS"]}
          </Badge>
        </li>
        <li className="justify-between">
          <span className="text-14 font-bold">타입</span>
          <Badge variant={type}>{type}</Badge>
        </li>
        <li className="justify-between">
          <span className="text-14 font-bold">확정일시</span>
          <span className="text-14">
            {Boolean(confirmDate)
              ? format(new Date(confirmDate), "yyyy.MM.dd HH:mm:ss")
              : ""}
          </span>
        </li>
        <li className="justify-between">
          <span className="text-14 font-bold">이전 정산</span>
          <span className="text-14">{previousSettlementId}</span>
        </li>
        <li className="justify-between">
          <span className="text-14 font-bold">수수료</span>
          <RadioGroup.Root
            className="flex gap-20"
            defaultValue={String(percentage)}
            disabled={isDisabled}
          >
            <div className="flex items-center">
              <RadioGroup.Item
                className="mt-2 h-20 w-20 rounded-full border-1 border-purple-100"
                value="3"
                id="r1"
                onClick={() =>
                  setEditSettlement(
                    (prev) =>
                      prev && {
                        ...prev,
                        mainData: {
                          ...prev.mainData,
                          percentage: 3,
                        },
                      }
                  )
                }
              >
                <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-10 after:w-10 after:rounded-5 after:bg-purple-100 after:content-['']" />
              </RadioGroup.Item>
              <label className="pl-10 text-15 leading-1" htmlFor="r1">
                3%
              </label>
            </div>
            <div className="flex items-center">
              <RadioGroup.Item
                className=" mt-2 h-20 w-20 rounded-full border-1 border-purple-100"
                value="5"
                id="r2"
                onClick={() =>
                  setEditSettlement(
                    (prev) =>
                      prev && {
                        ...prev,
                        mainData: {
                          ...prev.mainData,
                          percentage: 5,
                        },
                      }
                  )
                }
              >
                <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-10 after:w-10 after:rounded-5 after:bg-purple-100 after:content-['']" />
              </RadioGroup.Item>
              <label className="pl-10 text-15 leading-1" htmlFor="r2">
                5%
              </label>
            </div>
          </RadioGroup.Root>
        </li>
      </ul>
    </div>
  );
};

const STATUS_MAP = {
  CONFIRMED: "CONFIRMED",
  IN_PROGRESS: "IN-PROGRESS",
};
