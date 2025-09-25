import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// Using public fallback to avoid bundler path issues


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
          console.log(res.data);
          
          setClient(res.data);
          setFormData(res.data); 
        })
        .catch((err) => console.error(err));
    }
  }, [clientId]);

  if (!client) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading profile...</p>
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
      // 1) Upload photo if selected
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
    <section className="p-5 bg-gray-100 pb-10">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-sky-900">My Profile</h1>
        <button
          onClick={() => {
            localStorage.removeItem("clientId");
            localStorage.removeItem("clientIsLogin");
            toast.success("Logout Successfully");
            setTimeout(() => (window.location.href = "/Client/Auth"), 800);
          }}
          className="text-xl bg-white p-2 px-3 rounded-md shadow hover:text-white hover:bg-sky-500 transition-all"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>

      {/* Profile Card */}
      <div className="flex items-center bg-white rounded-lg shadow p-5">
        <div className="h-28 w-28 relative mr-6">
          <img
            className="w-full h-full rounded-full object-cover"
            src={client.profilePic || '/favicon.png'}
            alt="profile"
          />
          <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-sky-100">
            <i className="fas fa-camera text-gray-700 text-sm"></i>
          </div>
        </div>
        <div>
          <p className="text-sky-700 text-xl font-medium">{client.fullName}</p>
          {/* <p className="text-sm text-gray-600">{client.bio || "No bio set"}</p> */}
          <p className="text-sm text-gray-500">
            Joined: {new Date(client.createdAt).toLocaleDateString('en-GB')}
          </p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold text-sky-900">
            Personal Information
          </h2>
          <button
            onClick={toggleModal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded flex items-center gap-1 text-sm"
          >
            <i className="fa-solid fa-pen-to-square"></i>
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-sm">
          <div>
            <p className="text-gray-400">Full Name</p>
            <p className="text-black font-semibold">{client.fullName}</p>
          </div>
          <div>
            <p className="text-gray-400">Date of Birth</p>
            <p className="text-black font-semibold">{client.dob}</p>
          </div>
          <div>
            <p className="text-gray-400">Gender</p>
            <p className="text-black font-semibold">{client.gender}</p>
          </div>
          <div>
            <p className="text-gray-400">Email Address</p>
            <p className="text-black font-semibold">{client.emailId}</p>
          </div>
          <div>
            <p className="text-gray-400">Phone</p>
            <p className="text-black font-semibold">{client.mobileNo}</p>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <section className="p-6 bg-white mt-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-sky-900 border-b pb-3 mb-4">
          Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-sm">
          <div>
            <p className="text-gray-400">Street</p>
            <p className="text-black font-semibold">{client.address?.street}</p>
          </div>
          <div>
            <p className="text-gray-400">City</p>
            <p className="text-black font-semibold">{client.address?.city}</p>
          </div>
          <div>
            <p className="text-gray-400">State</p>
            <p className="text-black font-semibold">{client.address?.state}</p>
          </div>
          <div>
            <p className="text-gray-400">Country</p>
            <p className="text-black font-semibold">{client.address?.country}</p>
          </div>
          <div>
            <p className="text-gray-400">Postal Code</p>
            <p className="text-black font-semibold">
              {client.address?.postalCode}
            </p>
          </div>
        </div>
      </section>

      {/* Edit Modal */}
      {modal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 px-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <div className="flex justify-between items-center border-b pb-3 mb-5">
              <h3 className="text-lg font-semibold text-sky-900">
                Edit Profile
              </h3>
              <button
                onClick={toggleModal}
                className="hover:text-white hover:bg-sky-500 transition-all p-2 rounded-md"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
              onSubmit={handleSave}
            >
              <div className="md:col-span-2">
                <label className="text-gray-500">Profile Image</label>
                {profilePic ? (
                  <img
                    src={URL.createObjectURL(profilePic)}
                    alt="preview"
                    className="mt-2 h-20 w-20 rounded-full object-cover"
                  />
                ) : client.profilePic ? (
                  <img
                    src={client.profilePic}
                    alt="current"
                    className="mt-2 h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src={'/favicon.png'}
                    alt="fallback"
                    className="mt-2 h-20 w-20 rounded-full object-cover"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border rounded px-3 py-2"
                />
                
              </div>

              <div>
                <label className="text-gray-500">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="text-gray-500">DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="text-gray-500">Email</label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="text-gray-500">Phone</label>
                <input
                  type="text"
                  name="mobileNo"
                  value={formData.mobileNo || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-gray-500">Street</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address?.street || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="text-gray-500">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address?.city || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="text-gray-500">State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address?.state || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="text-gray-500">Country</label>
                <input
                  type="text"
                  name="address.country"
                  value={formData.address?.country || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="text-gray-500">Postal Code</label>
                <input
                  type="text"
                  name="address.postalCode"
                  value={formData.address?.postalCode || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-black"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
