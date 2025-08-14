import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ClientLogin() {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/Client/Login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      

      if (response.ok && result.status) {
        toast.success("Login successful!");
        localStorage.setItem("clientId", result.data);
        localStorage.setItem("clientIsLogin", true);  
        setTimeout(() => {
          window.location.href = "/Client/Dashboard";
        }, 1000);
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (err) {
      toast.error("Server error during login");
      console.error(err);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/Client/SignUp", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData),
      });

      const result = await response.json();

      if (response.ok && result.status) {
        toast.success("Signup successful!");
        localStorage.setItem("clientId", result.data);
        localStorage.setItem("clientIsLogin", true);
        setTimeout(() => {
          window.location.href = "/Client/Dashboard";
        }, 1000);
      } else {
        toast.error(result.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Server error during signup");
      console.error(err);
    }
  };

  return (
    <>
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
                  name="fullname"
                  value={formData.fullname}
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
                  name="mobileno"
                  value={formData.mobileno}
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
    </>
  );
}
