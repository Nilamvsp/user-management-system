
import { useEffect, useState } from "react";
import axios from "axios";

import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

function App() {

  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {

      const response = await axios.get(
        "https://user-management-backend-ka10.onrender.com/users"
      );

      setUsers(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://user-management-backend-ka10.onrender.com/users/${id}`
      );

      await fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user) => {

    setEditId(user.id);
    setSelectedUser(user);

  };

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">
        User Management System
      </h1>

      <UserForm
        fetchUsers={fetchUsers}
        editId={editId}
        setEditId={setEditId}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <UserTable
        users={users}
        handleEdit={handleEdit}
        deleteUser={deleteUser}
      />

    </div>
  );
}

export default App;

