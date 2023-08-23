import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API_HOST } from "constants/common";
import { CommonResponse } from "types/common";

export default function useMyInfo() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading } = useQuery(
    ["my-info", accessToken],
    () => getMyInfo({ accessToken }),
    {
      enabled: Boolean(accessToken),
    }
  );

  return { info: data?.data.data, isLoading };
}

interface APIParams {
  accessToken: string;
}

interface APIResponse {
  id: number;
  nickname: string;
  email: string;
  status: string;
}

const getMyInfo = ({ accessToken }: APIParams) => {
  return axios.get<CommonResponse<APIResponse>>(
    `${API_HOST}/api/user/my-info`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
