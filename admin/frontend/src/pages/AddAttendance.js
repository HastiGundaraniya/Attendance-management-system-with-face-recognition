import React, { useEffect, useState } from 'react';
import { useStudents } from '../hooks/useStudent';
import { useLogout } from "../hooks/useLogut";
import Sidebar from './Sidebar'

function AddAttendance() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [statuses, setStatuses] = useState({}); // Object to store student-specific statuses
  const { students, error, fetchStudents } = useStudents();
  const { logout } = useLogout()

  useEffect(() => {
    fetchStudents(); // Fetch students when the component mounts
  }, [fetchStudents]);

  const handleStatusChange = (studentId, value) => {
    setStatuses(prevStatuses => ({
      ...prevStatuses,
      [studentId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an array of students with their respective statuses
    const attendanceData = students.map(student => ({
      studentId: student._id,
      status: statuses[student._id] || "", // Default to empty if not selected
    }));

    const data = {
      date,
      subject,
      time,
      students: attendanceData
    };

    try {
      const response = await fetch('/api/admin/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMessage('Attendance submitted successfully!');
        setDate(today);
        setSubject('');
        setTime('')
        setStatuses({});
      } else {
        setMessage('Failed to submit attendance.');
      }
    } catch (err) {
      setMessage('Error submitting attendance: ' + err.message);
    }
  };

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="container-fluid">
      <div className="row content d-flex">
        <Sidebar />
        <div className='col-sm-10'>
          <div className="nav d-flex justify-content-between">
            <div>
              <h4>Dashboard</h4>
              <p>Hello Admin</p>
            </div>
            <button className="btn btn-outline-primary" onClick={handleLogout}>Log Out</button>
          </div>
          <div className='m-5'>
            <h2>Add Attendance</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Date:</label>
                <input type="date" className='form-control' value={date} max={today} onChange={(e) => setDate(e.target.value)} />
              </div>
              <br />
              <div className="form-group">
                <label>Subject:</label>
                <select className='form-control' value={subject} onChange={(e) => setSubject(e.target.value)}>
                  <option value="">--Select Subject--</option>
                  <option value="AI">AI</option>
                  <option value="ML">ML</option>
                  <option value="SE">SE</option>
                </select>
              </div>
              <br/>
              <div className="form-group">
                <label>Time Period:</label>
                <select  className='form-control' value={time} onChange={(e) => setTime(e.target.value)}>
                  <option value="">--Select Time--</option>
                  <option value="9:00 to 10:00">9:00 to 10:00</option>
                  <option value="10:00 to 11:00">10:00 to 11:00</option>
                  <option value="11:00 to 12:00">11:00 to 12:00</option>
                </select>
              </div>
              <br />

              {/* Display student list */}
              <h3>Student List</h3>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {students.length > 0 ? (
                <table border="1" className='table table-bordered'>
                  <thead className='table-primary'>
                    <tr>
                      <th>Sr.no</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{student._id}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>
                          <div className="form-group">
                          <select className='form-control' value={statuses[student._id] || ""} onChange={(e) => handleStatusChange(student._id, e.target.value)}>
                            <option value="">--Select--</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No students found.</p>
              )}
              <br />
              <button type="submit" className='btn btn-primary'>Submit Attendance</button>
              {message && <p>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAttendance;
