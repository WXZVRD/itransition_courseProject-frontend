import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CssBaseline} from "@mui/material";
import {store} from "./redux/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <CssBaseline/>
        <Provider store={store}>
        <App />
        </Provider>

    </>
);
