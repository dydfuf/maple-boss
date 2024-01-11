import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";
import { Category } from "./useGetBoard";

interface Params {
  id: number;
}

export default function useGetBoardDetail({ id }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading } = useQuery(
    ["board-detail", id],
    () => getBoardDetail({ accessToken, id }),
    {
      enabled: Boolean(accessToken) && Boolean(id),
    }
  );

  return { boardDetail: data?.data.data, isLoading };
}

interface APIParams {
  accessToken: string;
  id: number;
}

interface APIResponse {
  id: number;
  title: string;
  content: string;
  category: Category;
  views: number;
  createdAt: string;
  userId: number;
  nickname: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  nickname: string;
}

const getBoardDetail = ({ accessToken, id }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(`/api/board/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
