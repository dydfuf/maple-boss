import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";
import { BossClazz, Status, Type } from "./usePartySettlementSummary";

interface Params {
  settlementId: number;
}

export default function useSettlementDetailInfo({ settlementId }: Params) {
  const router = useRouter();
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading, refetch } = useQuery(
    ["settlement-detail", settlementId],
    () => sendSettlementDetail({ accessToken, settlementId }),
    {
      enabled: Boolean(accessToken) && Boolean(settlementId),
      onSuccess: (data) => {
        if (data.data.code !== "S000") {
          const currentUrlArr = window.location.href.split("/");
          currentUrlArr.length = 5;
          router.push(currentUrlArr.join("/"));
        }
      },
    }
  );

  return {
    partySettlement: data?.data.data?.partySettlement,
    items: data?.data.data?.partySettlement.items,
    selectedBossId: data?.data.data?.partySettlement.mainData.bossId,
    isLoading,
    refetch,
  };
}

interface APIParams {
  accessToken: string;
  settlementId: number;
}

interface APIResponse {
  partySettlement: PartySettlement;
}

export interface PartySettlement {
  id?: number;
  mainData: MainData;
  items?: Item[];
  dividends?: Dividends[];
}

interface MainData {
  partyId: number;
  partyName: string;
  bossId: number;
  bossName: string;
  bossClazz: BossClazz;
  userName: string;
  isLeader: boolean;
  createdAt: string;
  status: Status;
  percentage: number;
  type: Type;
  confirmDate: string;
  previousSettlementId: number;
}

export interface Item {
  id: number;
  name: string;
  amount: number;
  meso: number;
}

export interface Dividends {
  userId: number;
  userName: string;
  rate: number;
}

const sendSettlementDetail = ({ settlementId, accessToken }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(
    `/api/party-settlement/${settlementId}/detail`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
