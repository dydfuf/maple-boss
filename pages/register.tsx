import Head from "next/head";
import RegisterContainer from "components/register/RegisterContainer";
import { getPageTitle } from "utils/meta";

export default function EmailVerifyPage() {
  return (
    <>
      <Head>
        <title>{getPageTitle("회원가입")}</title>
      </Head>
      <RegisterContainer />
    </>
  );
}