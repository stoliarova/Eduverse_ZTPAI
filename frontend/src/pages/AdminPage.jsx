import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const predefinedAuthorities = ["USER", "CREATOR", "MANAGER", "ADMIN"];

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        authorities: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loadUsers = async () => {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem("jwtToken");

        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Map authorities to array of names
                const usersWithAuthorities = data.map((user) => ({
                    ...user,
                    authorities: user.authorities.map((authority) => authority.name),
                }));
                setUsers(usersWithAuthorities);
            } else {
                console.error(response);
                setError("Failed to fetch users");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred while fetching users");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (user) => {
        const token = localStorage.getItem("jwtToken");

        const updatedUser = {
            ...user,
            authorities: user.authorities.map((name) => ({ name, authority: name })),
        };

        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                alert("User updated successfully");
                loadUsers(); // Reload users after update
            } else {
                console.error(response);
                alert("Failed to update user");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while updating user");
        }
    };

    const handleDelete = async (userId) => {
        const token = localStorage.getItem("jwtToken");

        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });

            if (response.ok) {
                alert("User deleted successfully");
                loadUsers(); // Reload users after delete
            } else {
                console.error(response);
                alert("Failed to delete user");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while deleting user");
        }
    };

    const handleAddUser = async () => {
        const token = localStorage.getItem("jwtToken");

        const userToAdd = {
            ...newUser,
            authorities: newUser.authorities.map((name) => ({ name, authority: name })),
        };

        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: JSON.stringify(userToAdd),
            });

            if (response.ok) {
                alert("User added successfully");
                setNewUser({
                    username: "",
                    email: "",
                    firstName: "",
                    lastName: "",
                    password: "",
                    authorities: [],
                });
                loadUsers(); // Reload users after adding a new one
            } else {
                console.error(response);
                alert("Failed to add user");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while adding user");
        }
    };

    const handleAuthorityChange = (e, user, isNewUser = false) => {
        const { value, checked } = e.target;
        let updatedAuthorities;

        if (checked) {
            updatedAuthorities = [...user.authorities, value];
        } else {
            updatedAuthorities = user.authorities.filter((authority) => authority !== value);
        }

        if (isNewUser) {
            setNewUser({ ...user, authorities: updatedAuthorities });
        } else {
            const updatedUsers = users.map((u) => (u.id === user.id ? { ...u, authorities: updatedAuthorities } : u));
            setUsers(updatedUsers);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={loadUsers} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Load Users"}
                    </button>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Password</th>
                            <th>Authorities</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.username}
                                        onChange={(e) => {
                                            const newUsers = users.map((u) => (u.id === user.id ? { ...u, username: e.target.value } : u));
                                            setUsers(newUsers);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.email}
                                        onChange={(e) => {
                                            const newUsers = users.map((u) => (u.id === user.id ? { ...u, email: e.target.value } : u));
                                            setUsers(newUsers);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.firstName}
                                        onChange={(e) => {
                                            const newUsers = users.map((u) => (u.id === user.id ? { ...u, firstName: e.target.value } : u));
                                            setUsers(newUsers);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.lastName}
                                        onChange={(e) => {
                                            const newUsers = users.map((u) => (u.id === user.id ? { ...u, lastName: e.target.value } : u));
                                            setUsers(newUsers);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.password}
                                        onChange={(e) => {
                                            const newUsers = users.map((u) => (u.id === user.id ? { ...u, password: e.target.value } : u));
                                            setUsers(newUsers);
                                        }}
                                    />
                                </td>
                                <td>
                                    {predefinedAuthorities.map((authority) => (
                                        <div className="form-check" key={`${user.id}-${authority}`}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={authority}
                                                checked={user.authorities.includes(authority)}
                                                onChange={(e) => handleAuthorityChange(e, user)}
                                            />
                                            <label className="form-check-label">{authority}</label>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <button className="btn btn-success me-2" onClick={() => handleUpdate(user)}>
                                        Update
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>New</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    value={newUser.username}
                                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                    value={newUser.firstName}
                                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                    value={newUser.lastName}
                                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                />
                            </td>
                            <td>
                                {predefinedAuthorities.map((authority) => (
                                    <div className="form-check" key={`new-${authority}`}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={authority}
                                            checked={newUser.authorities.includes(authority)}
                                            onChange={(e) => handleAuthorityChange(e, newUser, true)}
                                        />
                                        <label className="form-check-label">{authority}</label>
                                    </div>
                                ))}
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={handleAddUser}>
                                    Add User
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPage;
