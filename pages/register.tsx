import RegisterContainer from "components/register/RegisterContainer";

export default function EmailVerifyPage() {
  return <RegisterContainer />;
}

export const getServerSideProps = () => {
  return {
    props: {
      hideGnb: true,
    },
  };
};
