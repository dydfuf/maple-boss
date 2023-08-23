import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API_HOST } from "constants/common";
import { CommonResponse } from "types/common";

export default function useCreateParty() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["create-party"],
    ({ name, description }: Omit<APIParams, "accessToken">) =>
      sendCreateParty({ name, description, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
      },
    }
  );

  return {
    createParty: mutateAsync,
    isLoading,
  };
}

interface APIResponse {
  party: {
    id: number;
    leaderId: number;
    leaderNickname: string;
    name: string;
    description: string;
  };
}

interface APIParams {
  accessToken: string;
  name: string;
  description: string;
}

const sendCreateParty = ({ name, description, accessToken }: APIParams) => {
  return axios.post<CommonResponse<APIResponse>>(
    `${API_HOST}/api/party`,
    { name, description },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
