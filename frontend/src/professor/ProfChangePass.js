import React, { useState } from 'react'
import ProfSidebar from './ProfSidebar'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function ProfChangePass() {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [current, setCurrent] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPass !== confirm) {
            setError('New password and confirm password do not match');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (!token) {
                throw new Error("Authorization token missing. Please log in again.");
            }
            console.log("Sending token:", token); // Debugging

            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Ensure 'Bearer ' prefix is present
                },
                body: JSON.stringify({ current, newPass, confirm }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to change password');
            }

            setMessage(data.message);
            setError('');
            setCurrent('');
            setNewPass('');
            setConfirm('');
        } catch (error) {
            setError(error.message);
            setMessage('');
        }
    };

    const handleLogout = (e) => {
        logout()
      }

    return (
        <div className="container-fluid">
            <div className="row content">
                <ProfSidebar />
                <div className='col-sm-10'>
                    <div className="nav d-flex justify-content-between">
                        <div>
                            <h4>Dashboard</h4>
                            <p>hello Professor {user.name}</p>
                        </div>
                        <button className="btn btn-outline-primary" onClick={handleLogout}>Log Out</button>
                    </div>
                    <form onSubmit={handleSubmit} className='m-5'>
                        <div className="form-group">
                            <label>Current Password: </label>
                            <input type="password" className='form-control'
                                value={current} onChange={(e) => setCurrent(e.target.value)} />
                        </div><br/>
                        <div className="form-group">
                            <label>New Password: </label>
                            <input type="password" className='form-control'
                                value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                        </div><br/>
                        <div className="form-group">
                            <label>Confirm Password: </label>
                            <input type="password" className='form-control'
                                value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                        </div><br/>
                        <button className='btn btn-primary'>Set Password</button>
                        {message && <p>{message}</p>}
                        {error && <p>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfChangePass
