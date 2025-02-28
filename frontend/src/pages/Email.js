import React, { useState } from 'react';

function Email() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      const response = await fetch('/api/user/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link sent! Check your email.");
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Failed to send request.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container pt-5 pb-5 d-flex justify-content-evenly">
      <form onSubmit={handleSubmit} className='col-sm-6'>
        <div className="form-group">
        <label>Enter email:</label><br />
        <input 
          type="email" 
          className='form-control'
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        </div>
        <br />
        <button type="submit" className='btn btn-primary'>Send reset password link</button>
        {message && <p>{message}</p>}
      </form>
      
      
    </div>
    </div>
  );
}

export default Email;
