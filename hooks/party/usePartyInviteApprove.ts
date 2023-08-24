import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API_HOST } from "constants/common";
import { CommonResponse } from "types/common";

export default function usePartyInviteApprove() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["party-invite-approve"],
    ({ partyInviteId }: Omit<APIParams, "accessToken">) =>
      sendPartyInviteApprove({ partyInviteId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
      },
    }
  );

  return {
    partyInviteApprove: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  partyInviteId: number;
}

const sendPartyInviteApprove = ({ partyInviteId, accessToken }: APIParams) => {
  return axios.post<CommonResponse<null>>(
    `${API_HOST}/api/party-invite/approve`,
    { partyInviteId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
