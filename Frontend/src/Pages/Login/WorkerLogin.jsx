import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function WorkerLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    mobileno: "",
    email: "",
    password: "",
  });

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullname: "",
      mobileno: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const loginPromise = fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }).then(async (res) => {
    const result = await res.json();
    if (!res.ok || !result.status) throw new Error(result.message || "Login failed");
    return result;
  });

  toast.promise(loginPromise, {
    loading: "Logging in...",
    success: (result) => {
      if (result.data.role === "admin") {
        localStorage.setItem("adminId", result.data.userId);
        localStorage.setItem("adminIsLogin", true);
        setTimeout(() => (window.location.href = "/Admin"), 1000);
        return "Admin login successful!";
      } else {
        localStorage.setItem("workerId", result.data.userId);
        localStorage.setItem("workerIsLogin", true);
        setTimeout(() => (window.location.href = "/Worker"), 1000);
        return "Worker login successful!";
      }
    },
    error: (err) => err.message || "Login failed",
  });
};



 const handleSignupSubmit = async (e) => {
  e.preventDefault();

  const signupPromise = fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/SignUp`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData),
  }).then(async (res) => {
    const result = await res.json();
    if (!res.ok || !result.status) {
      throw new Error(result.message || "Signup failed");
    }
    return result;
  });

  toast.promise(signupPromise, {
    loading: "Creating account...",
    success: (result) => {
      localStorage.setItem("workerId", result.data);
      localStorage.setItem("workerIsLogin", true);
      setTimeout(() => {
        window.location.href = "/Worker/SetupProfile";
      }, 1000);
      return "Signup successful!";
    },
    error: (err) => err.message || "Server error during signup",
  });
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Worker Login" : "Worker Sign Up"}
        </h2>

        {isLogin ? (
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition duration-200"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleSignupSubmit}>
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Mobile No</label>
              <input
                type="tel"
                maxLength={10}
                inputMode="numeric"
                name="mobileno"
                placeholder="Enter Mobile No"
                value={formData.mobileno}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition duration-200"
            >
              Sign Up
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={handleModeSwitch}
            className="text-green-600 hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
