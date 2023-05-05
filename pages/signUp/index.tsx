import { useRouter } from "next/router";
import { AuthForm, AuthFormParams } from "../../components/AuthForm";
import { useEffect } from "react";
import { userStore } from "../../store/store";

const SignUp = () => {
  const router = useRouter();
  const handleSignUp = async (data: AuthFormParams) => {
  await userStore.signUp(data);
  router.push('/signIn');
  };

  useEffect(() => {
    userStore.checkAuth().then(response => response && router.push('/'));
  }, [router])

  return (
    <AuthForm
      onSubmit={handleSignUp}
      formAction='SignUp'
      actionLink='/signIn'
      actionTitle='SignIn'
    />
  )
};

export default SignUp;


