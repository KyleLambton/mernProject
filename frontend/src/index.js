// Created by Kyle Powell
// C0768550

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './helpers/LoginRD.js';

//Pages
import Login from './pages/account/Login.js';
import CreateAccount from './pages/account/CreateAccount.js';
import MyAccount from './pages/account/MyAccount.js';
import LogOut from './pages/account/Logout.js';
import Cart from './pages/account/Cart.js';

import ProductCreate from './pages/adminPages/Create.js';
import Update from './pages/adminPages/Update.js';

import Display from './pages/product/Display.js';
import ViewProduct from './pages/product/ViewProduct.js';
import NoPage from './pages/NoPage.js';

//AdminPages
import AdminLogin from './pages/adminPages/AdminLogin.js';

//Render Routes
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
          <Route index element={<PrivateRoute><Display /></PrivateRoute>} />
          <Route path='myAccount' element={<PrivateRoute><MyAccount /></PrivateRoute>} />
          <Route path='product/id/:id' element={<PrivateRoute><ViewProduct /></PrivateRoute>} />
          <Route path='cart' element={<Cart />} />
          <Route path='logout' element={<LogOut />} />
          <Route path='login' element={<Login />} />
          <Route path='createaccount' element={<CreateAccount />} />
          <Route path='admin'>
            <Route path='create' element={<ProductCreate />} />
          </Route>
          <Route path='*' element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);
