import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../css/nav.css';

function totalItems(cartItems) {
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i][1];
  }

  return total;
}

function Nav() {

  // Check if logged in
  const auth = Cookies.get('sid');

  const [account, setAccount] = useState(null);
  const [loggedin, setLoggedin] = useState(false);
  const [cart, setCart] = useState(0);

  //Get Cart
  useEffect(() => {
    auth ? setLoggedin(true) : setLoggedin(false);
    let cartCheck = Cookies.get('cart');

    if (cartCheck == undefined) {
      Cookies.set('cart', JSON.stringify( [] ));
    } else {
      let num = totalItems(JSON.parse(cartCheck));
      setCart(num);
    }
  }, []);


  //is Account Logged in?
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

        <div className='navLink' style={{float: "right"}}><Link to="/Cart">Cart <i className="fa fa-shopping-cart" /> <p className='cartText'>{cart}</p></Link></div>
        {!loggedin && <div className='navLink' style={{float: "right"}}><Link to="/login">Sign In</Link></div>}
        {loggedin && <div className='navLink' style={{float: "right"}}><Link to="/logout">Sign Out</Link></div>}
        {account && <div className='navLink' style={{float: "right"}}><Link to="/myAccount">My Account</Link></div>}
      </nav>

      <Outlet />
    </>
  )
};

export default Nav;