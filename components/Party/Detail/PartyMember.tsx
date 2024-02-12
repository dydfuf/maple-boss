import { useRouter } from "next/router";
import Text from "components/common/Text";
import usePartyMemberList from "hooks/party/usePartyMemberList";
import DefaultChractor from "@/public/images/DefaultChractor.png";
import LeaderCrown from "@/public/images/LeaderCrown.png";

export default function PartyMember() {
  const router = useRouter();
  const { partyId } = router.query;

  const { members } = usePartyMemberList({ partyId: Number(partyId) });

  return (
    <div className="grid grid-cols-6 gap-16 px-8">
      {members.map((member) => (
        <div
          className="relative flex flex-col items-center px-32 py-30"
          key={`party-member-${member.id}`}
        >
          {member.isLeader && (
            <img
              src={LeaderCrown.src}
              alt="leader-crown"
              className="absolute right-10 top-10 h-24 w-24"
            />
          )}
          <img
            src={DefaultChractor.src}
            alt={member.nickName}
            className="h-120 w-100"
          />
          <Text size={3} className="mt-8 font-bold">
            {member.nickName}
          </Text>
          <Text size={1} className="text-gray4">
            {member.email}
          </Text>
        </div>
      ))}
    </div>
  );
}
