import Link from "next/link";
import Text from "components/common/Text";
import { Party } from "hooks/party/useParty";
import Crown from "@/public/images/Crown.png";

interface Props {
  party: Party;
}

export default function PartyCard({ party }: Props) {
  return (
    <Link
      className="flex flex-col space-y-8 rounded-20 bg-white p-30 opacity-95"
      href={`/party/${party.id}`}
    >
      <Text size={4} className="font-bold text-gray1">
        {party.name}
      </Text>
      <Text size={2} className="text-gray4">
        {party.description}
      </Text>
      <div className="mt-auto flex gap-x-4">
        <Text size={2} className="text-gray1">
          {party.leaderNickname}
        </Text>
        {party.isLeader && (
          <img src={Crown.src} width={30} height={28} alt="crown" />
        )}
      </div>
    </Link>
  );
}
