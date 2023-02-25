import { useState } from 'react';
import { useNavigate  } from "react-router-dom";
import '../../css/form.css';
import Nav from "../../components/Nav.js";

function Create() {
  // nav set for page change
  const nav = useNavigate();

  // Storing params in useStats
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [DoB, setDoB] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  //error state for fetch response
  const [error, setError] = useState(null);

  // onSubmit function to send to api
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {lastName, firstName, DoB, address1, address2, city, postalCode, country, phone, email, notes};
  
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
          <input type="submit" id="submit" value="Submit Form" className="btn"></input>

          <input type="reset" id="reset" value="Reset Form" className="btn"></input>
        </div>
      </form>
    </>
  )
}

export default Create;