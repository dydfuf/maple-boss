import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  boardId: number;
}

export default function usePostBoardComment({ boardId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ["post-board-comment", boardId],
    ({ content }: Omit<APIParams, "accessToken" | "boardId">) =>
      postBoardComment({ content, boardId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
        queryClient.invalidateQueries(["board-detail", boardId]);
      },
    }
  );

  return {
    postBoardComment: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  boardId: number;
  content: string;
}

const postBoardComment = ({ boardId, content, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/comment",
    { boardId, content },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
