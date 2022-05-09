import { useState } from "react";
import { validate } from "../utils";

export const useForm = (formConfig) => {
  const [values, setValues] = useState(() => {
    return { ...formConfig };
  });
  const [errors, setErrors] = useState(() => {
    return { ...formConfig };
  });

  const validateFields = (name, value) => {
    const errorsOb = validate(name, value);
    setErrors((prevState) => {
      return {
        ...prevState,
        ...errorsOb,
      };
    });
    return Object.values(errorsOb).filter(Boolean).length === 0;
  };

  const onChangeHandler = (evt) => {
    const { id, value } = evt.target;
    // console.log(id, value);
    validateFields(id, value);
    setValues((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };

  const checkFormValidity = () => {
    const formKeyValues = Object.keys(values);
    const isValid = formKeyValues.map((elm) => {
      return validateFields(elm, values[elm]);
    });

    return isValid.filter(Boolean).length === formKeyValues.length;
  };

  return {
    onChangeHandler,
    errors,
    values,
    checkFormValidity,
  };
};
