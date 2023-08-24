import * as Dialog from "@radix-ui/react-dialog";
import { signOut } from "next-auth/react";
import { useState } from "react";
import useChangeNickname from "hooks/user/useChangeNickname";
import useChangePassword from "hooks/user/useChangePassword";
import useMyInfo from "hooks/user/useMyInfo";
import NicknameChangeDialog from "./NicknameChangeDialog";
import PasswordChangeDialog from "./PasswordChangeDialog";

export default function UserInfoPopover() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>();

  const { info, refetch } = useMyInfo();
  const { changeNickname } = useChangeNickname();
  const { changePassword } = useChangePassword();

  const { nickname } = info || { nickname: "" };

  const handleSignOutClick = () => {
    signOut();
  };
  const handleNicknameChangeClick = () => {
    setDialogType("NICKNAME_CHANGE");
    setDialogOpen(true);
  };
  const handlePasswordChangeClick = () => {
    setDialogType("PASSWORD_CHANGE");
    setDialogOpen(true);
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="flex flex-col gap-y-16">
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">{`${nickname} 님`}</span>
          <button className="p-8" onClick={handleSignOutClick}>
            <span className="text-14 text-gray-400 font-semibold">
              로그아웃
            </span>
          </button>
        </div>
        <div className="mt-15 w-full flex flex-col gap-y-8">
          <button
            className="w-full rounded-4 bg-gray-200 px-16 py-8"
            onClick={handleNicknameChangeClick}
          >
            <span className="text-14 text-gray-900 font-semibold">
              닉네임 변경
            </span>
          </button>
          <button
            className="w-full rounded-4 bg-gray-200 px-16 py-8"
            onClick={handlePasswordChangeClick}
          >
            <span className="text-14 text-gray-900 font-semibold">
              비밀번호 변경
            </span>
          </button>
        </div>
      </div>
      {dialogType === "NICKNAME_CHANGE" && (
        <NicknameChangeDialog
          onSubmit={async (nickname: string) => {
            await changeNickname({ nickname });
            refetch();
            setDialogOpen(false);
          }}
        />
      )}
      {dialogType === "PASSWORD_CHANGE" && (
        <PasswordChangeDialog
          onSubmit={async (password: string) => {
            await changePassword({ password });
          }}
        />
      )}
    </Dialog.Root>
  );
}

type DialogType = "NICKNAME_CHANGE" | "PASSWORD_CHANGE" | undefined;
