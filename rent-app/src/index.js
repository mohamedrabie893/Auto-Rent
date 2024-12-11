import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router";
import Root from './Components/Root';
import Home from './Components/Home';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import AddRentForm from './Components/AddRentForm';
import RentList from './Components/RentList';
import UserRents from './Components/UserRents';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          {/* renders into the outlet in <Root> at "/" */}
          <Route index element={<Home />} />

          <Route path="/add-rent" element={<AddRentForm />} />
          <Route path="/rents" element={<RentList />} />
          <Route path="/my-rents" element={<UserRents />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
