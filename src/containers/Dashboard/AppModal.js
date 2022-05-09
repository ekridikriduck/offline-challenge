import clx from "classnames";
import { Modal, Input, Button } from "reactstrap";
import { CustomInput } from "../../components";
import { useForm } from "../../hooks";

export const AppModal = ({ isOpen, onClose, onSaveApp }) => {
  const { onChangeHandler, values, errors, checkFormValidity } = useForm({
    appName: null,
    chain: null,
  });

  const { appName: appNameErr, chain: chainErr } = errors;
  const { appName, chain } = values;

  const onSave = () => {
    const isValid = checkFormValidity();
    if (!isValid) return;
    onSaveApp(appName, chain);
  };
  return (
    <Modal centered className="app-modal" isOpen={isOpen}>
      <div className="app-modal-title">Create New Application</div>
      <CustomInput
        id="appName"
        label="Application Name"
        placeholder="Enter App Name"
        error={appNameErr}
        onChangeHandler={onChangeHandler}
      />
      <div className="input-wrapper">
        <label>Select Chain</label>
        <Input
          id="chain"
          className={clx("text-input", chainErr && "error")}
          label="Select Chain"
          type="select"
          onChange={onChangeHandler}
        >
          <option value={null}></option>
          <option value="Etherium">Etherium</option>
          <option value="Solana">Solana</option>
          <option value="Polygon">Polygon</option>
        </Input>
        {chainErr && <span>{chainErr}</span>}
      </div>
      <div className="app-modal-cta">
        <Button onClick={onSave} className={clx("primary-btn", "clr-blue")}>
          Save
        </Button>
        <Button onClick={onClose} className={clx("primary-btn", "clr-transp")}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
