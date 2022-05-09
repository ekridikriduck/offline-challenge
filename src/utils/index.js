import validator from "password-validator";

const passSchema = new validator();

const otpSchema = new validator();

const userSchema = new validator();

userSchema
  .has()
  .not()
  .spaces(0, "Username cannot have spaces")
  .is()
  .min(3, "Username should have atleast 3 characters");

passSchema
  .is()
  .min(8, "Password should have minimum 8 characters")
  .has()
  .symbols(1, "Password must contain atleast one symbol.");

otpSchema
  .has()
  .not()
  .letters(0, "Must not contain letters")
  .is()
  .min(6, "OTP should be 6 digits long")
  .is()
  .max(6, "OTP cannot be more than 6 digits");

export const validate = (name, value) => {
  const errors = {};
  switch (name) {
    case "username":
      errors.username =
        userSchema.validate(value, { details: true })[0]?.message || null;
      break;
    case "password":
      errors.password =
        passSchema.validate(value, { details: true })[0]?.message || null;
      break;
    case "appName":
      if (!value) errors.appName = "Application Name is required";
      else errors.appName = null;
      break;
    case "OTP":
      errors.OTP =
        otpSchema.validate(value, { details: true })[0]?.message || null;
      break;
    default:
      if (!value) errors[name] = `${name} is required`;
      else errors[name] = null;
      break;
  }
  return errors;
};

export const generateUUID = () => {
  var d = new Date().getTime();

  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now();
  }

  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );

  return uuid;
};
