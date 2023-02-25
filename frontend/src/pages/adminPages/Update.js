import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate  } from "react-router-dom";
import '../../css/form.css';
import Nav from "../../components/Nav.js";

function Update() {
  // nav set for page change
  const nav = useNavigate();

  // Get ID from params and set user
  const params = useParams();

  // Get user from api
  useEffect(() => {
    const fetchData = async () => {
      let url = '/Users/' + params.id
      let response = await fetch(url, { method: 'GET' });
      const json = await response.json();

      //Set vars and populate fields if fetch if completed
      if (response.ok) {
        setLastName(json.lastName);
        setFirstName(json.firstName);
        setDoB(json.DoB);
        setAddress1(json.address1);
        setAddress2(json.address2);
        setCity(json.city);
        setPostalCode(json.postalCode);
        setCountry(json.country);
        setPhone(json.phone)
        setEmail(json.email);
        setNotes(json.notes);
      } else {
        alert('Error 404: Cannot find user');
      }
    }

    fetchData();
  }, []);

  // Setting params in useState
  const [lastName, setLastName] = useState('Loading...');
  const [firstName, setFirstName] = useState('Loading...');
  const [DoB, setDoB] = useState('Loading...');
  const [address1, setAddress1] = useState('Loading...');
  const [address2, setAddress2] = useState('Loading...');
  const [city, setCity] = useState('Loading...');
  const [postalCode, setPostalCode] = useState('Loading...');
  const [country, setCountry] = useState('Loading...');
  const [phone, setPhone] = useState('Loading...');
  const [email, setEmail] = useState('Loading...');
  const [notes, setNotes] = useState('Loading...');

  //error state for fetch response
  const [error, setError] = useState(null);

  // Update User Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {lastName, firstName, DoB, address1, address2, city, postalCode, country, phone, email, notes};
    let url = '/Users/' + params.id
  
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const json = await response.json();
  
    // Check if fetch is ok
    if (!response.ok) {
      setError(json.error);
      alert(error)
    }
    if (response.ok) {
      setError(null);
      alert("User Updated!");
      nav('/');
    }
  }

  //Delete user function
  const deleteUser = async (e) => {
    let url = '/Users/' + params.id
  
    const response = await fetch(url, {
      method: 'DELETE'
    });

    const json = await response.json();
  
    // Check if fetch is ok
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      alert('User Delete');
      nav('/');
    }
  }

  // JSX for form
  return (
    <>
      <Nav />
      <h1>Edit User</h1>

      <br/>

      <form onSubmit={handleSubmit}>
        <label>Last Name:</label>
        <input 
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />

        <label>First Name:</label>
        <input 
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />

        <label>Date of Birth:</label>
        <input 
          type="text"
          onChange={(e) => setDoB(e.target.value)}
          value={DoB}
        />

        <label>Address 1:</label>
        <input 
          type="text"
          onChange={(e) => setAddress1(e.target.value)}
          value={address1}
        />

        <label>Address 2:</label>
        <input 
          type="text"
          onChange={(e) => setAddress2(e.target.value)}
          value={address2}
        />

        <label>City:</label>
        <input 
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />

        <label>Postal Code:</label>
        <input 
          type="text"
          onChange={(e) => setPostalCode(e.target.value)}
          value={postalCode}
        />

        <label>Country:</label>
        <input 
          type="text"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />

        <label>Phone:</label>
        <input 
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />

        <label>Email:</label>
        <input 
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Notes:</label>
        <input 
          type="text"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />

        <br/>

        <div className="btnBox">
          <button onClick={handleSubmit} type="button" className="btn">Update</button>
          <button onClick={deleteUser} type="button" className="delBtn">Delete</button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  )
}
  
export default Update;