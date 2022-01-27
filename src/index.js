import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const appConfig = {
  accountSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXX",
  flexFlowSid: "FOXXXXXXXXXXXXXXXXXXXXXXXXXX",
}

ReactDOM.render(
  <App configuration={appConfig} />,
  document.getElementById("root")
);

registerServiceWorker();
