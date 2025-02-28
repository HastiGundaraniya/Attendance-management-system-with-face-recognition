import { useState } from "react"
import { useLogout } from "../hooks/useLogut";
import Sidebar from "./Sidebar"

function AddSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authLevel, setAuthLevel] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null);
  const { logout } = useLogout()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !authLevel) {
      setError("All fields must be filled");
      return;
    }

    try {
      const response = await fetch('/api/admin/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, authLevel }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Signup failed');
      }

      setError(null);
      setMessage("User registered successfully! Credentials have been sent via email.");
      setName("");
      setEmail("");
      setPassword("");
      setAuthLevel("");

      console.log("user added", json);
    } catch (error) {
      setError(error.message);
    }
  }

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
          <div className="m-5">
            <form className="signup" onSubmit={handleSubmit}>
              <h3>Add Sign Up</h3>
              <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              </div>
              <br />
              <div className="form-group">
              <label>Email address:</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              </div>
              <br />
              <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
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
                value={authLevel}
              >
                <option value="">Select an option</option>
                <option value="professor">Professor</option>
                <option value="student">Student</option>
              </select>
              </div>
              <br />

              <button className="btn btn-primary">Sign up</button>
              {error && <div className="error">{error}</div>}
              {message && <div className="success">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AddSignup
