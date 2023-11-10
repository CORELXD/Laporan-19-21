import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../Style.css'
import Mahasiswa from '../pages/Mahasiswa';
import Jurusan from '../pages/Jurusan';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';


function Routing() {

const token = localStorage.getItem('token');
const isLoggedin = !!token;
const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("login berhasil");
    window.location.reload();
  }
    return (
        <Router>
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'secondary' }}>
    <div className="container-fluid">
    <Link className="navbar-brand" to="/" style={{ color: '#333', marginLeft: '20px' }}>Web Santai</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/mhs" style={{ color: '#333' }}>Mahasiswa</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/jrsn" style={{ color: '#333' }}>Jurusan</Link>
                </li>
                {isLoggedin ? (
                    <li className="nav-item">
                        <Link className="nav-link" onClick={handleLogout} style={{ color: '#333' }}>Logout</Link>
                    </li>
                ) : (
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" style={{ color: '#333' }}>Login</Link>
                    </li>
                )}
            </ul>
        </div>
    </div>
</nav>



        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mhs" element={<Mahasiswa />} />
          <Route path="/jrsn" element={<Jurusan />} />
        </Routes>
        </div>
    </Router>
    );
}

export default Routing;

