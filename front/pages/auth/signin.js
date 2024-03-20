// import SignInFormByCredentials from "features/authentication/comps/auth/sign_in_form_by_credentials";
// import SignFormByServices from "features/authentication/comps/auth/sign_form_by_services";
// import VerticalSplitter from "features/authentication/comps/auth/vertical_splitter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserAlreadySignedIn from "comps/modals/auth/already_signed_in";
import { getServerSession } from "next-auth";

//todo make redisign

const toggle = () => {};
const toggleSignUpModal = () => {};
const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  //todo check if session, redirect if it is

  // if (typeof window === "undefined") return <></>;

  if (session) {
    return <UserAlreadySignedIn />;
  } else {
    return (
      <div className="w-50 h-50">
        {/* <div className="">
          <SignInFormByCredentials
            toggleModal={toggle}
            toggleSignUpModal={toggleSignUpModal}
          />

          <VerticalSplitter />

          <SignFormByServices />
        </div> */}
      </div>
    );
  }
};

export default SignIn;
