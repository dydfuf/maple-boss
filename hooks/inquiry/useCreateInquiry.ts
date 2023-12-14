import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";
import { Type } from "./useGetInquiry";

export default function useCreateInquiry() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["create-inquiry"],
    ({ title, content, type }: Omit<APIParams, "accessToken">) =>
      sendCreateInquiry({ title, content, type, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
      },
    }
  );

  return {
    createInquiry: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  title: string;
  content: string;
  type: Type;
}

const sendCreateInquiry = ({
  title,
  content,
  type,
  accessToken,
}: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/inquiry",
    { title, content, type },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
