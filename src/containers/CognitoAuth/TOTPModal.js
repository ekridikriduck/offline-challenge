import { Button, Modal } from "reactstrap";
import { CustomInput } from "../../components";
import { useForm } from "../../hooks";
import { useState } from "react";

export const TOTPModal = ({ isOpen = true, onSubmit, onChange }) => {
  const { onChangeHandler, values, errors, checkFormValidity } = useForm({
    OTP: null,
  });
  const [authErr, setAuthErr] = useState(null);

  const { OTP: otpErr } = errors;
  const { OTP } = values;

  const onVerify = async () => {
    const isValid = checkFormValidity();
    if (!isValid) return;
    try {
      await onSubmit(OTP);
    } catch (err) {
      setAuthErr(err.message);
      console.log("err", err.message);
    }
  };
  return (
    <Modal centered className="auth-modal" isOpen={isOpen}>
      <div className="auth-modal-title">Enter TOTP Code</div>
      {authErr && (
        <span style={{ color: "red", lineHeight: "1rem" }}>{authErr}</span>
      )}
      <CustomInput
        placeholder="Enter Code"
        id="OTP"
        onChangeHandler={onChangeHandler}
        error={otpErr}
        // onChangeHandler={onChangeHandler}
      />
      <Button onClick={onVerify} className="primary-btn">
        Submit
      </Button>
    </Modal>
  );
};
