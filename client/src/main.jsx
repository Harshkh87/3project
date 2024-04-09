import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoReducer from "./redux/redux-reducer/reducer.js";
// import store from './redux/redux-store/store.js';

const store = createStore(todoReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ColorModeSwitcher justifySelf="flex-end" />
          <App />
          
        </BrowserRouter>
        </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
