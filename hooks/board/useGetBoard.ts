import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useGetBoard() {
  const { data: sessionData } = useSession();

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading } = useQuery(
    ["board"],
    () => getBoardList({ accessToken }),
    {
      enabled: Boolean(accessToken),
    }
  );

  return { boardList: data?.data.data.content || [], isLoading };
}
/**
 * @todo
 * keywords
 * title
 * content
 * nickname
 * category
 */
interface APIParams {
  accessToken: string;
}

interface APIResponse {
  content: Board[];
}

interface Board {
  id: number;
  title: string;
  category: Category;
  views: number;
  createdAt: string;
  userId: number;
  nickname: string;
}

const getBoardList = ({ accessToken }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>("/api/board", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export type Category = "FREE" | "TIP" | "WALK_THROUGH";
