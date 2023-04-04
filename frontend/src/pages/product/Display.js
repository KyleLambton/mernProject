import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate  } from "react-router-dom";
import '../../css/productGrid.css';
import Nav from "../../components/Nav.js";
import Cookies from 'js-cookie';

function addToCart (e) {
  let cart = JSON.parse(Cookies.get('cart'));

  //Check if item exists
  alert("Added to Cart!");
  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i][0] == e) {
      cart[i][1] += 1;
      found = true;
    }
  }
  if (found == false) cart.push([e, 1]);

  Cookies.set('cart', JSON.stringify( cart ));
}

function Display() {
  // nav set for page change
  const nav = useNavigate();

  // useState for database data to be stored
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  // useEffect to fetch data from backend only once on load
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('/Products/', { mode: 'cors' });

      const json = await response.json();

      if (response.ok) {
        setApiData(json);
      } else {
        setError(response.statusText);
      }
    }

    fetchData();
  }, []);

  const route = "http://localhost:4000/Products/Image/"

  function viewProduct (e) {
    nav('/Product/id/' + e);
  }

  //JSX
  return (
    <>
      <Nav />
      <h1>Products</h1>
      <br/>
      <div className="productsGrid">
        <h3 className="error">{error}</h3>
        {apiData && apiData.map((product) => (
          <>
            <div key={product._id} className="card">
              <h3 className="cardTitle">{product.name}</h3>
              <p>Brand: {product.brand}</p>
              <img src={"/Products/Image/" + product.image} alt="product image" className="cardImage"></img>
              <p className="price">Price: ${product.price}</p>
              <button onClick={() => addToCart(product._id)} type="button">Add To Cart</button>
              <button onClick={() => viewProduct(product._id)} type="button" className="button1">View</button>
            </div>
          </>
        ))}
      </div>
    </>
  )
};

export default Display;