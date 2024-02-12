import Text from "components/common/Text";
import Meso from "@/public/images/Meso.png";

interface Props {
  accumulatedMeso: number;
  leaderNickname: string;
  memberCount: number;
  settlementCount: number;
}

export default function PartyDetailInfo({
  accumulatedMeso,
  leaderNickname,
  memberCount,
  settlementCount,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-20">
      <div className="flex w-full flex-col space-y-8 rounded-20 bg-white px-30 py-20 opacity-95">
        <Text size={4} className="font-bold text-gray4">
          파티지갑
        </Text>
        <div className="flex items-center space-x-13">
          <img src={Meso.src} alt="meso" className="h-24 w-24" />
          <Text size={4} className="font-bold">
            {accumulatedMeso.toLocaleString()}
          </Text>
        </div>
      </div>
      <div className="flex w-full flex-col space-y-8 rounded-20 bg-white px-30 py-20 opacity-95">
        <Text size={4} className="font-bold text-gray4">
          파티장
        </Text>
        <Text size={4} className="font-bold">
          {leaderNickname}
        </Text>
      </div>
      <div className="flex w-full flex-col space-y-8 rounded-20 bg-white px-30 py-20 opacity-95">
        <Text size={4} className="font-bold text-gray4">
          파티원
        </Text>
        <Text size={4} className="font-bold">
          {`${memberCount}/6`}
        </Text>
      </div>
      <div className="flex w-full flex-col space-y-8 rounded-20 bg-white px-30 py-20 opacity-95">
        <Text size={4} className="font-bold text-gray4">
          정산수
        </Text>
        <Text size={4} className="font-bold">
          {`${settlementCount}개`}
        </Text>
      </div>
    </div>
  );
}
