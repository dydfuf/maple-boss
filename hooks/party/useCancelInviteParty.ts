import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useCancelInviteParty() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ["cancel-invite-party-member"],
    ({ partyInviteId }: Omit<APIParams, "accessToken">) =>
      sendCancelInviteParty({ partyInviteId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
        queryClient.invalidateQueries(["invited-party-member"]);
      },
    }
  );

  return {
    cancelInviteParty: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  partyInviteId: number;
}

const sendCancelInviteParty = ({ partyInviteId, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/party-invite/cancel",
    { partyInviteId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
