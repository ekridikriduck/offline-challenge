import { CustomInput } from "../../components";
import { Button } from "reactstrap";
import { useForm } from "../../hooks";
import { useState } from "react";
import { QRCodeModal } from "./QRCodeModal";

export const SignupForm = ({
  switchForm,
  setupTOTP,
  signInUser,
  awsSignUp,
  onSubmit,
  // setUser,
}) => {
  const { onChangeHandler, values, errors, checkFormValidity } = useForm({
    username: null,
    password: null,
  });
  const [codeSrc, setCodeSrc] = useState(null);
  const [showModal, toggleModal] = useState(false);
  const [authUser, setUser] = useState(null);
  const [authErr, setAuthErr] = useState(null);

  const { username: nameErr, password: passErr } = errors;

  const onSignUp = async () => {
    try {
      const isValid = checkFormValidity();
      if (!isValid) return;
      const { username, password } = values;
      await awsSignUp(username, password);
      const loggedInUser = await signInUser(username, password);
      setUser(loggedInUser);
      const codeSrc = await setupTOTP(loggedInUser);
      setCodeSrc(codeSrc);
      toggleModal(true);
    } catch (err) {
      console.log(err);
      setAuthErr(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="mb-3">Register</h1>
      <CustomInput
        placeholder="Username"
        label="Username"
        id="username"
        error={nameErr}
        onChangeHandler={onChangeHandler}
      />
      <CustomInput
        placeholder="Password"
        label="Password"
        id="password"
        type="password"
        error={passErr}
        onChangeHandler={onChangeHandler}
      />
      <div className="auth-btn">
        {authErr && <span className="auth-err">{authErr}</span>}
        <Button onClick={onSignUp} className="primary-btn">
          Register
        </Button>
      </div>
      <div className="auth-lnk">
        Already have an account?{" "}
        <span onClick={() => switchForm("SIGN_IN")}>Sign In Here</span>
      </div>
      {codeSrc && showModal && (
        <QRCodeModal
          isOpen={showModal}
          codeSrc={codeSrc}
          onSubmit={onSubmit}
          authUser={authUser}
        />
      )}
    </div>
  );
};
