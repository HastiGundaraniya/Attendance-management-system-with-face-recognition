import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import '../index.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import log from '../login2.avif'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [authLevel, setAuthLevel] = useState('');
  const { login, error, isLoading } = useLogin()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!email || !password || !authLevel) {
      setFormError('All fields are required');
      return;
    }

    setFormError('');

    await login(email, password, authLevel)

    if (authLevel === "professor") {
      navigate('/pdashboard')
    }
    if (authLevel === "student") {
      navigate('/sdashboard')
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container pt-5 pb-5 d-flex justify-content-evenly">
        <form onSubmit={handleSubmit} style={{width: "30%"}}>
          <h1 className="mb-5 text-primary">Log In</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="form-control"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="authLevel">Auth Level</label>
            <select
              id="authLevel"
              name="authLevel"
              className="form-control"
              onChange={(e) => setAuthLevel(e.target.value)}
              value={authLevel} >
              <option value="">Select an option</option>
              <option value="professor">Professor</option>
              <option value="student">Student</option>
            </select>
          </div>
          <br />

          <p className="form-text text-muted"><Link to="/email">Forgot password?</Link>.</p>
          <button type="submit" disabled={isLoading} className="btn btn-outline-primary"  style={{width: "50%"}}>Login</button>
          <br />
          { formError && <p style={{ color: 'red' }}>{formError}</p> }
          { error && <p style={{ color: 'red' }}>{error}</p> } 
    </form>
    
    <img src={log} style={{width: '40%', height: '50%'}} alt='img'></img>
    </div >
    </div >
    
  );
}

export default LoginForm;
