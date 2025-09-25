import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import LandingHeader from '../../Component/Landing/LandingHeader';
import LandingFooter from '../../Component/Landing/LandingFooter';

export default function ClientLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    email: "",
    password: "",
  });

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: "",
      mobileNo: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const btn = e.nativeEvent.submitter;
  btn.disabled = true;

  const loginPromise = fetch(`${import.meta.env.VITE_BACKEND_URL}/Client/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      email: formData.email,
      password: formData.password,
    }),
  }).then(async (res) => {
    const result = await res.json();
    if (!res.ok || !result.status) {
      throw new Error(result.message || "Login failed");
    }
    return result;
  });

  toast.promise(loginPromise, {
    loading: "Logging in...",
    success: (result) => {
      localStorage.setItem("clientId", result.data);
      localStorage.setItem("clientIsLogin", true);
      setTimeout(() => {
        window.location.href = "/Client/Dashboard";
      }, 1000);
      return "Login successful!";
    },
    error: (err) => {
      btn.disabled = false;
      return err.message || "Server error during login";
    },
  });
};
  

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const btn = e.nativeEvent.submitter;
    btn.disabled = true;

    const signupPromise = fetch(`${import.meta.env.VITE_BACKEND_URL}/Client/SignUp`, {
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
        localStorage.setItem("clientId", result.data);
        localStorage.setItem("clientIsLogin", true);
        setTimeout(() => {
          window.location.href = "/Client/Dashboard";
        }, 1000);
        return "Signup successful!";
      },
      error: (err) => {
      btn.disabled = false;
      return err.message || "Server error during Signup";
    },
    });
  };


  return (
    <>
    <LandingHeader/>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? "Login to Your Account" : "Create an Account"}
          </h2>

          {isLogin ? (
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                Login
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleSignupSubmit}>
              <div>
                <label className="block text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Mobile No</label>
                <input
                  type="tel"
                  maxLength={10}
                  inputMode="numeric"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={(e) => {
                    if (/^\d{0,10}$/.test(e.target.value)) handleChange(e);
                  }}
                  placeholder="Enter Mobile No"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                Sign Up
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={handleModeSwitch}
              className="text-blue-600 hover:underline font-medium"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
      <LandingFooter/>
    </>
  );
}
