import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  partyId: number;
}

export default function usePartySettlementSummary({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading, refetch } = useQuery(
    ["party-settlement-summary", partyId],
    () => sendPartySettlementSummary({ accessToken, partyId }),
    {
      enabled: Boolean(accessToken),
    }
  );

  const summaries =
    data?.data.data.summary.filter((summary) => summary.status !== "DELETED") ||
    [];

  return {
    summaries,
    isLoading,
    refetch,
  };
}

interface APIParams {
  accessToken: string;
  partyId: number;
}

interface APIResponse {
  summary: Summary[];
  totalElements: number;
  totalPages: number;
  last: boolean;
}

interface Summary {
  id: number;
  bossName: string;
  bossClazz: BossClazz;
  type: Type;
  status: Status;
  createdAt: string;
  confirmedAt?: string;
}

type BossClazz = "EASY" | "HARD" | "NORMAL";
type Type = "MANUAL" | "AUTO";
type Status = "IN_PROGRESS" | "CONFIRMED" | "DELETED";

const sendPartySettlementSummary = ({ partyId, accessToken }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(
    `/api/party-settlement/get-summary?partyId=${partyId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
