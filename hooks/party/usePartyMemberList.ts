import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API_HOST } from "constants/common";
import { CommonResponse } from "types/common";

interface Params {
  partyId: number;
}

export default function usePartyMemberList({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading } = useQuery(
    ["party-member-list", partyId],
    () => getPartyMemberList({ accessToken, partyId }),
    {
      enabled: Boolean(accessToken) && Boolean(partyId),
    }
  );

  return { members: data?.data.data.members || [], isLoading: isLoading };
}

interface APIParams {
  accessToken: string;
  partyId: number;
}

interface APIResponse {
  members: Member[];
}

interface Member {
  id: number;
  email: string;
  nickName: string;
  isLeader: boolean;
}

const getPartyMemberList = ({ accessToken, partyId }: APIParams) => {
  return axios.get<CommonResponse<APIResponse>>(
    `${API_HOST}/api/party/get-members?partyId=${partyId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
