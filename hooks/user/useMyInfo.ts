import { useQuery } from "@tanstack/react-query";
import { customedAxios } from "hooks/api/customedAxios";
import { useSession } from "next-auth/react";
import { CommonResponse } from "types/common";

export default function useMyInfo() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading, refetch } = useQuery(
    ["my-info", accessToken],
    () => getMyInfo({ accessToken }),
    {
      enabled: Boolean(accessToken),
    }
  );

  return { info: data?.data.data, isLoading, refetch };
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
  return customedAxios.get<CommonResponse<APIResponse>>(
    '/api/user/my-info',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
