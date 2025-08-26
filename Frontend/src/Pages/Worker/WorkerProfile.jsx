import React, { useEffect, useState } from 'react';
import { Pencil, Save, Mail, Phone, MapPin } from "lucide-react";

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
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/Profile/${workerId}`);
        const data = await res.json();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/Profile/Edit/${workerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...profile,
        avatar: imageFile ? URL.createObjectURL(imageFile) : profile.avatar,
      }),
    });
    setEditMode(false);
  };

  if (loading) return <div className="p-6 text-lg">Loading profile...</div>;

  return (
    <div className="p-6 flex justify-center bg-gray-50">
  <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Profile Card */}
    <div className="bg-white rounded-2xl shadow-lg p-6 relative border border-gray-100 hover:shadow-xl transition">
      {/* Edit Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-1 text-sm px-3 py-1 rounded-full 
          bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
        >
          <Pencil size={14} />
          {editMode ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Avatar + Info */}
      <div className="flex items-center h-40 gap-6">
        <img
          src={preview || profile.avatar || 'https://via.placeholder.com/80'}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-100 shadow-md"
        />
        <div className="flex-1">
          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block mb-2 text-sm"
            />
          )}
          {editMode ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-purple-500"
            />
          ) : (
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
          )}
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full mt-2 focus:ring-2 focus:ring-purple-500"
            />
          ) : (
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <Phone size={16} className="text-purple-600" /> {profile.phone}
            </p>
          )}
        </div>
      </div>

      {/* Save Button */}
      {editMode && (
        <button
          onClick={handleSave}
          className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-2 
          bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <Save size={16} /> Save Changes
        </button>
      )}
    </div>

    {/* Address Card */}
    <div className="bg-white rounded-2xl shadow-lg p-6 h-60 border border-gray-100 hover:shadow-xl transition">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <MapPin size={18} className="text-purple-600" /> Address
      </h3>
      {editMode ? (
        <>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="border rounded-lg w-full px-3 py-2 mb-2 focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="city"
            value={profile.city}
            onChange={handleChange}
            placeholder="City"
            className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-purple-500"
          />
        </>
      ) : (
        <div className="text-gray-700">
          <p className="flex items-start gap-2">
            <MapPin size={18} className="mt-1 text-purple-600" />
            {profile.address}, {profile.city}
          </p>
        </div>
      )}
    </div>

    {/* Contact Card */}
    <div className="bg-white rounded-2xl h-50 shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Mail size={18} className="text-purple-600" /> Contact
      </h3>
      {editMode ? (
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-purple-500"
        />
      ) : (
        <p className="text-gray-700 flex items-center gap-2">
          <Mail size={18} className="text-purple-600" /> {profile.email}
        </p>
      )}
    </div>

    {/* Account Settings Card */}
    <div className="bg-white h-100 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
      <h3 className="text-lg font-semibold mb-3">⚙️ Account Settings</h3>
      <p className="text-gray-700">
        Status: <span className="font-medium text-green-600">{profile.status}</span>
      </p>
      <p className="text-gray-700 mt-1">Language: English</p>
      <p className="text-gray-700">Time Zone: (GMT+5:30) India Standard Time</p>
    </div>
  </div>
</div>

  );
}
