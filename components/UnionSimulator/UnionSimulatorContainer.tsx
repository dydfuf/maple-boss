import { useEffect } from "react";
import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import { usePiecesStore } from "states/pieces";
import UnionBoard from "./UnionBoard";
import UnionPieces from "./UnionPieces";

export default function UnionSimulatorContainer() {
  const { initializePieces } = usePiecesStore((state) => state);

  useEffect(() => {
    initializePieces();
  }, [initializePieces]);

  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title="유니온 계산기" />
        <div className="mt-20 px-8 font-bold lg:hidden">
          유니온 계산기는 데스크탑(1920x1080)해상도에 최적화 되어있습니다.{" "}
          <br />
          데스크탑으로 접속하여 유니온 시뮬레이터를 100% 활용 해보세요 🚀
        </div>
        <div className="mt-40 flex flex-col gap-20 sm:flex-row">
          <UnionPieces />
          <UnionBoard />
        </div>
      </ContentWrapper>
    </section>
  );
}
