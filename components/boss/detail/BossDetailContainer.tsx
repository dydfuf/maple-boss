import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import { Boss, Item } from "utils/ssrApi/bossDetail";
import BossDetailContent from "./BossDetailContent";

interface Props {
  boss: Boss;
  items: Item[];
}

export default function BossDetailContainer({ boss, items }: Props) {
  const bossName = boss.name || "";
  const bossClazz = boss.clazz ? `(${boss.clazz})` : "";

  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title={`보스 상세 - ${bossName} ${bossClazz}`} />
        <BossDetailContent boss={boss} items={items} />
      </ContentWrapper>
    </section>
  );
}
