// Created by Kyle Powell
// C0768550

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/nav.js';
import PrivateRoute from './helpers/LoginRD.js';

//Pages
import Login from './pages/Login.js';
import CreateAccount from './pages/CreateAccount.js';
import LogOut from './pages/Logout.js';
import Create from './pages/Create.js';
import Display from './pages/Display.js';
import Update from './pages/Update.js';
import NoPage from './pages/NoPage.js';

//Render Routes
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Nav />}>
          <Route index element={<PrivateRoute><Display /></PrivateRoute>} />
          <Route path='create' element={<PrivateRoute><Create /></PrivateRoute>} />
          <Route path=':id' element={<PrivateRoute><Update /></PrivateRoute>}>
            <Route path=':id' element={<PrivateRoute><Update /></PrivateRoute>} />
            <Route path='id' element={<PrivateRoute><Update /></PrivateRoute>} />
          </Route>
          <Route path='logOut' element={<LogOut />} />
          <Route path='login' element={<Login />} />
          <Route path='createaccount' element={<CreateAccount />} />
          <Route path='*' element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
