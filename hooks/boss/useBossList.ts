import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useBossList() {
  const { data: sessionData } = useSession({ required: true });
  const accessToken = sessionData?.accessToken || "";

  const { data } = useQuery(
    ["search-boss"],
    () => sendBossList({ accessToken }),
    {
      enabled: Boolean(accessToken),
    }
  );

  return {
    bossList: data?.data.data.searchedList || [],
  };
}

interface APIParams {
  accessToken: string;
}

interface APIResponse {
  searchedList: SearchedBoss[];
}

export interface SearchedBoss {
  id: number;
  name: string;
}

const sendBossList = ({ accessToken }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>("/api/search/boss", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
