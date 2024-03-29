import { Outlet, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../css/nav.css';

function Nav() {
  // Check if logged in
  const auth = Cookies.get('sid');
  const loggedin =  auth ? true : false;

  return (
    <>
      <nav className='topnav'>
        <div className='navLink'><Link to="/">Products</Link></div>
        <div className='navLink'><Link to="/create">Create Product</Link></div>

        <div className='navLink' style={{float: "right"}}><Link to="/Cart">Cart <i className="fa fa-shopping-cart" /></Link></div>
        {!loggedin && <div className='navLink' style={{float: "right"}}><Link to="/login">Sign In</Link></div>}
        {loggedin && <div className='navLink' style={{float: "right"}}><Link to="/logout">Sign Out</Link></div>}
        {loggedin && <div className='navLink' style={{float: "right"}}><Link to="/logout">My Account</Link></div>}
      </nav>

      <Outlet />
    </>
  )
};

export default Nav;