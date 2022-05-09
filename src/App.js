import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CognitoAuth, Dashboard } from "./containers";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { Loader } from "./components";
function App() {
  const navigate = useNavigate();
  const [checkingAuth, setAuthStatus] = useState(true);

  const getCurrentSession = useCallback(async () => {
    try {
      const { jwtToken } = (await Auth.currentSession()).getAccessToken();
      localStorage.setItem("token", jwtToken);
      setAuthStatus(false);
      navigate("/dashboard");
    } catch (err) {
      setAuthStatus(false);
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    getCurrentSession();
  }, [getCurrentSession]);

  if (checkingAuth) return <Loader />;
  return (
    <Routes>
      <Route exact path="/" element={<CognitoAuth />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
