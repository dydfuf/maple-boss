import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useMyPartyInvite() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading, refetch } = useQuery(
    ["my-party-invite"],
    () => getMyPartyInvite({ accessToken }),
    {
      enabled: Boolean(accessToken),
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
}

interface APIResponse {
  partyInvites: PartyInvite[];
}

export interface PartyInvite {
  id: number;
  partyName: string;
  status: Status;
}

type Status = "INVITED";

const getMyPartyInvite = ({ accessToken }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(
    "/api/party-invite/my-invites",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
