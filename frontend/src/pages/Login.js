import { useNavigate  } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useState } from 'react';

function LoginPage() {
  // nav set for page change
  const nav = useNavigate();

  // Vars for login
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookies, removeCookies] = useCookies(['accessToken', 'refreshToken']);

  //Log in attempt
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginCreds = {userName, password};
    const response = await fetch('/Accounts/login/', {
      method: 'POST',
      body: JSON.stringify(loginCreds),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    // Check if fetch is ok
    if (json.userFound == false) {
      alert('Error: User does not exist');
      return;
    }
    // Check if password matches db
    if (json.auth == false) {
      alert('Error: Password incorrect');
      return;
    }
    // userName and password correct, create cookies/jwt
    if (json.auth == true) {
      setCookies('accessToken', json.accessToken, { path: '/'});
      setCookies('refreshToken', json.refreshToken, { path: '/'});
      nav('/');
    }
  }

  //goto new account page on link click
  function gotoNewAccount() {
    nav('/createAccount');
  }

  //JSX
  return (
    <>
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
          <input type="submit" id="submit" value="Submit Form" className="btn"></input>
          <br/>
          <a href="#" onClick={gotoNewAccount}>Create New Account</a>
        </div>
      </form>
    </>
  )
}

export default LoginPage;