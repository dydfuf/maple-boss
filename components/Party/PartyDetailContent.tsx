import { useRouter } from "next/router";
import { useEffect } from "react";
import Text from "components/common/Text";
import usePartyDetail from "hooks/party/usePartyDetail";
import LeavePartyButton from "./Detail/LeavePartyButton";
import PartyController from "./Detail/PartyController";
import PartyDetailInfo from "./Detail/PartyDetailInfo";
import PartyMember from "./Detail/PartyMember";

export default function PartyDetailContent() {
  const router = useRouter();
  const { partyId } = router.query;

  const { partyDetail, isLoading, isNotFound } = usePartyDetail({
    partyId: Number(partyId),
  });

  const { leaderNickname, memberCount, accumulatedMeso, settlementCount } =
    partyDetail || {
      leaderNickname: "",
      memberCount: 0,
      accumulatedMeso: 0,
      settlementCount: 0,
    };

  useEffect(() => {
    if (isNotFound) {
      alert("해당 파티를 찾을 수 없습니다.");
      router.back();
    }
  }, [isNotFound, router]);

  // TODO: 로딩 스켈레톤을 추가합니다.
  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <PartyDetailInfo
        accumulatedMeso={accumulatedMeso}
        leaderNickname={leaderNickname}
        memberCount={memberCount}
        settlementCount={settlementCount}
      />
      <div className="mt-40 rounded-20 bg-white opacity-95">
        <div className="flex border-b-1 px-30 py-20">
          <Text size={5} className="font-bold">
            파티원
          </Text>
          <PartyController />
        </div>
        <PartyMember />
      </div>
      <LeavePartyButton />
    </>
  );
}
