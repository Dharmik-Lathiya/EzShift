import React, { useEffect, useState } from 'react';

export default function WorkerProfile() {
  const workerId = localStorage.getItem("workerId");

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    status: 'Active',
    avatar: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        console.log(workerId);
        
        const res = await fetch(`http://localhost:3000/Worker/Profile/${workerId}`);
        const data = await res.json();
        console.log(data);
        
        setProfile({
          name: data.fullname || '',
          email: data.emailId || '',
          phone: data.mobileNo || '',
          address: data.address || '',
          city: data.city || '',
          status: data.status || 'Active',
          avatar: data.avatar || '',
        });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [workerId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await fetch(`/api/worker/profile/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...profile, workerId }),
    });
    setEditMode(false);
  };

  if (loading) return <div className="p-6 text-lg">Loading profile...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profile */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your profile</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-sm text-purple-600 hover:underline"
            >
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">Joined {new Date().toLocaleDateString()}</p>

          <div className="mt-4 flex items-center space-x-4">
            <img
              src={profile.avatar || 'https://via.placeholder.com/60'}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-lg font-medium">{profile.name}</p>
              )}
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 w-full mt-1"
                />
              ) : (
                <p className="text-gray-600">{profile.phone}</p>
              )}
            </div>
          </div>
          {editMode && (
            <button
              onClick={handleSave}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Save
            </button>
          )}
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Address</h2>
          {editMode ? (
            <>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="border rounded w-full px-2 py-1 mb-2"
              />
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                placeholder="City"
                className="border rounded w-full px-2 py-1"
              />
            </>
          ) : (
            <>
              <p className="text-gray-700">{profile.address}</p>
              <p className="text-gray-500">{profile.city}</p>
            </>
          )}
        </div>

        {/* Emails */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Contect</h2>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
          ) : (
            <p className="text-gray-700">{profile.email}</p>
          )}
        </div>

        {/* Account Options */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Account Options</h2>
          <p className="text-gray-700">Status: {profile.status}</p>
          <p className="text-gray-700">Language: English</p>
          <p className="text-gray-700">Time zone: (GMT+5:30) India Standard Time</p>
        </div>
      </div>
    </div>
  );
}
