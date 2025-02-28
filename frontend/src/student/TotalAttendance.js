import React, { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import StuSidebar from './StuSidebar';

function TotalAttendance() {
    const { user } = useAuthContext();
    const [totalDay, setTotalDay] = useState(0);
    const [presentDay, setPresentDay] = useState(0);
    const { logout } = useLogout();
    const [subject, setSubject] = useState('');
    const [error, setError] = useState('')
    const studentId = user._id;

    const absentDay = Math.max(totalDay - presentDay, 0); // Ensure no negative values
    const attendanceData = [
        { name: 'Present Days', value: presentDay },
        { name: 'Absent Days', value: absentDay },
    ];
    const COLORS = ['#4CAF50', '#FF5733'];
    const attendanceCheck = async (e) => {
        e.preventDefault();
        setError('');
        setTotalDay(0);
        setPresentDay(0);

        try {
            const response = await fetch('/api/attendance/total', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, studentId }),
            });

            if (!response.ok) {
                setError('No data found');
                return;
            }

            const json = await response.json();
            setTotalDay(json.totalDays || 0);
            setPresentDay(json.presentDays || 0);
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
                    <div className='m-5'>
                        <h3>Total Attendance</h3>
                        <br />  
                        <form onSubmit={attendanceCheck}>
                            <div className="form-group">
                                <label>Select Subject:</label>
                                <select onChange={(e) => setSubject(e.target.value)} value={subject} className='form-control'>
                                    <option value="">--select--</option>
                                    <option value="AI">AI</option>
                                    <option value="ML">ML</option>
                                    <option value="SE">SE</option>
                                </select>
                            </div>
                            <br/>
                            <div className="form-group">
                                <button type="submit" className='btn btn-primary'>Check</button>
                            </div>
                        </form>
                        <br/>
                        {totalDay > 0 ? (
                            <div>
                                <h3 style={{color:"green"}}>
                                    Out of {totalDay} days, you were present on {presentDay} days and absent on {absentDay} days.
                                </h3>

                                {/* Pie Chart */}
                                <h3>Attendance Summary (Pie Chart)</h3>
                                <PieChart width={300} height={300}>
                                    <Pie data={attendanceData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                                        {attendanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>

                                <div style={{ marginLeft: '20px' }}>
                                    <h4>Legend:</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                        <div style={{ width: '20px', height: '20px', backgroundColor: '#4CAF50', marginRight: '10px' }}></div>
                                        <span>Present Days</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '20px', height: '20px', backgroundColor: '#FF5733', marginRight: '10px' }}></div>
                                        <span>Absent Days</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No attendance data available.</p>
                        )}
                        {error && <p>{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotalAttendance
