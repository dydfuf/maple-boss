import { useRouter } from "next/router";
import CommonDialogButtonGroup from "components/common/Dialog/CommonDialogButtonGroup";
import CommonDialogContent from "components/common/Dialog/CommonDialogContent";
import CommonDialogTitle from "components/common/Dialog/CommonDialogTitle";

interface Props {
  createdUserEmail: string;
}

export default function UserCreatedDialog({ createdUserEmail }: Props) {
  const router = useRouter();

  const routeToLogin = () => {
    router.push("/login");
  };

  return (
    <CommonDialogContent>
      <CommonDialogTitle title="회원가입이 완료 되었습니다." />
      <p className="mt-20">
        <span className="font-semibold text-purple-100">
          {createdUserEmail}
        </span>
        에서 임시 비밀번호를 확인해주세요.
      </p>
      <CommonDialogButtonGroup
        showCancel={false}
        confirmLabel="로그인 하러 가기"
        onClickConfirm={routeToLogin}
      />
    </CommonDialogContent>
  );
}
