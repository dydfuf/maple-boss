import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";
import { Category } from "./useGetBoard";

export default function useCreateBoard() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["create-board"],
    ({ title, content, category }: Omit<APIParams, "accessToken">) =>
      sendCreateBoard({ title, content, category, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
      },
    }
  );

  return {
    createBoard: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  title: string;
  content: string;
  category: Category;
}

const sendCreateBoard = ({
  title,
  content,
  category,
  accessToken,
}: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/board",
    { title, content, category },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
