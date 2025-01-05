import React, { useState, useEffect } from "react";
import QSearch from "../header/Search";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [editUsers, setEditUsers] = useState({});

  const fetchUsers = async (search = "") => {
    const response = await fetch(`/api/users?search=${search}`);
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  const handleEditChange = (userId, field, value) => {
    setEditUsers((prev) => ({ ...prev,
      [userId]: { ...prev[userId], [field]: value },
    }));
  };

  const handleSave = async (userId) => {
    try {
      const updatedUser = editUsers[userId];
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",//"PUT"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: updatedUser }),
      });
      if (!response.ok) alert("Error save");
      alert("Save!");
      fetchUsers(); 
    } catch (error) {
      alert("Error save:" + error);
    }
  };



  return (
    <>
    <QSearch  onSearch={fetchUsers} />

      <table id="usersList" className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th className="right">Save</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>
                <input  className="form-control"
                  type="text"
                  value={editUsers[user.id]?.first_name || user.first_name}
                  onChange={(e) => handleEditChange(user.id, "first_name", e.target.value )}
                />
              </td>
              <td>
                <input className="form-control"
                  type="text"
                  value={editUsers[user.id]?.last_name ||  user.last_name}
                  onChange={(e) => handleEditChange(user.id, "last_name", e.target.value )}
                />
              </td>
              <td>
                <select  className="form-select"
                  value={editUsers[user.id]?.role || user.role}
                  onChange={(e) => handleEditChange(user.id, "role", e.target.value )}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td  className="right">
                <button  className="btn btn-outline-success" onClick={() => handleSave(user.id)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

