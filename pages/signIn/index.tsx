import { useContext, useEffect } from "react";
import { AuthForm, AuthFormParams } from "../../components/AuthForm";
import { StoreContext } from "../../context/storeContext";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { tracksStore, userStore } from "../../store/store";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  const handleSignIn = (data: AuthFormParams) => {
  userStore.signIn(data);
  router.push('/')
  };

  useEffect(() => {
    userStore.checkAuth().then(response => response && router.push('/'));
  }, [router])

  // const { tracksStore } = useContext(StoreContext);

  // console.log(toJS(tracksStore.tracks));
  // console.log('tracks: ', tracks);

  // useEffect(() => {
  //   tracksStore.tracks = tracks;
  // }, [tracks])

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
//   const tracks = await tracksStore.fetchTracks();

//   return {
//     props: {
//       tracks
//     },
//   }
// }