import { useRouter } from "next/router";
import { AuthForm, AuthFormParams } from "../../components/AuthForm";
import { useEffect, useState } from "react";
import { userStore } from "../../store/store";

const SignUp = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (data: AuthFormParams) => {
    try {
      await userStore.signUp(data);
      router.push('/signIn');
    } catch (error) {
      setError(error.message);
    }
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
      error={error}
      setError={setError}
    />
  )
};

export default SignUp;


