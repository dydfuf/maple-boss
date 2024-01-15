import { format } from "date-fns";
import { useRouter } from "next/router";
import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import { Category } from "hooks/board/useGetBoard";
import useGetBoardDetail from "hooks/board/useGetBoardDetail";
import BoardDetail from "./BoardDetail";
import BoardDetailSubTitle from "./BoardDetailSubTitle";
import { CategoryToNameMap } from "../Create/BoardCreateForm";

export default function BoardDetailContainer() {
  const router = useRouter();
  const { boardId } = router.query;

  const { boardDetail } = useGetBoardDetail({ id: Number(boardId) });
  const { title, nickname, createdAt, views, category } = boardDetail || {
    title: "",
    nickname: "",
    createdAt: "",
    views: 0,
    category: "",
  };

  let date = "";
  try {
    date = format(new Date(createdAt), "yyyy-MM-dd HH:MM");
  } catch (e) {}

  const contentTitle = `[${
    category ? CategoryToNameMap[category] : ""
  }] ${title}`;

  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title={contentTitle} variant="detail">
          <BoardDetailSubTitle nickname={nickname} date={date} views={views} />
        </ContentTitle>
        <BoardDetail />
      </ContentWrapper>
    </section>
  );
}
