import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import { Boss } from "utils/ssrApi/boss";
import BossListContent from "./BossListContent";

interface Props {
  bossList: Boss[];
}

export default function BossListContainer({ bossList }: Props) {
  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title="보스" />
        <BossListContent bossList={bossList} />
      </ContentWrapper>
    </section>
  );
}
