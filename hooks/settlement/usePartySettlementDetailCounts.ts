import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function usePartySettlementDetailCounts() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading, refetch } = useQuery(
    ["party-settlement-detail-counts"],
    () => sendPartySettlementDetailCounts({ accessToken }),
    {
      enabled: Boolean(accessToken),
    }
  );

  return {
    partySettlementDetailCounts: data?.data.data.counts || [],
    isLoading,
    refetch,
  };
}

interface APIParams {
  accessToken: string;
}

interface APIResponse {
  counts: SettlementDetailCount[];
}

interface SettlementDetailCount {
  partyId: number;
  partyName: string;
  inProgressCount: number;
  confirmedCount: number;
  paidCount: number;
  autoCount: number;
  manualCount: number;
  isLeader: boolean;
}

const sendPartySettlementDetailCounts = ({ accessToken }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(
    "/api/party-settlement/detail-counts",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
