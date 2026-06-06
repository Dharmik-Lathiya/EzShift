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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image size should be less than 5MB" });
      return;
    }
  
    setPreview(URL.createObjectURL(file));
    setImageFile(file);
  
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/profile/upload/worker/${workerId}`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      const result = await res.json();
  
      if (res.ok && result.success) {
        setMessage({ type: "success", text: "Uploaded successfully!" });

        if (result.data && (result.data.avatar || result.data.profilePic)) {
          const url = result.data.avatar || result.data.profilePic;
          setPreview(url);
          setProfile((p) => ({ ...p, avatar: url }));
        }

        setImageFile(null);
      } else {
        setMessage({ type: "error", text: result.error || "Upload failed" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Something went wrong while uploading" });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    let data = {
      fullname: profile.name,
      mobileNo: profile.phone,
      address: profile.address,
      city: profile.city,
      emailId: profile.email,
      avatar: profile.avatar,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/Profile/Edit/${workerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
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
      <div className="min-h-full flex items-center justify-center">
        <div className="text-gray-500 font-medium flex items-center gap-2">
          <i className="fa-solid fa-circle-notch fa-spin text-primary"></i> Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="max-w-6xl mx-auto">
        
        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl flex items-center justify-between shadow-sm border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-3">
              {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span className="font-medium text-sm">{message.text}</span>
            </div>
            <button onClick={() => setMessage({ type: '', text: '' })} className="hover:opacity-70">
              <X size={16} />
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Profile Card */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Personal Information</h2>
                  <p className="text-sm text-gray-500 mt-1">Update your profile details and public information</p>
                </div>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm ${
                    editMode 
                      ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50' 
                      : 'bg-primary border border-transparent text-white hover:bg-primary-hover'
                  }`}
                >
                  <Pencil size={14} />
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <div className="p-8">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 pb-8 border-b border-gray-100">
                  <div className="relative group shrink-0">
                    <img
                      src={preview || profile.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-gray-50 shadow-sm"
                    />
                    {editMode && (
                      <div className="absolute inset-0 bg-gray-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
                    {preview && editMode && (
                      <button
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-sm border-2 border-white"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-1 w-full space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        {editMode ? (
                          <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-colors"
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-900">{profile.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        {editMode ? (
                          <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-colors"
                            placeholder="Enter your phone number"
                          />
                        ) : (
                          <p className="text-gray-700 flex items-center gap-2 py-1">
                            <Phone size={16} className="text-gray-400" />
                            {profile.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-colors"
                          placeholder="Enter your email"
                        />
                      ) : (
                        <p className="text-gray-700 flex items-center gap-2 py-1">
                          <Mail size={16} className="text-gray-400" />
                          {profile.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                      <div className="flex items-center gap-2 py-1">
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          profile.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-gray-700 font-medium">{profile.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    {editMode ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="address"
                          value={profile.address}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-colors"
                          placeholder="Street address"
                        />
                        <input
                          type="text"
                          name="city"
                          value={profile.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-primary outline-none transition-colors"
                          placeholder="City"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-700 flex items-start gap-2 py-1">
                        <MapPin size={16} className="text-gray-400 mt-0.5" />
                        {profile.address}{profile.address && profile.city ? ', ' : ''}{profile.city}
                      </p>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                {editMode && (
                  <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Quick Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
                  <Clock size={16} className="text-primary" />
                </div>
                <h3 className="font-bold text-gray-900">Quick Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium">Total Trips</span>
                  <span className="font-bold text-gray-900">{profile.trips}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium">Total Earnings</span>
                  <span className="font-bold text-gray-900">₹{profile.earning.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium">Rating</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-900">4.8</span>
                    <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Account Status Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Shield size={16} className="text-gray-500" />
                </div>
                <h3 className="font-bold text-gray-900">Account Details</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium">Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    profile.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {profile.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium">Member Since</span>
                  <span className="text-sm text-gray-900 font-semibold">2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium">Language</span>
                  <span className="text-sm text-gray-900 font-semibold">English</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
