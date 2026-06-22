
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function UserForm({
  fetchUsers,
  editId,
  setEditId,
  selectedUser,
  setSelectedUser
}) {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {

    if (selectedUser) {

      setValue("name", selectedUser.name);
      setValue("email", selectedUser.email);
      setValue("age", selectedUser.age);
      setValue("city", selectedUser.city);

    }

  }, [selectedUser, setValue]);

  const onSubmit = async (data) => {

    try {

      if (editId) {

        await axios.put(
          `http://localhost:8000/users/${editId}`,
          data
        );

      } else {

        await axios.post(
          "http://localhost:8000/users",
          data
        );

      }

      await fetchUsers();

      reset();

      setEditId(null);
      setSelectedUser(null);

    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {

    reset();

    setEditId(null);
    setSelectedUser(null);

  };

  return (
    <div className="card p-4 mb-4">

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type="text"
          placeholder="Enter Name"
          className="form-control mb-2"
          {...register("name", {
            required: "Name is required"
          })}
        />

        {errors.name && (
          <p className="text-danger">
            {errors.name.message}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          className="form-control mb-2"
          {...register("email", {
            required: "Email is required"
          })}
        />

        {errors.email && (
          <p className="text-danger">
            {errors.email.message}
          </p>
        )}

        <input
          type="number"
          placeholder="Enter Age"
          className="form-control mb-2"
          {...register("age", {
            required: "Age is required"
          })}
        />

        {errors.age && (
          <p className="text-danger">
            {errors.age.message}
          </p>
        )}

        <input
          type="text"
          placeholder="Enter City"
          className="form-control mb-2"
          {...register("city", {
            required: "City is required"
          })}
        />

        {errors.city && (
          <p className="text-danger">
            {errors.city.message}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
        >
          {editId ? "Update User" : "Add User"}
        </button>

        {editId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}

      </form>

    </div>
  );
}

export default UserForm;

