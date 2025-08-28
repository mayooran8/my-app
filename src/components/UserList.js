import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";  // Added Link import

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const snap = await getDocs(collection(db, "users"));
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load users. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        setUsers(users.filter(user => user.id !== id));
        alert("User deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Error deleting user");
      }
    }
  };

  // Modified handleEdit to navigate to registration with user data


const handleEdit = (user) => {
  navigate("/registration", { state: { editingUser: user } });
};


  const filtered = users.filter((u) =>
    (u.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = (a[sortKey] ?? "").toString().toLowerCase();
    const bv = (b[sortKey] ?? "").toString().toLowerCase();
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const sortBy = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortIcon = (key) => {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Registered Users</h2>
        <div>
          <Link to="/registration" className="btn btn-primary me-2">
            Add New User
          </Link>
          <button className="btn btn-outline-secondary" onClick={fetchUsers} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && (
        <div className="d-flex align-items-center">
          <div className="spinner-border me-2" role="status" aria-hidden="true"></div>
          <span>Loading users...</span>
        </div>
      )}
      {error && <div className="alert alert-danger mt-2">{error}</div>}

      {!loading && !error && (
        <>
          <table className="table table-bordered table-hover table-striped d-none d-md-table">
            <thead>
              <tr>
                <th role="button" onClick={() => sortBy("name")}>
                  Name{sortIcon("name")}
                </th>
                <th role="button" onClick={() => sortBy("email")}>
                  Email{sortIcon("email")}
                </th>
                <th role="button" onClick={() => sortBy("phone")}>
                  Phone{sortIcon("phone")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((user) => (
                <tr key={user.id}>
                  <td>{user.name || "-"}</td>
                  <td>{user.email || "-"}</td>
                  <td>{user.phone || "-"}</td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                      <button className="btn btn-primary btn-sm" onClick={() => handleEdit(user)}>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-md-none">
            {sorted.map((user) => (
              <div className="card mb-3" key={user.id}>
                <div className="card-body">
                  <h5 className="card-title mb-2">{user.name || "Unnamed"}</h5>
                  <p className="card-text mb-1"><strong>Email:</strong> {user.email || "-"}</p>
                  <p className="card-text"><strong>Phone:</strong> {user.phone || "-"}</p>
                  <div className="btn-group">
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(user)}>Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="alert alert-info">No users found. Try a different search.</div>
          )}
        </>
      )}
    </div>
  );
}

export default UserList;