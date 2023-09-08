import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Dividens } from "components/Settlement/PartyDetail/CreateSettlementDialog/CreateSettlementDialogRoot";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse, SettlementType } from "types/common";

interface Params {
  partyId: number;
}

export default function usePartySettlementCreate({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ["party-settlement-create", partyId],
    ({
      bossId,
      type,
      items,
      dividends,
    }: Omit<APIParams, "accessToken" | "partyId">) =>
      sendPartySettlementCreate({
        partyId,
        bossId,
        type,
        items,
        dividends,
        accessToken,
      }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
        queryClient.invalidateQueries(["party-settlement-summary", partyId]);
      },
    }
  );

  return {
    createPartySettlement: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  partyId: number;
  bossId: number;
  type: SettlementType;
  items: Item[];
  dividends: Dividens[];
  accessToken: string;
}

type Item = {
  bossItemId: number;
  amount: number;
  meso: number;
};

const sendPartySettlementCreate = ({
  partyId,
  bossId,
  type,
  items,
  dividends,
  accessToken,
}: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/party-settlement",
    { partyId, bossId, type, items, dividends },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
