import { Routes, Route } from "react-router-dom";
import { CognitoAuth, Dashboard } from "./containers";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<CognitoAuth />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
