import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/RootReducer'
import App from './App.js';
import LoginForm from './components/login_form/LoginForm.js';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <Routes>
          <Route path="/dashboard" element={<App />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);