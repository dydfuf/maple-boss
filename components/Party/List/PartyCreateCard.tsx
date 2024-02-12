import Text from "components/common/Text";
import Plus from "@/public/images/Plus.png";

interface Props {
  onCreateCardClick: () => void;
}

export default function PartyCreateCard({ onCreateCardClick }: Props) {
  return (
    <button
      className="flex min-h-160 items-center justify-center rounded-20 bg-white p-30 opacity-95"
      onClick={onCreateCardClick}
    >
      <div className="flex space-x-8">
        <img src={Plus.src} width={24} height={24} alt="plus" />
        <Text>파티 생성</Text>
      </div>
    </button>
  );
}
