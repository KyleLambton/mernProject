import { useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Nav from "../../components/Nav.js";

function cartPage() {


  //JSX
  return (
    <>
      <Nav />
      <h1>Your Cart</h1>
      <br/>
      <p>Display cart contents in table perhaps?</p>
    </>
  )
}

export default cartPage;