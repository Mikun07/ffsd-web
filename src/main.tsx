import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { useInterceptor } from "./redux/api/axios.js";
import axiosInstance from "./redux/api/axios.js";

useInterceptor(axiosInstance, store);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store} >
        <App />
    </Provider>
);
