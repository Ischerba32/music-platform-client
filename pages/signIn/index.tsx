import { useContext, useEffect } from "react";
import { AuthForm, AuthFormParams } from "../../components/AuthForm";
import { StoreContext } from "../../context/storeContext";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { tracksStore, userStore } from "../../store/store";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  const handleSignIn = async (data: AuthFormParams) => {
  const role = await userStore.signIn(data);
  console.log(role);

  router.push('/' + (role === 'user' ? '' : role))
  };

  useEffect(() => {
    userStore.checkAuth().then(response => response && router.push('/'));
  }, [router])

  // const { tracksStore } = useContext(StoreContext);


  return (
    <AuthForm
      onSubmit={handleSignIn}
      formAction='SignIn'
      actionLink='/signUp'
      actionTitle='SignUp'
    />
  )
};

export default observer(SignIn);


// export const getServerSideProps = async () => {

// }