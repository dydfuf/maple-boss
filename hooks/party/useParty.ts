import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useParty() {
  const { data: sessionData } = useSession({ required: true });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (sessionData?.error === "RefreshAccessTokenError") {
      alert(JSON.stringify(sessionData));
    }
  }, [sessionData]);

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading, refetch } = useQuery(
    ["party"],
    () => getPartyList({ accessToken }),
    {
      enabled: Boolean(accessToken),
    }
  );

  return { parties: data?.data.data.parties || [], isLoading, refetch };
}

interface GetPartyListParams {
  accessToken: string;
}

interface GetPartyListResponse {
  parties: Party[];
}

export interface Party {
  isLeader: boolean;
  id: number;
  leaderId: number;
  leaderNickname: string;
  name: string;
  description: string;
}

const getPartyList = ({ accessToken }: GetPartyListParams) => {
  return customedAxios.get<CommonResponse<GetPartyListResponse>>(
    "/api/party?page=0&size=100",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
