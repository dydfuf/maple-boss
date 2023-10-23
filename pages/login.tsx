import Head from "next/head";
import LoginContainer from "components/Login/LoginContainer";
import { getPageTitle } from "utils/meta";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>{getPageTitle("로그인")}</title>
      </Head>
      <LoginContainer />;
    </>
  );
}

export const getServerSideProps = () => {
  return {
    props: {
      hideGnb: true,
    },
  };
};
