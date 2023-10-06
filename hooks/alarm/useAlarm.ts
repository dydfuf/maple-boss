import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useAlarm() {
  const { data: sessionData } = useSession();
  const accessToken = sessionData?.accessToken || "";

  const { data } = useQuery(["alarm"], () => sendGetAlarm({ accessToken }), {
    enabled: Boolean(accessToken),
  });

  return {
    alarms: data?.data.data.alarms || [],
  };
}

interface APIParams {
  accessToken: string;
}

interface APIResponse {
  alarms: Alarm[];
}

interface Alarm {
  id: number;
  content: string;
}

const sendGetAlarm = ({ accessToken }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(`/api/alarm`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
