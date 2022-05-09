import { Auth } from "aws-amplify";
import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SigninForm } from "./Signin";
import { SignupForm } from "./SignUp";

export const CognitoAuth = () => {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState("SIGN_IN");

  const awsSignUp = async (username, password) => {
    const { user } = await Auth.signUp({ username, password });
    return user;
  };

  const setupTOTP = async (user) => {
    const code = await Auth.setupTOTP(user);
    const { username } = user;
    const codeSrc =
      "otpauth://totp/AWSCognito:" +
      username +
      "?secret=" +
      code +
      "&issuer=Passbird";
    return codeSrc;
  };

  const confirmSignin = useCallback(
    async (user, code) => {
      await Auth.confirmSignIn(user, code, "SOFTWARE_TOKEN_MFA");
      navigate("/dashboard");
    },
    [navigate]
  );

  const signInUser = async (username, password) => {
    const user = await Auth.signIn(username, password);
    return user;
  };

  const onSubmit = useCallback(
    async (authUser, otp) => {
      await Auth.verifyTotpToken(authUser, otp);
      await Auth.setPreferredMFA(authUser, "TOTP");
      navigate("/dashboard");
    },
    [navigate]
  );

  const children = useMemo(() => {
    return currentForm === "SIGN_IN" ? (
      <SigninForm
        switchForm={setCurrentForm}
        signInUser={signInUser}
        confirmSignin={confirmSignin}
      />
    ) : (
      <SignupForm
        switchForm={setCurrentForm}
        awsSignUp={awsSignUp}
        signInUser={signInUser}
        setupTOTP={setupTOTP}
        onSubmit={onSubmit}
      />
    );
  }, [confirmSignin, currentForm, onSubmit]);

  return (
    <div className="auth-wrapper">
      <div className="auth-title">
        MetaKeep <br />
        <span>Developer Console</span>
      </div>
      {children}
    </div>
  );
};
