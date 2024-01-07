import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import { Rank } from "pages/ranking/[world]/[page]";
import RankingListTable from "./RankingListTable";
import RankingPageNavigator from "./RankingPageNavigator";
import RankingWorldNavigator from "./RankingWorldNavigator";

interface Props {
  rankList: Rank[];
  nowDate: string;
}

export default function RankingContainer({ rankList, nowDate }: Props) {
  return (
    <section className="flex w-full">
      <ContentWrapper isFixed>
        <ContentTitle title="무릉도장 랭킹" />
        <RankingWorldNavigator />
        <RankingListTable rankList={rankList} nowDate={nowDate} />
        <RankingPageNavigator />
      </ContentWrapper>
    </section>
  );
}
