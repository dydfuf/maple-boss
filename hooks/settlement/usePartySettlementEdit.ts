import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function usePartySettlementEdit() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync } = useMutation(
    ["party-settlement-edit"],
    (settlement: EditSettlement) =>
      sendPartySettlementEdit({
        settlement,
        accessToken,
      }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
          return;
        }
        alert("정산 상세 수정에 성공하였습니다.");
      },
    }
  );

  return {
    editPartySettlement: mutateAsync,
  };
}

interface APIParams {
  settlement: EditSettlement;
  accessToken: string;
}

export interface EditSettlement {
  partySettlementId: number;
  percentage: number;
  items: Items;
  dividends: dividends;
}

type Items = {
  bossItemId: number;
  amount: number;
  meso: number;
}[];

type dividends = {
  memberId: number;
  rate: number;
}[];

const sendPartySettlementEdit = ({ settlement, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/party-settlement/update",
    settlement,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
