import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../css/nav.css';

function Nav() {
  // Check if logged in
  const auth = Cookies.get('sid');
  const loggedin =  auth ? true : false;

  const [account, setAccount] = useState(null);
  const cart = [];

  useEffect(() => {
    const getAccount = async () => {
      let response = await fetch('/Accounts/auth');
      let json = await response.json();

      if (json != []) setAccount(json);
    }

    getAccount();
  }, []);

  return (
    <>
      <nav className='topnav'>
        <div className='navLink'><Link to="/">Products</Link></div>
        <div className='navLink'><Link to="/create">On Sale</Link></div>
        <div className='navLink'><Link to="/create">Find Store</Link></div>

        <div className='navLink' style={{float: "right"}}><Link to="/Cart">Cart <i className="fa fa-shopping-cart" /></Link></div>
        {!loggedin && <div className='navLink' style={{float: "right"}}><Link to="/login">Sign In</Link></div>}
        {loggedin && <div className='navLink' style={{float: "right"}}><Link to="/logout">Sign Out</Link></div>}
        {account && <div className='navLink' style={{float: "right"}}><Link to="/myAccount">My Account</Link></div>}
      </nav>

      <Outlet />
    </>
  )
};

export default Nav;