import Image from "next/image";
import { useRouter } from "next/router";
import usePartyDetail from "hooks/party/usePartyDetail";
import InvitedPartyMember from "./Detail/InvitedPartyMember";
import PartyMember from "./Detail/PartyMember";
import Meso from "@/public/images/Meso.png";
import Wallet from "@/public/images/Wallet.png";

export default function PartyDetailContent() {
  const router = useRouter();
  const { partyId } = router.query;

  const { partyDetail, isLoading } = usePartyDetail({
    partyId: Number(partyId),
  });

  const {
    name,
    description,
    leaderNickname,
    memberCount,
    accumulatedMeso,
    settlementCount,
  } = partyDetail || {
    isLeader: false,
    name: "",
    description: "",
    leaderNickname: "",
    memberCount: 0,
    accumulatedMeso: 0,
    settlementCount: 0,
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="mt-40">
      <div className="flex flex-col gap-20 lg:flex-row">
        <div className="flex w-full flex-col gap-y-16 lg:w-600">
          <p className="text-32 font-bold text-gray-900">{name}</p>
          <p className="text-gray-500">{description}</p>
        </div>
        <div className="ml-auto flex w-full gap-16 lg:w-752">
          <div className="flex h-118 w-full flex-col items-center justify-center gap-y-10 rounded-16 border-1 border-white-100 bg-gray-200">
            <p className="font-semibold text-gray-500">파티장</p>
            <p className="text-32 font-bold text-purple-100">
              {leaderNickname}
            </p>
          </div>
          <div className="flex h-118 w-full flex-col items-center justify-center gap-y-10 rounded-16 border-1 border-white-100 bg-gray-200">
            <p className="font-semibold text-gray-500">파티원</p>
            <p className="text-32 font-bold text-purple-100">{`${memberCount}/6`}</p>
          </div>
          <div className="flex h-118 w-full flex-col items-center justify-center gap-y-10 rounded-16 border-1 border-white-100 bg-gray-200">
            <p className="font-semibold text-gray-500">정산수</p>
            <p className="text-32 font-bold text-purple-100">
              {settlementCount}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-40 h-1 bg-white-100" />
      <div className="mt-40 flex flex-col gap-20 lg:flex-row">
        <div className="h-240 w-full rounded-16 border-1 border-white-100 bg-white px-30 pb-40 pt-21 lg:w-600">
          <div className="flex gap-x-30">
            <Image
              src={Wallet.src}
              width={100}
              height={98}
              alt="wallet"
              className="h-98 w-100"
            />
            <p className="text-22 font-bold text-purple-100">파티 지갑</p>
          </div>
          <div className="ml-auto mt-auto flex flex-col gap-y-20">
            <p className="ml-auto text-14 text-gray-500">파티의 총 누적 금액</p>
            <div className="ml-auto flex items-center">
              <p className="text-28 font-bold text-gray-900">
                {accumulatedMeso.toLocaleString()}
              </p>
              <Image
                src={Meso.src}
                width={30}
                height={29}
                alt="meso"
                className="h-29 w-30"
              />
            </div>
          </div>
        </div>
        <div className="ml-auto flex w-full flex-col gap-y-20 lg:w-752">
          <PartyMember />
          <InvitedPartyMember />
        </div>
      </div>
    </div>
  );
}
