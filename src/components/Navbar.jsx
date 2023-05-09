import React from 'react';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">

          <Link class="navbar-brand" to="/">
            <img src="../keepit.png" alt="..." height="50" />
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link class="nav-link active" to="/"><h3>Home</h3></Link>
              </li>
              {!localStorage.getItem("token") ? <>
                <li className="nav-item">
                  <Link class="nav-link" to="/login"><h3>Login</h3></Link>
                </li>
                <li className="nav-item">
                  <Link class="nav-link" to="/register"><h3>Register</h3></Link>
                </li>
              </> : <li className="nav-item"><Link class="nav-link" onClick={handleLogout}><h3>Logout</h3></Link></li>}
            </ul>
          </div>

      </nav>
    </div>
  )
}

export default Navbar;