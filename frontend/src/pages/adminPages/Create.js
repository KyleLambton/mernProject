import { useState } from 'react';
import { useNavigate  } from "react-router-dom";
import '../../css/form.css';
import Nav from "../../components/Nav.js";

function Create() {
  // nav set for page change
  const nav = useNavigate();

  // Storing params in useStats
  const [name, setName] = useState(null);
  const [brand, setBrand] = useState(null);
  const [price, setPrice] = useState(null);
  const [sku, setSku] = useState(null);
  const [rating, setRating] = useState(null);
  const [stock, setStock] = useState(null);
  const [image, setImage] = useState(null);
  const [features, setFeatures] = useState([]);
  const [specifications, setSpecifications] = useState([]);

  //error state for fetch response
  const [error, setError] = useState(null);

  // onSubmit function to send to api
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {name, brand, price, sku, rating, stock, image, features, specifications};
  
    const response = await fetch('/Users/', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const json = await response.json();
  
    // Check if fetch is ok
    if (!response.ok) {
      alert(json.message);
    }
    if (response.ok) {
      setError(null);
      alert('New User Added');
      nav('/');
    }
  }

  // JSX for form
  return (
    <>
      <Nav />
      <h1>Create Page</h1>

      <br/>

      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label>Brand:</label>
        <input 
          type="text"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
        />

        <label>Price:</label>
        <input 
          type="text"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />

        <label>SKU#:</label>
        <input 
          type="text"
          onChange={(e) => setSku(e.target.value)}
          value={sku}
        />

        <label>Stock:</label>
        <input 
          type="text"
          onChange={(e) => setStock(e.target.value)}
          value={stock}
        />

        <label>Image:</label>
        <input 
          type="text"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />

        <label>Features:</label>
        <input type="button" >Add Feature</input>

        <label>Specifications:</label>
        <input type="button">Add Feature</input>

        <br/>

        <div className="btnBox">
          <input type="submit" id="submit" value="Submit Form" className="btn"></input>

          <input type="reset" id="reset" value="Reset Form" className="btn"></input>
        </div>
      </form>
    </>
  )
}

export default Create;