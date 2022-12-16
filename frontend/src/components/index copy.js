import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/nav.js';

//Pages
import Login from './pages/Login.js';
import CreateAccount from './pages/CreateAccount.js';
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
        <Route index element={<Display />} />
        <Route path='create' element={<Create />} />
        <Route path=':id' element={<Update />}>
          <Route path=':id' element={<Update />} />
          <Route path='id' element={<Update />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='createaccount' element={<CreateAccount />} />
        <Route path='*' element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
