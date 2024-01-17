import { useQuery } from "@tanstack/react-query";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useGetBoard() {
  const { data, isLoading } = useQuery(["board"], () => getBoardList({}));

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
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface APIParams {}

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
  commentCount: number;
  nickname: string;
}

// eslint-disable-next-line no-empty-pattern
const getBoardList = ({}: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>("/api/board");
};

export type Category = "FREE" | "TIP" | "WALK_THROUGH";
