import { useNavigate  } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  // nav set for page change
  const nav = useNavigate();

  //useStates to store form data
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (userName.length < 1) {
      alert('Error: User Name can\'t be blank');
      return;
    }
    if (password.length < 1 || confirmPass.length < 1) {
      alert('Error: Passwords can\'t be blank');
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
      return;
    }

    //Check if passwords match, if so create account
    if (password == confirmPass) {
      const newAccount = {userName, password, confirmPass};
  
      const response = await fetch('/Accounts/createAccount', {
        method: 'POST',
        body: JSON.stringify(newAccount),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Account Created!');
      nav('/login')
    } else {
      alert('Error: Passwords do not match');
    }
    
  } 

  //JSX
  return (
    <>
      <h1>Create New Account</h1>
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

        <label>Confirm Password:</label>
        <input 
          type="password" 
          onChange={(e) => setConfirmPass(e.target.value)}
          value={confirmPass} 
        />

        <div className="btnBox">
          <input type="submit" id="submit" value="Submit Form" className="btn"></input>
        </div>
      </form>
    </>
  )
}

export default LoginPage;