import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { ReactQueryProvider } from './lib/react-query';
import { AuthProvider } from './lib/auth';
import { initMock } from "./mock";
import { render } from "react-dom";


import { BrowserRouter } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";


serviceWorker.unregister();

/** 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);*/
function Application() {
  return (
    <BrowserRouter>
    <App />
  </BrowserRouter>
    // <ReactQueryProvider>
    //   <AuthProvider>
    //     <App />
    //   </AuthProvider>
    // </ReactQueryProvider>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
const rootElement = document.getElementById("root");
initMock.then(() => {
  render(<Application />, rootElement);
});