import Link from "next/link";
import Text from "components/common/Text";

export default function SignUpButton() {
  return (
    <Link href="/register" className="mt-30">
      <Text size={1}>회원가입</Text>
    </Link>
  );
}
