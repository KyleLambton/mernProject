import { useNavigate  } from "react-router-dom";
import { useState } from 'react';
import Nav from "../../components/Nav.js";

function AdminLoginPage() {
  // nav set for page change
  const nav = useNavigate();

  // Vars for login
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  //Log in attempt
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginCreds = {userName, password};
    const response = await fetch('/Accounts/adminlogin/', {
      method: 'POST',
      body: JSON.stringify(loginCreds),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    // Check if fetch is ok
    if (json.userFound == false) {
      setError('Error: User does not exist');
      return;
    }
    // Check if password matches db
    if (json.auth == false) {
      setError('Error: Password incorrect');
      return;
    }
    // Check if admin
    if (json.isAdmin == false) {
      setError('Error: Account is not an Admin');
      return;
    }
    // userName and password correct, create cookies/jwt
    if (json.auth == true) {
      nav('/');
    }
  }

  //JSX
  return (
    <>
      <Nav />
      <h1>Login Page</h1>
      <br/>
      <form onSubmit={handleSubmit}>
        <label>User Name:</label>
        <input 
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />

        <label>Password:</label>
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <div className="btnBox">
          <input type="submit" id="submit" value="Sign In" className="btn"></input>
          <div className="error">{error}</div>
        </div>
      </form>
    </>
  )
}

export default AdminLoginPage;