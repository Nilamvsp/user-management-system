function UserTable({
  users,
  handleEdit,
  deleteUser
}) {

  return (
    <table className="table table-bordered">

      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {users.map((user) => (

          <tr key={user.id}>

            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.city}</td>

            <td>

              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default UserTable;