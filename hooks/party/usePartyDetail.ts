import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  partyId: number;
}

export default function usePartyDetail({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading, refetch } = useQuery(
    ["party-detail", partyId],
    () => getPartyDetail({ accessToken, partyId }),
    {
      enabled: Boolean(accessToken) && Boolean(partyId),
    }
  );

  return { partyDetail: data?.data.data.party, isLoading, refetch };
}

interface GetPartyDetailParams {
  accessToken: string;
  partyId: number;
}

interface GetPArtyDetailResponse {
  party: {
    id: number;
    name: string;
    isLeader: boolean;
    leaderNickname: string;
    memberCount: number;
    description: string;
    accumulatedMeso: number;
    settlementCount: number;
  };
}

const getPartyDetail = ({ accessToken, partyId }: GetPartyDetailParams) => {
  return customedAxios.get<CommonResponse<GetPArtyDetailResponse>>(
    `/api/party/get-party?partyId=${partyId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
