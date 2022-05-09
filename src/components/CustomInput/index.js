import { useState } from "react";
import clx from "classnames";
import { Input } from "reactstrap";
import styles from "./index.module.scss";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export const CustomInput = ({
  type = "text",
  onChangeHandler,
  customCss,
  placeholder = "",
  label,
  id,
  error = null,
}) => {
  const [showPass, toggle] = useState(false);
  return (
    <div className={styles.inputWrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      <Input
        id={id}
        placeholder={placeholder}
        type={type === "password" && showPass ? "text" : type}
        onChange={onChangeHandler}
        className={clx(
          styles.textInput,
          customCss && customCss,
          error && styles.error
        )}
        required
      />
      {type === "password" && (
        <div
          onClick={() => {
            toggle((prevState) => !prevState);
          }}
          className={styles.eyeIcon}
        >
          {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      )}
      {error && <span>{error}</span>}
    </div>
  );
};
