import Button from "components/common/Button";
import Text from "components/common/Text";
import CloseIcon from "./CloseIcon";
import { PopoverClose, PopoverContent } from ".";

interface Props {
  handleLoginBtnClick: () => void;
}

export default function NeedLoginPopoverContent({
  handleLoginBtnClick,
}: Props) {
  return (
    <PopoverContent>
      <PopoverClose>
        <CloseIcon />
      </PopoverClose>
      <Text size={1} className="text-center">
        로그인/회원가입 후<br /> 이용해주세요.
      </Text>
      {/* @TODO 버튼 색상이 수정될때 수정되어야 합니다. */}
      <Button className="mt-10" label="로그인" onClick={handleLoginBtnClick} />
    </PopoverContent>
  );
}
