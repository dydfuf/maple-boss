import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useMyInfo() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data } = useQuery(["my-info"], () => getMyInfo({ accessToken }), {
    enabled: Boolean(accessToken),
  });

  return { info: data?.data.data };
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
  return customedAxios.get<CommonResponse<APIResponse>>("/api/user/my-info", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
