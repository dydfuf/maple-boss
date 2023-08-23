import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API_HOST } from "constants/common";
import { CommonResponse } from "types/common";

export default function useCancelInviteParty() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["cancel-invite-party-member"],
    ({ partyInviteId }: Omit<APIParams, "accessToken">) =>
      sendCancelInviteParty({ partyInviteId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
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
  return axios.post<CommonResponse<null>>(
    `${API_HOST}/api/party-invite/cancel`,
    { partyInviteId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
