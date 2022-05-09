import { useState } from "react";
import { CustomInput } from "../../components";
import { Button } from "reactstrap";
import { useForm } from "../../hooks";
import { TOTPModal } from "./TOTPModal";

export const SigninForm = ({ switchForm, signInUser, confirmSignin }) => {
  const [modalOpen, toggleModal] = useState(false);
  const [currentUser, setUser] = useState(null);
  const [authErr, setAuthErr] = useState(null);

  const { onChangeHandler, values, errors, checkFormValidity } = useForm({
    username: null,
    password: null,
  });

  const { username: nameErr, password: passErr } = errors;
  const { username, password } = values;

  const onLoginClick = async () => {
    const isValid = checkFormValidity();
    if (!isValid) return;
    try {
      const user = await signInUser(username, password);
      setUser(user);
      toggleModal(true);
    } catch (err) {
      setAuthErr(err.message);
    }
  };

  const onSubmit = async (otp) => {
    await confirmSignin(currentUser, otp);
  };

  return (
    <div className="auth-container">
      <h1 className="mb-3">Login</h1>
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
        <Button onClick={onLoginClick} className="primary-btn">
          Login
        </Button>
      </div>
      <div className="auth-lnk">
        Dont have an account?{" "}
        <span onClick={() => switchForm("SIGN_UP")}>Sign Up Here</span>
      </div>
      {modalOpen && <TOTPModal isOpen={modalOpen} onSubmit={onSubmit} />}
    </div>
  );
};
