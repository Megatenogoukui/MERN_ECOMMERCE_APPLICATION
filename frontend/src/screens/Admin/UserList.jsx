import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import { FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

function UserList() {
  const [admin, setAdmin] = useState(false);

  // Fetch the list of users using the 'useGetAllUsersQuery' hook
  const {
    data: users,
    isLoading: loadingUsers,
    error,
    refetch,
  } = useGetAllUsersQuery();

  // Initialize 'deleteUser' mutation and its loading state
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  // Handle user deletion
  const deleteHandler = async (id) => {
    try {
      const result = await deleteUser(id);
      toast.success(result.message);
      refetch(); // Refresh the list of users after successful deletion
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  // Initialize 'updateUser' mutation and its loading state
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const navigate = useNavigate();

  // Handle user type (admin/user) update
  const handleUpdate = async (id) => {
    try {
      const updatedUser = await updateUser(id);
      toast.success(updatedUser.message);
      refetch(); // Refresh the list of users after successful update
    } catch (err) {
      toast.err(err?.data?.message || err.message); // Handle any errors
    }
  };

  return (
    <>
      <Row className="text-align-center">
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>
      {loadingUpdate && <Spinner />}
      {loadingDelete && <Spinner />}
      {loadingUsers ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Table responsive hover striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>TYPE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.isAdmin ? "ADMIN" : "USER"}</td>

                  <td>
                    {/* Button to toggle user type (admin/user) */}
                    <Button
                      variant="primary"
                      className="btn-sm mx-2"
                      onClick={() => handleUpdate(user._id)}
                    >
                      {user.isAdmin ? "REMOVE ADMIN" : "MAKE ADMIN"}
                    </Button>

                    {/* Button to delete the user */}
                    <Button
                      variant="danger"
                      className="btn-sm mx-2"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default UserList;
