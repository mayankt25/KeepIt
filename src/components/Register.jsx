import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../contexts/AlertState';

const host = process.env.REACT_APP_HOST;

const Register = () => {
  const context = useContext(AlertContext);
  const { showAlert } = context;

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();

    if (json.error === "User already exists") {
      return showAlert("Account already exists. Please login.", "danger");
    }

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Account Created Successfully.", "success");
    } else {
      showAlert("Internal Server Error. Please try again.", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div class="container mt-5">
      <h1>Create An Account</h1>

      <div class="row">
        <div class="col-sm-8 mt-2">
          <div class="card">
            <div class="card-body">

              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" name="name" onChange={onChange} minLength={3} required />
                </div>
                <div class="form-group mt-3">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" name="email" onChange={onChange} />
                </div>
                <div class="form-group mt-3">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" name="password" onChange={onChange} minLength={6} required />
                </div>
                <div class="form-group mt-3">
                  <label for="cpassword">Confirm Password</label>
                  <input type="password" class="form-control" name="cpassword" onChange={onChange} minLength={6} required />
                </div>
                <button disabled={credentials.password !== credentials.cpassword || credentials.name.length < 3 || credentials.password.length < 6} type="submit" class="btn mt-3">Register</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register