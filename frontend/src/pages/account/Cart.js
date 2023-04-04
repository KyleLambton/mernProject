import { useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Nav from "../../components/Nav.js";
import Cookies from 'js-cookie';

import '../../css/table.css';

const tempCart = [];

function CartPage() {

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
      for (let i = 0; i < cart.length; i ++) {
        let cartInfo = await fetch('/Products/id/' + cart[i][0], { mode: 'cors' });
        let json = await cartInfo.json();

        tempCart.push([cart[i][0], json.name, json.image[0], cart[i][1], json.price]);

        setTotal(total + (cart[i][1] * json.price));
      }

      setCart(tempCart)
      setLoaded(true);
    }

    fetchData();
  }, []);

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
                <td className='qty'>{product[3]}</td>
              </tr>
          ))}
        </tbody>
      </table>
      <table>
        <tr>
          <td className='right'>Total:</td>
          <td className='price'>${total}</td>
        </tr>
      </table>
    </>
  )
}

export default CartPage;