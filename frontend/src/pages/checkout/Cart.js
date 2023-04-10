import { useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Nav from "../../components/Nav.js";
import Cookies from 'js-cookie';

import '../../css/table.css';

const tempCart = [];

function CartPage() {
  const nav = useNavigate();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0.00);
  const [loaded, setLoaded] = useState(false);

  //Get Cart Data
  useEffect(() => {
    let cart = JSON.parse(Cookies.get('cart'));
    setCart(cart);

    //fetech info
    const fetchData = async () => {
      tempCart.length = 0;
      let price = 0;
      for (let i = 0; i < cart.length; i ++) {
        let cartInfo = await fetch('/Products/id/' + cart[i][0], { mode: 'cors' });
        let json = await cartInfo.json();

        tempCart.push([cart[i][0], json.name, json.image[0], cart[i][1], json.price]);
        price += json.price;
      }

      setCart(tempCart);
      setTotal(price);
      setLoaded(true);
    }

    fetchData();
  }, []);

  //Add Remove Funcs
  function getTotalPrice() {
    let price = 0;
    for (let i = 0; i < cart.length; i ++) {
      price += cart[i][4] * cart[i][3];
    }
    setTotal(price);
  }
  function minus(n) {
    if (tempCart[n][3] > 0) tempCart[n][3]--;
    getTotalPrice();
  }
  function plus(n) {
    tempCart[n][3]++;
    getTotalPrice();
  }
  function next() {
    let tempCart = [];
    for (let i = 0; i < cart.length; i ++) {
      tempCart.push([cart[i][0], cart[i][3]]);
    }
    Cookies.set('cart', JSON.stringify( tempCart ));
    nav('/checkout')
  }
  function clearCart() {
    setCart([]);
    getTotalPrice();
  }

  //JSX
  return (
    <>
      <Nav />
      <h1>Your Cart</h1>
      <br/>
      {!loaded && <p>Loading...</p>}
      <table>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
        </tr>
        <tbody>
          {loaded && cart.map((product, i) => (
              <tr key={i}>
                <td className='tableDesc'>
                  <div className='descDiv'>
                    <img src={"/Products/Image/" + product[2]} className='cartImage' />
                    <p className='cartTitle'>{product[1]}</p>
                  </div>
                </td>
                <td className='price'>{product[4]}</td>
                <td className='qty'>
                  <button onClick={() => minus(i)} type="button" className='qtyButton'>-</button>
                  {product[3]}
                  <button onClick={() => plus(i)} type="button" className='qtyButton'>+</button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
      <table>
        {loaded &&
          <>
            <tr>
              <td className='right'>Sub Total:</td>
              <td className='price right'>${Math.round(total * 100)/100}</td>
            </tr>
            <tr>
              <td className='right'>Tax:</td>
              <td className='price right'>${Math.round(total * 0.13 * 100)/100}</td>
            </tr>
            <tr>
              <td className='right'>Total:</td>
              <td className='price right'>${Math.round(total * 1.13 * 100)/100}</td>
            </tr>
          </>
      }
      </table>
      <div className='buttons'>
        <input onClick={() => next()} value="Continue to checkout" className="btn" />
        <input onClick={() => clearCart()} value="Clear Cart" className="btn" />
      </div>
    </>
  )
}

export default CartPage;