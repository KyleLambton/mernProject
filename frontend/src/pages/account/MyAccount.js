import { useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Nav from "../../components/Nav.js";
import loader from "../../images/icons/loader.gif";

import "../../css/myAccount.css";

function MyAccount() {

  const [account, setAccount] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(()=> {
    const getAccount = async () => {
      let x = await fetch('/Accounts/getAccount');
      let json = await x.json();

      if (json != []) setAccount(json);
      setLoaded(true);
    }
    const getOrders = async () => {
      let x = await fetch('/Orders/account/' + account._id);
      let json = await x.json();

      if (json != []) setOrders(json);
    }

    getAccount();
    getOrders();
  }, []);

  //JSX
  return (
    <>
      <Nav />
      {loaded ? (<>
        <h1>Welcome Back {account.firstName}!</h1>
        <br/>
        <div className="account">
          <div className="accountPhoto">
            <img src={"/Accounts/getUserImage/" + account.id} className="accPhoto" />
          </div>
          <div className="accountInfo">
            <p>Name: {account.firstName}, {account.lastName}</p>
            <p>Date of Birth: {account.dob}</p>
            <p>Email: {account.email}</p>
            <p>Account Role: {account.role}</p>
            <p>Address: {account.address}</p>
            <p>City: {account.city}</p>
            <p>Country: {account.country}</p>
          </div>
        </div>
        <div className="ordersDiv">
          <h3>Orders</h3>
          {orders.map((x) => (
            <div className="order" key={x._id}>
              <p>Order ID: {x._id} Date: {x.date}</p>
            </div>
          ))}
        </div>
      </>) : (<img src={loader} className="medLoader"/>)}
    </>
  )
}

export default MyAccount;