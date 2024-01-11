import { useRouter } from "next/router";
import { useState } from "react";
import usePostBoardComment from "hooks/board/usePostBoardComment";

export default function BoardCommentCreateArea() {
  const [commentValue, setCommentValue] = useState("");

  const router = useRouter();
  const { boardId } = router.query;

  const { postBoardComment } = usePostBoardComment({
    boardId: Number(boardId),
  });

  const handlePostBoardComment = async () => {
    await postBoardComment({ content: commentValue });
    setCommentValue("");
  };

  return (
    <div className="mt-40 flex w-full gap-40 rounded-8 bg-gray-100 px-20 py-32">
      <textarea
        className="h-80 w-full rounded-12 border-1 p-12"
        placeholder="답변을 입력해주세요."
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
      />
      <button
        className="h-80 w-80 shrink-0 rounded-12 border-1 bg-white p-20"
        onClick={handlePostBoardComment}
      >
        등록
      </button>
    </div>
  );
}
