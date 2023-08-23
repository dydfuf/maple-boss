import { useSession } from "next-auth/react";
import PartyDetailContainer from "components/Party/PartyDetailContainer";

export default function PartyDetailPage() {
  useSession({ required: true });
  return <PartyDetailContainer />;
}
