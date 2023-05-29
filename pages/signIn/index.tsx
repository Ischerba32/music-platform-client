import { useContext, useEffect, useState } from "react";
import { AuthForm, AuthFormParams } from "../../components/AuthForm";
import { StoreContext } from "../../context/storeContext";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { tracksStore, userStore } from "../../store/store";
import { useRouter } from "next/router";

const SignIn = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (data: AuthFormParams) => {
    try {
      const role = await userStore.signIn(data);
      router.push('/' + (role === 'user' ? '' : role))

    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    userStore.checkAuth().then(response => response && router.push('/'));
  }, [router])

  return (
    <AuthForm
      onSubmit={handleSignIn}
      formAction='SignIn'
      actionLink='/signUp'
      actionTitle='SignUp'
      error={error}
      setError={setError}
    />
  )
};

export default observer(SignIn);


// export const getServerSideProps = async () => {

// }