import Cookies from 'js-cookie';
import { useNavigate  } from "react-router-dom";

function Logout() {
  const nav = useNavigate();

  // Goto Login on link click
  function gotoLogin() {
    nav('/login');
  }

  // Delete cookie to log out
  Cookies.remove('accessToken', { path: '' });
  Cookies.remove('refreshToken', { path: '' });

  //Jsx
  return (
    <>
      <h1>Logged Out</h1>
      <br/>
      <div className='btnBox'>
        <a href="#" onClick={gotoLogin}>Log In</a>
      </div>
    </>
  )
}

export default Logout