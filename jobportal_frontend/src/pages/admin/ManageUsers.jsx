import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/")  // adjust URL
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} ({user.role})</li>
        ))}
      </ul>
    </div>
  );
}
