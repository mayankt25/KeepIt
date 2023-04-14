import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../contexts/AlertState';

const host = process.env.REACT_APP_HOST;

const Login = () => {
  const context = useContext(AlertContext);
  const {showAlert} = context;
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
  
    const json = await response.json();
    
    if(json.success){
      localStorage.setItem("token", json.authToken);
      showAlert("Logged in Successfully.", "success");
      navigate("/");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <div className="container mt-5">
      <h1>Login to Continue</h1>

      <div className="row">
        <div className="col-sm-8 mt-2">
          <div className="card">
            <div className="card-body">

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input value={credentials.email} onChange={onChange} type="email" className="form-control" name="email" />
                </div>
                <div className="form-group mt-3">
                  <label for="password">Password</label>
                  <input value={credentials.password} onChange={onChange} type="password" className="form-control" name="password" />
                </div>
                <button type="submit" className="btn mt-3">Login</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login