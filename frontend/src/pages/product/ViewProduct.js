import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../../css/productView.css';
import Nav from "../../components/Nav.js";

function addToCart (e) {
  alert('added to cart');
}

function addReviewForm(e) {
  document.getElementById("myForm").style.display = "block";
}

function closeReviewForm(e) {
  document.getElementById("myForm").style.display = "none";
}

function Display() {
  // nav set for page change
  const nav = useNavigate();

  // Get ID from params and set user
  const params = useParams();

  // useState for database data to be stored
  const [productData, setProductData] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [error, setError] = useState(null);
  const [review, setReview] = useState(false);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  // useEffect to fetch data from backend only once on load
  useEffect(() => {
    const fetchData = async () => {
      //product data
      let response = await fetch('/Products/id/' + params.id);
      let json = await response.json();

      if (response.ok) {
        setProductData(json);
      } else {
        setError(response.statusText);
      }

      //review data
      response = await fetch('/Products/getreviews/' + params.id);
      json = await response.json();

      if (response.ok) {
        setReviewData(json);
        if (json.length > 0) setReview(true);
      } else {
        setError(response.statusText);
      }
    }

    fetchData();
  }, []);

  // post review func
  const handleSubmit = async (e) => {
    let itemId = params.id;
    let userName = "test";
    let x = document.getElementById("rating");
    setRating(x.value);
    const newReview = {itemId, userName, rating, comment};

    const response = await fetch('/Products/addreview', {
      method: 'POST',
      body: JSON.stringify(newReview),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status == 201) {
      alert('Thank you for your feedback!');
    } else {
      alert('Something went wrong. Please try again later.')
    }
    window.location.reload(); 
  }

  const route = "http://localhost:4000/Products/Image/"

  //JSX
  return (
    <>
      <Nav />
      <br/>

      <div className="product">
        <h3 className="error">{error}</h3>
        {productData && 
          <>
            <div className="productImageDiv">
              <img src={"/Products/Image/" + productData.image} alt="product image" className="productImage"></img>
              <div className="productGallary"></div>
            </div>

            <div className="productInfoDiv">
              <h1 className="title">{productData.name}</h1>
              <div className="description">
                <p>
                  Brand: {productData.brand} <br />
                  SKU: {productData.sku} <br />
                  Rating: {productData.rating}/5.0 <br />
                  Department: {productData.department} <br />
                  Stock: {productData.stock}
                </p>
                <p className="price">Price: ${productData.price}</p>
              </div>
              <button onClick={(e) => addToCart(e)} type="button" className="addCartButton">Add To Cart</button>
            </div>

            <div className="clear"></div> <br/> <br/>

            <div className="extras">
              <div className="extendedInfo">
                <div className="centerDiv">
                  <h2>Features</h2>
                  <ul>
                    {productData.features && productData.features.map((x, index) => (
                        <li key={"feat" + index}>{x}</li>
                      ))}
                  </ul>
                  <h2>Specifications</h2>
                  <ul>
                    {productData.specifications && productData.specifications.map((x, index) => (
                      <li key={"spec" + index}>{x[0] + " " + x[1]}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="reviewsDiv">
                <h2 className="center">Reviews:</h2>
                {review === false && <p className="center">No Reviews Yet.</p>}
                {reviewData && reviewData.map((x) => (
                  <div className="reviewCard" key={x._id}>
                    <div className="reviewHeader">
                      <h3>{x.userName}</h3>
                      <p>Rating: {x.rating}/5.0</p>
                    </div>
                    <div className="reviewBody"><p>{x.comment}</p></div>
                  </div>
                ))}
                <button onClick={(e) => addReviewForm(e)} type="button" className="addReviewButton">Add a Review</button>
                <div className="form-popup" id="myForm">
                  <form className="form-container">
                    <h1>Add Review</h1>

                    <label>Rating:</label>
                    <select name="rating" id="rating" onChange={(e) => setRating(e.target.value)}>
                      <option value={5}>5</option>
                      <option value={4}>4</option>
                      <option value={3}>3</option>
                      <option value={2}>2</option>
                      <option value={1}>1</option>
                    </select><br /><br />

                    <label>Comment:</label>
                    <textarea onChange={(e) => setComment(e.target.value)} value={comment} /><br /><br />

                    <button onClick={(e) => handleSubmit(e)} type="button" className="btn">Submit</button>
                    <button onClick={(e) => closeReviewForm(e)} type="button" className="addReviewButton">Close</button>
                  </form>
              </div>
              </div>
            </div>
            <div className="clear"></div> <br/>
          </>
        }
      </div>
    </>
  )
};

export default Display;