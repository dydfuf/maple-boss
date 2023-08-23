import LoginContainer from "components/Login/LoginContainer";

export default function LoginPage() {
  return <LoginContainer />;
}

export const getServerSideProps = () => {
  return {
    props: {
      hideGnb: true,
    },
  };
};
