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
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'lightblue'  }}>
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Form Pendaftaran</h2>
        {error && <div className="alert alert-danger" style={{ background: 'red', color: 'white', padding: '10px', borderRadius: '5px' }}>{error}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px', marginBottom: '15px', width: '300px', textAlign: 'center' }}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '8px', marginBottom: '15px', width: '300px', textAlign: 'center' }}
          />
          <button onClick={handleRegister} style={{ padding: '8px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#2E8B57', color: '#fff', cursor: 'pointer', margin: '8px'}}>
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
