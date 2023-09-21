import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CssBaseline} from "@mui/material";
import {store} from "./redux/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GlobalStyles = () => (
    <style>
        {`
      body {
        background-color: #181a2a;
      }
    `}
    </style>
);
root.render(
    <>
        <CssBaseline/>
        <GlobalStyles />
        <Provider store={store}>
        <App />
        </Provider>

    </>
);
