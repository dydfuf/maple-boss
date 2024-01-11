import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import BoardCreateButton from "./BoardCreateButton";
import BoardListTable from "./BoardListTable";

export default function BoardListContainer() {
  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title="자유 게시판" />
        <BoardCreateButton />
        <BoardListTable />
      </ContentWrapper>
    </section>
  );
}
