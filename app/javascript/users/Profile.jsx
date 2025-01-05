import React, { useEffect, useState } from "react";
import Rails from "@rails/ujs";

export default function EditProfile ({user}) {
    const [profile, setProfile] = useState({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: "",
      password_confirmation: "",
      current_password: "",
    });
    const [errors, setErrors] = useState([]);
  
   // useEffect(() => {
   //   fetch("/api/users/profile")
   // /    .then((response) => response.json())
   //     .then((data) => setProfile(data))
   //     .catch((error) => console.error("Error:", error));
   // }, []);
  
    const handleChange =(event) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
      };
    
    const handleSave = async (event) => {
        event.preventDefault();
        setErrors([]);
      try{
        const response = await fetch("/api/users/profile", {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ user: profile }),
        });
        if(!response.ok) alert("Error save: "+response.json());
        alert("Update!");
      } catch(error) {
        setErrors([error.message]);
        alert("Error save: "+ error.message);
      }
    };

      return (
        <>
          <h1>Edit Account</h1>
          {errors.length > 0 && (
            <div className="color_red">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSave}>
            <div>
              <label>First name:</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={profile.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Last name:</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={profile.last_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>New password (leave blank to NOT change):</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={profile.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Confirm password:</label>
              <input
                type="password"
                className="form-control"
                name="password_confirmation"
                value={profile.password_confirmation}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Current passord:</label>
              <input
                type="password"
                className="form-control"
                name="current_password"
                value={profile.current_password}
                onChange={handleChange}
              />
            </div>
            <div className="card-body">
            <button type="submit" className="btn btn-outline-success">Save</button>
            </div>
          </form>
        </>
      );
    };