import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`/api/user/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }), // Correct key name
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 3000);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container pt-5 pb-5 d-flex justify-content-evenly">
        <div className="col-sm-6">
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password:</label><br />
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              /></div><br />
            <div className="form-group">
              <label>Confirm Password:</label><br />
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              /></div><br />

            <button type="submit" className="btn btn-primary">Reset Password</button>
            {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
