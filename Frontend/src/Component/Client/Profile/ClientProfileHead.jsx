import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { User, LogOut, Camera, Edit2, Mail, Phone, MapPin, Calendar, CheckCircle } from "lucide-react";

export default function ClientProfileHead() {
  const [modal, setModal] = useState(false);
  const [client, setClient] = useState(null);
  const [formData, setFormData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const clientId = localStorage.getItem("clientId");

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    if (clientId) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/Client/Profile/${clientId}`)
        .then((res) => {
          setClient(res.data);
          setFormData(res.data); 
        })
        .catch((err) => console.error(err));
    }
  }, [clientId]);

  if (!client) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500 font-medium flex items-center gap-2">
          <i className="fa-solid fa-circle-notch fa-spin text-primary"></i> Loading your profile...
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (profilePic) {
        const photoData = new FormData();
        photoData.append("image", profilePic);
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/profile/upload/client/${clientId}`,
          photoData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      const body = {
        fullName: formData.fullName || "",
        dob: formData.dob || "",
        gender: formData.gender || "",
        emailId: formData.emailId || "",
        mobileNo: formData.mobileNo || "",
        address: {
          street: formData.address?.street || "",
          city: formData.address?.city || "",
          state: formData.address?.state || "",
          country: formData.address?.country || "",
          postalCode: formData.address?.postalCode || "",
        },
      };

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/Client/Profile/Update/${clientId}`,
        body
      );

      setClient(res.data);
      toast.success("Profile updated successfully!");
      toggleModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Profile</h1>
          <button
            onClick={() => {
              localStorage.removeItem("clientId");
              localStorage.removeItem("clientIsLogin");
              toast.success("Logout Successfully");
              setTimeout(() => (window.location.href = "/Client/Auth"), 800);
            }}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Profile Overview Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group shrink-0">
              <img
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-50 shadow-sm"
                src={client.profilePic || '/favicon.png'}
                alt="profile"
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{client.fullName}</h2>
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1"><Calendar size={14} className="text-primary"/> Joined {new Date(client.createdAt).toLocaleDateString('en-GB')}</span>
                <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-500"/> Verified Client</span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto">
               <button
                  onClick={toggleModal}
                  className="flex items-center gap-2 bg-primary text-white hover:bg-primary-hover px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <User className="text-primary" size={20} />
                Personal Information
              </h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</p>
                  <p className="text-gray-900 font-medium">{client.fullName || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Date of Birth</p>
                  <p className="text-gray-900 font-medium">{client.dob || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Gender</p>
                  <p className="text-gray-900 font-medium capitalize">{client.gender || "-"}</p>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Email Address</p>
                    <p className="text-gray-900 font-medium">{client.emailId || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Phone Number</p>
                    <p className="text-gray-900 font-medium">{client.mobileNo || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="text-primary" size={20} />
                Address Details
              </h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="col-span-2">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Street Address</p>
                  <p className="text-gray-900 font-medium">{client.address?.street || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">City</p>
                  <p className="text-gray-900 font-medium">{client.address?.city || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">State</p>
                  <p className="text-gray-900 font-medium">{client.address?.state || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Country</p>
                  <p className="text-gray-900 font-medium">{client.address?.country || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Postal Code</p>
                  <p className="text-gray-900 font-medium">{client.address?.postalCode || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {modal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 bg-gray-900/40 backdrop-blur-sm" onClick={toggleModal}>
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Edit Profile
                </h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="relative group">
                    <img
                      src={profilePic ? URL.createObjectURL(profilePic) : (client.profilePic || '/favicon.png')}
                      alt="preview"
                      className="h-24 w-24 rounded-full object-cover border-4 border-gray-50 shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <label className="cursor-pointer">
                        <Camera className="text-white" size={24} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Click image to change</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      name="mobileNo"
                      value={formData.mobileNo || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all"
                    />
                  </div>
                  
                  <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-100">
                     <h4 className="font-semibold text-gray-900 mb-4">Address Information</h4>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address?.street || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address?.city || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address?.state || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      name="address.country"
                      value={formData.address?.country || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="address.postalCode"
                      value={formData.address?.postalCode || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="px-6 py-2.5 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover shadow-sm transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
