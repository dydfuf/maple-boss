import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API_HOST } from "constants/common";
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

interface PartyInvite {
  id: number;
  partyName: string;
  status: Status;
}

type Status = "INVITED";

const getMyPartyInvite = ({ accessToken }: APIParams) => {
  return axios.get<CommonResponse<APIResponse>>(
    `${API_HOST}/api/party-invite/my-invites`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
