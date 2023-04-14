import React, { useContext } from "react";
import Navbar from './Navbar';
import Home from './Home';
import {NoteState} from "../contexts/NoteState";
import Alert from "./Alert";
import Login from "./Login";
import Register from "./Register";
import { AlertContext } from "../contexts/AlertState";
import Footer from "./Footer";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const context = useContext(AlertContext);
  const {alert} = context;
  
  return (
    <NoteState>
    <BrowserRouter>
    <Navbar />
    <Alert alert={alert} />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
    <Footer />
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
