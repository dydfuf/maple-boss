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
        <div className="mt-40 flex gap-20">
          <UnionPieces />
          <UnionBoard />
        </div>
      </ContentWrapper>
    </section>
  );
}
