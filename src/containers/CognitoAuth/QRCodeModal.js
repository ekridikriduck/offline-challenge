import { Button, Modal } from "reactstrap";
import { QRCodeSVG } from "qrcode.react";
import { CustomInput } from "../../components";
import { useForm } from "../../hooks";
import { useState } from "react";
export const QRCodeModal = ({ isOpen, codeSrc, onSubmit, authUser }) => {
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
      await onSubmit(authUser, OTP);
    } catch (err) {
      setAuthErr(err.message);
      console.log("err", err.message);
    }
  };
  return (
    <Modal centered className="auth-modal" isOpen={isOpen}>
      <div className="auth-modal-title">Scan this QR Code to setup MFA</div>
      {authErr && (
        <span style={{ color: "red", lineHeight: "1rem" }}>{authErr}</span>
      )}
      <QRCodeSVG size={250} value={codeSrc} />
      <CustomInput
        label="Enter Auth Code"
        placeholder="Enter TOTP from Authenticator App"
        onChangeHandler={onChangeHandler}
        id="OTP"
        error={otpErr}
      />
      <Button onClick={onVerify} className="primary-btn">
        Submit
      </Button>
    </Modal>
  );
};
