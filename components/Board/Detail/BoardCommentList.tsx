import { format } from "date-fns";
import { useRouter } from "next/router";
import useGetBoardDetail from "hooks/board/useGetBoardDetail";

export default function BoardCommentList() {
  const router = useRouter();
  const { boardId } = router.query;

  const { boardDetail } = useGetBoardDetail({ id: Number(boardId) });

  return (
    <div className="mt-auto w-full text-black">
      <p className="my-12 text-24 font-bold">
        댓글 ({boardDetail?.comments?.length})
      </p>
      {boardDetail?.comments &&
        boardDetail?.comments.length > 0 &&
        boardDetail?.comments.map((comment) => {
          let answeredDate;
          try {
            answeredDate = format(
              new Date(comment?.createdAt ?? ""),
              "( yyyy-MM-dd )"
            );
          } catch (e) {}

          return (
            <div
              className="border-b-1 px-8 py-20 first:border-t-1"
              key={`comment-list-${comment.id}`}
            >
              <p className="text-20 font-bold">
                {comment.nickname}{" "}
                <span className="text-14 font-normal text-gray-500">
                  {answeredDate}
                </span>
              </p>
              <p className="mt-20">{comment?.content}</p>
            </div>
          );
        })}
    </div>
  );
}
