import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MoralisProvider } from "react-moralis";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <MoralisProvider appId="MBZTSN0ONkw9QS8w5qAUInFVdB4wMXQ2PadPnoxy" serverUrl="https://jcxasaisvaxc.grandmoralis.com:2053/server">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </MoralisProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
