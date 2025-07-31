import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Profile from Backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tokenData = localStorage.getItem("user");
        if (!tokenData) {
          setError("Please log in first.");
          setLoading(false);
          return;
        }

        const token = JSON.parse(tokenData).token;
        console.log("Token sent:", token);
        const response = await fetch("http://localhost:8080/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        console.log("Profile API status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Profile API error:", errorText);
          throw new Error(errorText || "Failed to fetch profile");
        }

        const data = await response.json();
        console.log("Fetched user data:", data);

        setUser(data);
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phone || "",
          address: data.address || ""
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      console.log("Token sent:", token);
      const response = await fetch("http://localhost:8080/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      console.log("Update API status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update API error:", errorText);
        throw new Error(errorText || "Failed to update profile");
      }

      const updatedData = await response.json();
      console.log("Profile updated successfully:", updatedData);

      setUser(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };
  if (loading) return <div className="profile-container">Loading...</div>;
  if (error) return <div className="profile-container">Error: {error}</div>;

  return (
    <div className="profile-container">
      {/* Left Section */}
      <div className="profile-left">
        <div className="profile-photo">photo</div>
        <button className="edit-btn">Add Profile </button>
      </div>

      {/* Right Section */}
      <div className="profile-right">
        {!isEditing ? (
          <div className="info-box">
            <p>
              User details from the database cannot be changed. Personal details
              can be updated using the Edit button below.
            </p>
            <div className="user-info">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>First Name:</strong> {user.firstName || "N/A"}</p>
              <p><strong>Last Name:</strong> {user.lastName || "N/A"}</p>
              <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
              <p><strong>Address:</strong> {user.address || "N/A"}</p>
            </div>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        ) : (
          <div className="edit-form">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <div className="form-actions">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
