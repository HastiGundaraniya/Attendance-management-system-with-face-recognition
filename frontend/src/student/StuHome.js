import React, { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import StuSidebar from './StuSidebar';

function StuHome() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [subject, setSubject] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const studentId = user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(''); // Clear previous status
    setError(''); // Clear previous error

    try {
      const response = await fetch('/api/attendance/studata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, subject, studentId }),
      });

      if (!response.ok) {
        setError('No data found');
        return;
      }

      const json = await response.json();
      setStatus(json.status);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError('Error fetching data');
    }
  };


  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container-fluid">
      <div className="row content d-flex">
        <StuSidebar />
        <div className='col-sm-10'>
          <div className="nav d-flex justify-content-between">
            <div>
              <h4>Dashboard</h4>
              <p>Hello {user.name}</p>
            </div>
            <button className="btn btn-outline-primary" onClick={handleLogout}>Log Out</button>
          </div>
          <br />
          <div className='m-5'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Select Subject:</label>
              <select onChange={(e) => setSubject(e.target.value)} value={subject} className='form-control'>
                <option value="">--select--</option>
                <option value="AI">AI</option>
                <option value="ML">ML</option>
                <option value="SE">SE</option>
              </select>
            </div>
            <br />
            <div className="form-group">
            <label>Select date: </label>
            <input type="date" value={date} max={today} onChange={(e) => setDate(e.target.value)}  className='form-control'/>
            </div>
            <br />
            <button type="submit" className='btn btn-primary'>Search</button>
          </form>
          <br />
          <h5>Status: {error ? <div>{error && <p style={{ color: 'red' }}>{error}</p>}</div> : <div>{status}</div>}</h5>
          <br />


          </div>
        </div>
      </div>
    </div>
  );
}

export default StuHome;
