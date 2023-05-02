import { AuthForm, AuthFormParams } from "../../components/AuthForm";

const SignUp = () => {
  const handleSignUp = ({ email, password }: AuthFormParams) => {
    console.log(email, password);
  };

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


