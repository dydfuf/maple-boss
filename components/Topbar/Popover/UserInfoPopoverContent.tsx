import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Button from "components/common/Button";
import Text from "components/common/Text";
import useMyInfo from "hooks/user/useMyInfo";
import CloseIcon from "./CloseIcon";
import { PopoverClose, PopoverContent } from ".";

export default function UserInfoPopoverContent() {
  const { info } = useMyInfo();
  const { nickname } = info || {};
  const router = useRouter();

  // @TODO #143 닉네임 변경, 비밀번호 Alert 추가시 작업한다.
  //   const handleNicknameChangeClick = () => {};

  //   const handlePasswordChangeClick = () => {};

  const handleInquiryClick = () => {
    router.push("/inquiry");
  };

  const handleSignOutClick = () => {
    signOut({ callbackUrl: "/boss" });
  };

  return (
    <PopoverContent>
      <Text size={2} className="font-bold">{`${nickname}님`}</Text>
      <PopoverClose>
        <CloseIcon />
      </PopoverClose>
      <div className="mt-20 flex w-full flex-col space-y-8">
        <PopoverClose asChild>
          <Button label="닉네임 변경" />
        </PopoverClose>
        <PopoverClose asChild>
          <Button label="비밀번호 변경" />
        </PopoverClose>
        <PopoverClose asChild>
          <Button label="문의하기" onClick={handleInquiryClick} />
        </PopoverClose>
      </div>
      <Text
        size={2}
        className="mt-20 cursor-pointer text-center font-normal"
        onClick={handleSignOutClick}
      >
        로그아웃
      </Text>
    </PopoverContent>
  );
}
