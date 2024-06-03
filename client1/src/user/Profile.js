import React, { useState } from "react";
import Layout from "../core/Layout";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // Here you can perform actions like updating profile
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMessage("Profile updated successfully.");
    }
  };

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container"
    >
      <h2 className="mb-4">Profile Update</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control input-shadow"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{width:"20%"}}
          />
        </div>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control  input-shadow"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{width:"20%"}}
          />
        </div>
        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control  input-shadow"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{width:"20%"}}
          />
        </div>
        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control input-shadow"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{width:"20%"}}
          />
        </div>
        {/* Error message */}
        {message && <div className="alert alert-success">{message}</div>}
        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </Layout>
  );
};

export default Profile;
