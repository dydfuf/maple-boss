import { useSession } from "next-auth/react";
import PartyListContainer from "components/Party/PartyListContainer";

export default function PartyListPage() {
  useSession({ required: true });
  return <PartyListContainer />;
}
