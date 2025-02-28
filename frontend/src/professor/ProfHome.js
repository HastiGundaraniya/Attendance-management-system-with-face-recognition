import { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfSidebar from './ProfSidebar'

function ProfHome() {
  const today = new Date().toISOString().split("T")[0];
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(today);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  const handleLogout = (e) => {
    logout()
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/attendance/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, subject })
      });

      if (!response.ok) {
        setError("No attendance record found")
      }
      if (response.ok) {
        setError('')
      }

      const json = await response.json();

      setStudents(json.students || []);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setStudents([]);
    }
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
          <div className='m-5'>
            <h2>Check Attendance</h2>
            <form onSubmit={handleSubmit} className='mt-4'>
              <div className="form-group">
                <label>Select date: </label>
                <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} max={today} value={date} /><br />
              </div>
              <div className="form-group">
                <label>Select Subject:</label>
                <select className="form-control" onChange={(e) => setSubject(e.target.value)} value={subject}>
                  <option value="">--select--</option>
                  <option value="AI">AI</option>
                  <option value="ML">ML</option>
                  <option value="SE">SE</option>
                </select>
              </div>
              <br />

              <button className='btn btn-primary'>Search</button>
            </form>
            <br />
            {students.length > 0 ? (
              <div className="table mt-4 ">
                <h3>Attendance Records</h3>
                <table className="table table-bordered">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Student ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{student.studentId}</td>
                        <td>{student.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>{error && <p>{error}</p>}</p>
            )}
          </div>
        </div>
        <br />
      </div>
    </div>
  )
}

export default ProfHome
