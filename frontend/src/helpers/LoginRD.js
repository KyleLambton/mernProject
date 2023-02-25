import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
 
const LoginRD = ({ children }) => {
  let auth = Cookies.get('sid');
  var timer = new Date(new Date().getTime() + 30 * 60 * 1000);

  if (auth != undefined) Cookies.set('sid', auth, {expires: timer});

  console.log(auth)

  return auth ? children : <Navigate to='/login' />;
}
 
export default LoginRD;