import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      if (!username || !password) {
        setError('Username and password are required.');
        return;
      }

      const response = await axios.post('http://localhost:3000/api/auth/Register', {
        username: username,
        password: password,
      });
      console.log('Pendaftaran berhasil:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Gagal mendaftar:', error);
      setError('Gagal mendaftar. Silakan coba lagi.');
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5">Form Pendaftaran</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label>Username: </label>
        <input
          className="form-control"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password: </label>
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-2" onClick={handleRegister}>
        Daftar
      </button>
    </div>
  );
}

export default Register;
