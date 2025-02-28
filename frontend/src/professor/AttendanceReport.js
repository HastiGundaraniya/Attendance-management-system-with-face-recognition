import React, { useState } from 'react';
import ProfSidebar from './ProfSidebar';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function AttendanceReport() {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [attendanceData, setAttendanceData] = useState([]); // Store fetched attendance data
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setAttendanceData([]); // Reset data on new request

        try {
            const response = await fetch('/api/attendance/studentsAData', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject }) // Fix json.stringify to JSON.stringify
            });

            if (!response.ok) {
                setMessage("Data not found");
                return;
            }

            const data = await response.json();
            setAttendanceData(data); // Store received data
        } catch (error) {
            setMessage("Error fetching data");
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="container-fluid">
            <div className="row content">
                <ProfSidebar />
                <div className='col-sm-10'>
                    <div className="nav d-flex justify-content-between">
                        <div>
                            <h4>Dashboard</h4>
                            <p>Hello Professor {user.name}</p>
                        </div>
                        <button className="btn btn-outline-primary" onClick={handleLogout}>Log Out</button>
                    </div>
                    <div className="m-5">
                        <h2>Total Attendance Report</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Select Subject</label>
                                <select onChange={(e) => setSubject(e.target.value)} value={subject} className='form-control'>
                                    <option value="">--select--</option>
                                    <option value="AI">AI</option>
                                    <option value="ML">ML</option>
                                    <option value="SE">SE</option>
                                </select>
                            </div>
                            <br />
                            <button className='btn btn-primary' type='submit'>Check</button>
                        </form>
                    </div>

                    {/* Show message if no data */}
                    {message && <p className="text-danger">{message}</p>}

                    {/* Attendance Table */}
                    <div className="m-5">
                    {attendanceData.length > 0 ? (
                        <div>
                            <h4>Attendance Report for {subject}</h4>
                            <table className="table table-bordered">
                                <thead className='table-primary'>
                                    <tr>
                                        <th>Sr.no</th>
                                        <th>Student ID</th>
                                        <th>Present Days</th>
                                        <th>Absent Days</th>
                                        <th>Attendance %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceData.map((student, index) => {
                                        const totalDays = student.presentCount + student.absentCount;
                                        const attendancePercentage = totalDays > 0 ? ((student.presentCount / totalDays) * 100).toFixed(2) : "N/A";
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{student._id}</td>
                                                <td>{student.presentCount}</td>
                                                <td>{student.absentCount}</td>
                                                <td>{attendancePercentage}%</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div> 
                        
                    ): <p>No Data Found</p> } 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttendanceReport;
