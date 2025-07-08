import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUser(data[0])); // Only first record
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">

      <button className="back-btn" onClick={() => navigate('/')}>← Welcome, {user.name}</button>

      <div className="profile-card">
        <div className="user-info-left">
          <div className="avatar-circle">
            {user.name.split(' ')[0][0]}{user.name.split(' ')[1]?.[0]}
          </div>
          <p className="user-email">{user.email}</p>
        </div>

        <div className="user-fields">
          <div className="row">
            <div>
              <div className="label">User ID</div>
              <div className="value">{user.id}</div>
            </div>
            <div>
              <div className="label">Name</div>
              <div className="value">{user.name}</div>
            </div>
          </div>

          <div className="row">
            <div>
              <div className="label">Email ID</div>
              <div className="value">{user.email}</div>
            </div>
            <div>
              <div className="label">Address</div>
              <div className="value">{user.address.street}, {user.address.city}</div>
            </div>
          </div>

          <div className="row">
            <div>
              <div className="label">Phone</div>
              <div className="value">{user.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
