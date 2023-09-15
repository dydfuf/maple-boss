import CommonDialogButtonGroup from "components/common/Dialog/CommonDialogButtonGroup";
import CommonDialogContent from "components/common/Dialog/CommonDialogContent";
import CommonDialogTitle from "components/common/Dialog/CommonDialogTitle";

export default function EmailSendedDialog() {
  return (
    <CommonDialogContent>
      <CommonDialogTitle
        title={`인증 메일이 발송되었습니다.\n 이메일을 확인하세요`}
        className="whitespace-pre-line"
      />
      <CommonDialogButtonGroup showCancel={false} />
    </CommonDialogContent>
  );
}
