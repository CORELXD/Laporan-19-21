import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/Login', { username, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/mhs');
        window.location.reload();
      } else {
        console.error('Gagal login: Token tidak diterima');
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.error('Gagal login: Kata sandi atau username salah');
      } else {
        console.error('Gagal login:', error);
      }
    }
  };

  return (
    <div className="container" style={{ background: 'lightblue', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '50%', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333', fontSize: '2rem' }}>Login</h1>
      <div className="form-group">
        <label style={{ color: '#333', marginBottom: '5px', display: 'block' }}>Username:</label>
        <input
          className="form-control"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ borderRadius: '5px', marginBottom: '15px', padding: '8px' }}
        />
      </div>
      <div className="form-group">
        <label style={{ color: '#333', marginBottom: '5px', display: 'block' }}>Password:</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ borderRadius: '5px', marginBottom: '15px', padding: '8px' }}
        />
      </div>
      <button className="btn btn-success" onClick={handleLogin} style={{ borderRadius: '5px', padding: '8px 20px', marginRight: '10px' }}>
        Login
      </button>
      <p style={{ color: '#', marginTop: '10px', textAlign: 'center' }}>Belum punya akun? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Daftar</Link></p>
    </div>
  </div>
  );
}

export default Login;