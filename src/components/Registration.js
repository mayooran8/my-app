import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { collection, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";


function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const editingUser = location.state?.editingUser;
  useEffect(() => {
  if (editingUser) {
    setName(editingUser.name);
    setEmail(editingUser.email);
    setPhone(editingUser.phone);
  }
}, [editingUser]);
  
  


  // NEW: Fetch users from Firebase on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
      } catch (err) {
        console.error("Error fetching users: ", err);
      }
    };

    fetchUsers();
  }, []);

  // Handle Register (Add)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (name.length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Phone must be 10 digits");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        phone,
        timestamp: new Date()
      });
      alert("Registration successful!");
      setUsers([...users, { id: docRef.id, name, email, phone }]);
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Error submitting form. Check console.");
    }
  };

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, { name, email, phone });

      setUsers(users.map(u =>
        u.id === editingUser.id ? { ...u, name, email, phone } : u
      ));

      
      setName('');
      setEmail('');
      setPhone('');
      alert("User updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  // When editing a user, prefill form
  const startEditing = (user) => {
    editingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  // NEW: Cancel edit mode
  const cancelEdit = () => {
    editingUser(null);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="container mt-5">
      <h2>{editingUser ? "Edit User" : "Register"}</h2>

      <form onSubmit={editingUser ? handleUpdate : handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success me-2">
          {editingUser ? "Update" : "Submit"}
        </button>
        
        {/* NEW: Cancel button when editing */}
        {editingUser && (
          <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

     
    </div>
  );
}

export default Registration; 