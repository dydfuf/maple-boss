import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useGetBoardDetail from "hooks/board/useGetBoardDetail";
import BoardCommentCreateArea from "./BoardCommentCreateArea";
import BoardCommentList from "./BoardCommentList";

const ToastViewer = dynamic(() => import("components/common/Viewer"), {
  ssr: false,
});

export default function BoardDetail() {
  const router = useRouter();
  const { boardId } = router.query;

  const { boardDetail } = useGetBoardDetail({ id: Number(boardId) });

  return (
    <div className="flex h-full flex-col p-12 text-gray-600">
      <div className="flex h-full w-full flex-col">
        <div className="min-h-[600px]">
          {boardDetail?.content && (
            <ToastViewer contents={boardDetail.content} />
          )}
        </div>
        <BoardCommentList />
        <BoardCommentCreateArea />
      </div>
    </div>
  );
}
