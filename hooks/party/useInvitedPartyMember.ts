import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  partyId: number;
}

export default function useInvitedPartyMember({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading, refetch } = useQuery(
    ["invited-party-member", partyId],
    () => getInvitedPartyMember({ accessToken, partyId }),
    {
      enabled: Boolean(accessToken) && Boolean(partyId),
    }
  );

  return {
    partyInvites: data?.data.data.partyInvites || [],
    isLoading,
    refetch,
  };
}

interface APIParams {
  accessToken: string;
  partyId: number;
}

interface APIResponse {
  partyInvites: PartyInvite[];
}

export interface PartyInvite {
  id: number;
  email: string;
  status: Status;
}

type Status = "INVITED";

const getInvitedPartyMember = ({ accessToken, partyId }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(
    `/api/party-invite?partyId=${partyId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
