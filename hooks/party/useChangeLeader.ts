import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  partyId: number;
}

export default function useChangeLeader({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });
  const queryClient = useQueryClient();

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["change-leader"],
    ({ memberId }: Omit<APIParams, "accessToken" | "partyId">) =>
      sendChangeLeader({ memberId, partyId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
        // @TODO: query-key 별도관리 하도록 수정
        // https://mapleboss.atlassian.net/browse/MAW-60
        queryClient.invalidateQueries(["party-detail"]);
        queryClient.invalidateQueries(["party-member-list"]);
      },
    }
  );

  return {
    changeLeader: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  partyId: number;
  memberId: number;
}

const sendChangeLeader = ({ partyId, memberId, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/party/change-leader",
    { partyId, memberId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
