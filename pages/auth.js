import { getServerSession } from "next-auth";
import AuthForm from "../components/auth/auth-form";
import authOptions from "./api/auth/[...nextauth]";

function AuthPage() {
  return <AuthForm />;
}

export default AuthPage;

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
