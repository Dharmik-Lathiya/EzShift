import React, { useEffect, useState } from 'react';
import { 
  Pencil, 
  Save, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Shield, 
  Clock, 
  Globe,
  Camera,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";

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
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [earning, setEarning] = useState(0);
  const [trips, setTrips] = useState(0);

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
          earning: data.earning || 0,
          trips: data.trips.length || 0,
        });
      } catch (err) {
        console.error(err);
        setMessage({ type: 'error', text: 'Failed to load profile' });
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
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size should be less than 5MB' });
        return;
      }
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/Profile/Edit/${workerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...profile,
          avatar: imageFile ? URL.createObjectURL(imageFile) : profile.avatar,
        }),
      });
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setEditMode(false);
        setImageFile(null);
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' });
    }
    setSaving(false);
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {message.text}
            <button 
              onClick={() => setMessage({ type: '', text: '' })}
              className="ml-auto"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              {/* Header with Edit Button */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                  <p className="text-gray-600 mt-1">Update your profile details</p>
                </div>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    editMode 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <Pencil size={16} />
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="relative group">
                  <div className="relative">
                    <img
                      src={preview || profile.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-purple-100 shadow-lg"
                    />
                    {editMode && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <label className="cursor-pointer">
                          <Camera size={24} className="text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  {preview && editMode && (
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
                
                <div className="flex-1 w-full">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={profile.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <p className="text-xl font-semibold text-gray-800">{profile.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {editMode ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profile.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <p className="text-gray-700 flex items-center gap-2">
                          <Phone size={18} className="text-purple-600" />
                          {profile.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <p className="text-gray-700 flex items-center gap-2">
                      <Mail size={18} className="text-purple-600" />
                      {profile.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      profile.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-gray-700 font-medium">{profile.status}</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {editMode ? (
                  <div className="space-y-3">
                    <textarea
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="Enter your address"
                    />
                    <input
                      type="text"
                      name="city"
                      value={profile.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="Enter your city"
                    />
                  </div>
                ) : (
                  <p className="text-gray-700 flex items-start gap-2">
                    <MapPin size={18} className="text-purple-600 mt-1" />
                    {profile.address}, {profile.city}
                  </p>
                )}
              </div>

              {/* Save Button */}
              {editMode && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            {/* Account Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield size={20} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Account Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    profile.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {profile.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since</span>
                  <span className="text-gray-800 font-medium">2024</span>
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User size={20} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Preferences</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Language</span>
                  <span className="text-gray-800 font-medium">English</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time Zone</span>
                  <span className="text-gray-800 font-medium">IST (GMT+5:30)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Notifications</span>
                  <span className="text-gray-800 font-medium">Enabled</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-200 text-slate-800 bg-opacity-20 rounded-lg">
                  <Clock size={20} />
                </div>
                <h3 className="text-lg font-semibold">Quick Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Total Trips</span>
                  <span className="font-bold">{profile.trips}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Total Earnings</span>
                  <span className="font-bold">₹{profile.earning.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Rating</span>
                  <span className="font-bold">4.8 ⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
