import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Amplify from "aws-amplify";
import { APP_REGION, POOL_ID, CLINET_ID } from "./constants";

Amplify.configure({
  Auth: {
    region: APP_REGION,
    identityPoolRegion: APP_REGION,
    userPoolId: POOL_ID,
    userPoolWebClientId: CLINET_ID,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
