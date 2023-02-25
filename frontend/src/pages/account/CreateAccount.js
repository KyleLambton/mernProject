import { useNavigate  } from "react-router-dom";
import { useState } from "react";
import Nav from "../../components/Nav.js";

function LoginPage() {
  // nav set for page change
  const nav = useNavigate();

  //useStates to store form data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check if passwords match
    if (password != confirmPass) {
      setError('Passwords do not match');
      document.getElementById("password").focus();
      return;
    }

    // Query Db to see if username exists
    let name = { userName: userName };

    const response = await fetch('/Accounts/userCheck', {
      method: 'POST',
      body: JSON.stringify(name),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    if (json.nameFree == false) {
      alert('User Name already exsists');
      setError('User Name already exsists');
      return;
    }

    //Check if passwords match, if so create account
    if (password == confirmPass) {
      const newAccount = {firstName, lastName, dob, email, address, city, country, userName, password};
  
      const response = await fetch('/Accounts/createAccount', {
        method: 'POST',
        body: JSON.stringify(newAccount),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response)

      if (response.status == 201) {
        alert('Account Created!');
        nav('/login');
      }
    } else {
      alert('Error: Passwords do not match');
    }
    
  } 

  //JSX
  return (
    <>
      <Nav />
      <h1>Create New Account</h1>
      <br/>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input 
          type="text" 
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName} 
        />

        <label>Last Name:</label>
        <input 
          type="text" 
          onChange={(e) => setLastName(e.target.value)}
          value={lastName} 
        />

        <label>Date of Birth:</label>
        <input 
          type="text" 
          onChange={(e) => setDob(e.target.value)}
          value={dob} 
        />

        <label>Email:</label>
        <input 
          type="text" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Address:</label>
        <input 
          type="text" 
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />

        <label>City:</label>
        <input 
          type="text" 
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />

        <label>Country:</label>
        <input 
          type="text" 
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />

        <br/><br/>

        <label>User Name:</label>
        <input 
          type="text" 
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />

        <label>Password:</label>
        <input 
          type="password" 
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password} 
        />

        <label>Confirm Password:</label>
        <input 
          type="password" 
          onChange={(e) => setConfirmPass(e.target.value)}
          value={confirmPass} 
        />

        <h3 className="error">{error}</h3>
        <div className="btnBox">
          <input type="submit" id="submit" value="Submit Form" className="btn"></input>
        </div>
      </form>
    </>
  )
}

export default LoginPage;