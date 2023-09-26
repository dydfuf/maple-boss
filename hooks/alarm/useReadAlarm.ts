import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useReadAlarm() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ["read-alarm"],
    ({ alarmId }: Omit<APIParams, "accessToken">) =>
      sendReadAlarm({ alarmId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
        queryClient.invalidateQueries(["alarm"]);
      },
    }
  );

  return {
    readAlarm: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  alarmId: number;
}

const sendReadAlarm = ({ alarmId, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    `/api/alarm/read/${alarmId}`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
