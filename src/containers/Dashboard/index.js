import { useState, useMemo, useEffect, useCallback } from "react";
import { Auth } from "aws-amplify";
import { UncontrolledTooltip } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { AppModal } from "./AppModal";
import { AppViewModal } from "./AppViewModal";
import { listApplications, createApplication } from "../../api";
import { Loader } from "../../components";

export const Dashboard = () => {
  const [modalOpen, toggleModal] = useState(false);
  const [appList, setAppList] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const listUserApps = useCallback(async () => {
    const apps = await listApplications();
    setAppList(apps);
    setLoading(false);
  }, []);

  useEffect(() => {
    listUserApps();
  }, [listUserApps]);

  const children = useMemo(() => {
    if (loading) return <Loader />;
    return appList.length > 0 ? (
      appList.map((elm, idx) => {
        const { appName, chain } = elm;
        return (
          <AppCard
            onClick={() => {
              setSelectedApp(idx);
            }}
            key={idx}
            appName={appName}
            chain={chain}
          />
        );
      })
    ) : (
      <div className="empty-state">
        <div className="empty-state-title">No Application Found</div>
        <div className="empty-state-sub">
          {`Let's get you started!`}{" "}
          <span onClick={() => toggleModal(true)}>Click here</span> to begin.
        </div>
      </div>
    );
  }, [appList, loading]);

  const onSaveApp = async (appName, chain) => {
    try {
      await createApplication({ appName, chain });
      await listUserApps();
    } catch (err) {
      console.log(err);
    } finally {
      toggleModal(false);
    }
  };

  const onSignOut = async () => {
    await Auth.signOut();
    navigate("/");
  };

  return (
    <div className="dash-wrapper">
      <div className="main-header">
        <div>
          MetaKeep <br /> <span>Developer Console</span>
        </div>
        <GoSignOut onClick={onSignOut} id="signout" />
        <UncontrolledTooltip target="signout" className="modal-tooltip">
          Sign Out
        </UncontrolledTooltip>
      </div>
      <div className="dash-content">
        <div className="sidebar-wrapper">
          <div className="sidebar-content">
            <div className="sidebar-item">
              <span onClick={() => toggleModal(true)}>
                Create New Application +
              </span>
            </div>
          </div>
        </div>
        <div className="main-wrapper">
          <div
            style={{ height: appList.length ? "unset" : "100%" }}
            className="main-content"
          >
            {children}
          </div>
        </div>
      </div>
      {modalOpen && (
        <AppModal
          onClose={() => toggleModal(false)}
          isOpen={modalOpen}
          onSaveApp={onSaveApp}
        />
      )}
      {selectedApp !== null && (
        <AppViewModal
          isOpen={selectedApp !== null}
          selectedApp={appList[selectedApp]}
          onClose={() => {
            setSelectedApp(null);
          }}
        />
      )}
    </div>
  );
};

const AppIcon = {
  Etherium: "/eth-icon.png",
  Solana: "/sol-icon.png",
  Polygon: "/polygon.svg",
};

const AppCard = ({ appName, chain, onClick }) => {
  return (
    <div onClick={onClick} className="app-card">
      <div className="app-card-img">
        <img src={AppIcon[chain]} alt="" />
      </div>
      <div className="app-desc">
        <div className="app-name">Name: {appName}</div>
        <div className="app-chain">
          Chain: <span>{chain}</span>
        </div>
      </div>
    </div>
  );
};
