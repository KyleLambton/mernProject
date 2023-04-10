import { useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Nav from "../../components/Nav.js";
import Cookies from 'js-cookie';

import '../../css/checkout.css';

const tempCart = [];

function Checkout() {

  const nav = useNavigate();

  const [error, setError] = useState('');
  const [account, setAccount] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [cart, setCart] = useState(null);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [postal, setPostal] = useState('');

  useEffect(() => {
    let cart = JSON.parse(Cookies.get('cart'));
    setCart(cart);
    
    // Fetch account details
    const getAccount = async () => {
      let x = await fetch('/Accounts/getAccount');
      let json = await x.json();
      
      setAccount(json);

      setAddress(account.address);
      setCity(account.city);
      setProvince(account.province);
      setCountry(account.country);
      setPostal(account.postal)

      setLoaded(true); 
    }

    getAccount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(account)
    let d = new Date();
    const newOrder = {
      account: account.id,
      date: d,
      address: account.address,
      country: account.country,
      province: account.province,
      city: account.city,
      postal: account.postal,
      paymentType: 'MasterCard',
      accountNo: document.getElementById('ccnum').value,
      products: cart,
      status: 'received',
      tarckingNo: 'n/a'
    }
    console.log(newOrder)
    const response = await fetch('/Orders/createOrder', {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (response.status === 201) {
      alert('Order Placed!');
      //nav('/');
    } else {
      alert("some error");
    }

  }

  return (
    <>
      <Nav />
      {loaded &&
        <div className="row">
          <div className="col-75">
            <div className="container">
              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-50">
                    <h3>Payment</h3>
                    <label>Accepted Cards</label>
                    <div className="icon-container">
                      <i className="fa fa-cc-visa"></i>
                      <i className="fa fa-cc-amex"></i>
                      <i className="fa fa-cc-mastercard"></i>
                      <i className="fa fa-cc-discover"></i>
                    </div>
                    <label>Name on Card</label>
                    <input type="text" id="cname" name="cardname" placeholder="John More Doe" />

                    <label>Credit card number</label>
                    <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />

                    <label>Exp Month</label>
                    <input type="text" id="expmonth" name="expmonth" placeholder="September" />

                    <div className="row">
                      <div className="col-50">
                        <label>Exp Year</label>
                        <input type="text" id="expyear" name="expyear" placeholder="2018" />
                      </div>
                      <div className="col-50">
                        <label>CVV</label>
                        <input type="text" id="cvv" name="cvv" placeholder="352" />
                      </div>
                    </div>
                  </div>

                </div>
                <label>
                  {/*<input type="checkbox" checked="checked" name="sameadr"> Shipping address same as billing</input> */}
                </label>
                <input type="submit" value="Continue to checkout" className="btn" />
              </form>
            </div>
          </div>
        </div>
      }
    </>
  );
}
  
export default Checkout;