import clx from "classnames";
import { Modal, Button, UncontrolledTooltip } from "reactstrap";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
export const AppViewModal = ({ isOpen, onClose, selectedApp }) => {
  const { appName, chain, appID, appSecret } = selectedApp;

  const [copied, setCopied] = useState(false);
  const onCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <Modal centered className="app-modal" isOpen={isOpen}>
      <div className="app-modal-title">{appName}</div>
      <div className="app-modal-desc">
        AppId : <span>{appID} </span>
        <FiCopy
          onClick={() => {
            onCopy(appSecret);
          }}
          id="appId"
        />
        <UncontrolledTooltip className="modal-tooltip" target="appId">
          {copied ? "Copied" : "Copy"}
        </UncontrolledTooltip>
      </div>
      <div className="app-modal-desc">
        App Secret : <span>{appSecret}</span>
        <FiCopy
          onClick={() => {
            onCopy(appSecret);
          }}
          id="appSec"
        />
        <UncontrolledTooltip className="modal-tooltip" target="appSec">
          {copied ? "Copied" : "Copy"}
        </UncontrolledTooltip>
      </div>
      <div className="app-modal-desc">
        Chain :<span> {chain}</span>
      </div>
      <div className="app-modal-cta">
        <Button onClick={onClose} className={clx("primary-btn", "clr-transp")}>
          Close
        </Button>
      </div>
    </Modal>
  );
};
