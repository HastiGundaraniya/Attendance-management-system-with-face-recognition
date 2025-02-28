import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorM, setErrorM] = useState("");
    const { login, error, isLoading } = useLogin()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorM(""); // Reset error before new request

        await login(email, password)

        if (!error) {
            navigate("/adashboard"); // Redirect to dashboard or admin panel
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="container pt-5 pb-5 d-flex justify-content-evenly">
                <form onSubmit={handleSubmit} className="col-sm-3">
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>
                    <br />
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    <button type="submit" disabled={isLoading} className="btn btn-primary ps-4 pe-4">Login</button>
                    <br/>
                    {errorM && <p style={{ color: "red" }}>{errorM}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>

            </div>
        </div>
    );
}

export default AdminLoginPage;
