import Cookies from 'js-cookie';
import { useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from "../../components/Nav.js";

function Logout() {
  const nav = useNavigate();

  // Goto Login on link click
  function gotoLogin() {
    nav('/login');
  }

  const [navBar, setNavBar] = useState(<Nav/>);

  // Delete cookie to log out
  useEffect( () => {
    const logout = async () => {
      await fetch('/Accounts/logout', { method: "GET" });
      Cookies.remove('sid', { path: '/' });
      setNavBar(<Nav/>);
    }

    logout();
  }, []);

  //Jsx
  return (
    <>
      {navBar}
      <h1>Logged Out</h1>
      <br/>
      <div className='btnBox'>
        <a href="#" onClick={gotoLogin}>Log In</a>
      </div>
    </>
  )
}

export default Logout