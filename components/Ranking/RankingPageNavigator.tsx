import { useRouter } from "next/router";
import { cn } from "utils/common";

export default function RankingPageNavigator() {
  const router = useRouter();
  const { world, page } = router.query;

  const worldNum = Number(world);

  const currentPage = Number(page);
  const prevPage = currentPage > 0 ? currentPage - 1 : 0;
  const nextPage = currentPage + 1;

  const goPrev = () => {
    router.push(`/ranking/${worldNum}/${prevPage}`);
  };
  const goCurrent = () => {
    router.push(`/ranking/${worldNum}/${currentPage}`);
  };

  const goNext = () => {
    router.push(`/ranking/${worldNum}/${nextPage}`);
  };

  return (
    <div className="flex w-full justify-center gap-12">
      <button
        className={cn("flex h-40 w-40 items-center justify-center", {
          invisible: !Boolean(prevPage),
        })}
        onClick={goPrev}
      >
        {"<"}
      </button>
      <button
        className={cn(BUTTON_CLASSNAME, { invisible: !Boolean(prevPage) })}
        onClick={goPrev}
      >
        {prevPage}
      </button>
      <button
        className={cn(BUTTON_CLASSNAME, ACTIVE_CLASSNAME)}
        onClick={goCurrent}
      >
        {currentPage}
      </button>
      <button className={BUTTON_CLASSNAME} onClick={goNext}>
        {nextPage}
      </button>
      <button
        className="flex h-40 w-40 items-center justify-center"
        onClick={goNext}
      >
        {">"}
      </button>
    </div>
  );
}

const BUTTON_CLASSNAME =
  "flex h-40 w-40 items-center justify-center rounded-4 border-1";
const ACTIVE_CLASSNAME = "border-purple-100 bg-purple-100 text-white";
