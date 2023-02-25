import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate  } from "react-router-dom";
import '../../css/productGrid.css';
import Nav from "../../components/Nav.js";

function addToCart (e) {
  alert('added to cart');
  e.stopPropagation();
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
            <div key={product._id} className="card" onClick={() => viewProduct(product._id)} >
              <h3 className="cardTitle">{product.name}</h3>
              <p>Brand: {product.brand}</p>
              <img src={"/Products/Image/" + product.image} alt="product image" className="cardImage"></img>
              <p className="price">Price: ${product.price}</p>
              <button onClick={(e) => addToCart(e)} type="button">Add To Cart</button>
            </div>
          </>
        ))}
      </div>
    </>
  )
};

export default Display;