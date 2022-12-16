import { Outlet, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import '../css/nav.css';

const nav = () => {
  // Check if logged in
  const jwt = Cookies.get('accessToken');
  const loggedin =  jwt ? true : false;

  return (
    <>
      <nav className='topnav'>
        <div className='navLink'><Link to="/">View List</Link></div>
        <div className='navLink'><Link to="/create">Create</Link></div>
        <div className='navLink'><Link to="/LogOut">Log Out</Link></div>    
      </nav>

      <Outlet />
    </>
  )
};

export default nav;
