import React from 'react';
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
 
const LoginRD = ({ children }) => {
  const jwt = Cookies.get('accessToken');
  var timer = new Date(new Date().getTime() + 15 * 60 * 1000);

  if (jwt != undefined) Cookies.set('accessToken', jwt, {expires: timer})

  return jwt ? children : <Navigate to='/login' />;
}
 
export default LoginRD;