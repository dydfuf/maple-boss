import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import BoardCreateForm from "./BoardCreateForm";

export default function BoardCreateContainer() {
  return (
    <section className="flex w-full">
      <ContentWrapper isFixed>
        <ContentTitle title="게시글 등록" />
        <BoardCreateForm />
      </ContentWrapper>
    </section>
  );
}
