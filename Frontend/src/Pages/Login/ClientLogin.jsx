import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import LandingHeader from '../../Component/Landing/LandingHeader';
import LandingFooter from '../../Component/Landing/LandingFooter';
import logo from '../../assets/logo.png';
import { User, Phone, Mail, Lock, Truck, Check } from 'lucide-react';

function Field({ icon, label, ...props }) {
  const Icon = icon;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          {...props}
          className="w-full bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-lg pl-10 pr-3.5 py-2.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
      </div>
    </div>
  );
}

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
      <div className="min-h-screen bg-slate-50 relative flex items-center justify-center px-4 py-16 sm:py-20 overflow-hidden">
        {/* Soft brand accents */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 -right-24 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>

        <div className="relative w-full max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/70 overflow-hidden grid md:grid-cols-2">
            {/* Brand panel (desktop) */}
            <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-primary via-sky-500 to-indigo-600 p-10 text-white">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Truck size={22} className="text-white" />
                  </span>
                  <span className="text-2xl font-bold tracking-tight">EzShift</span>
                </div>
                <h2 className="mt-14 text-3xl font-bold leading-tight">Move smarter, not harder</h2>
                <p className="mt-3 text-white/80 leading-relaxed">
                  Book a truck and helpers in minutes. Real-time tracking from pickup to drop.
                </p>
              </div>
              <ul className="mt-10 space-y-3.5">
                {[
                  'Instant quotes based on distance',
                  'Live trip tracking from start to finish',
                  'Secure payments and digital receipts',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-white/90">
                    <Check size={17} className="mt-0.5 shrink-0 text-white" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form panel */}
            <div className="p-8 sm:p-10">
              <div className="md:hidden flex justify-center mb-6">
                <img src={logo} alt="EzShift" className="h-10 w-auto object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">
                {isLogin ? "Login to Your Account" : "Create an Account"}
              </h2>
              <p className="text-center md:text-left text-sm text-gray-500 mt-1.5 mb-8">
                {isLogin ? "Sign in to continue moving" : "Join EzShift and move smarter"}
              </p>

              {isLogin ? (
                <form className="space-y-4" onSubmit={handleLoginSubmit} noValidate>
                  <Field
                    icon={Mail}
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                  />
                  <Field
                    icon={Lock}
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-primary/20 transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    Login
                  </button>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={handleSignupSubmit} noValidate>
                  <Field
                    icon={User}
                    label="Full Name"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    required
                  />
                  <Field
                    icon={Phone}
                    label="Mobile No"
                    type="tel"
                    maxLength={10}
                    inputMode="numeric"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={(e) => {
                      if (/^\d{0,10}$/.test(e.target.value)) handleChange(e);
                    }}
                    placeholder="Enter Mobile No"
                    required
                  />
                  <Field
                    icon={Mail}
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                  />
                  <Field
                    icon={Lock}
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-primary/20 transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    Sign Up
                  </button>
                </form>
              )}

              <p className="text-center text-sm text-gray-500 mt-6">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={handleModeSwitch}
                  className="text-primary hover:text-primary-hover font-medium"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <LandingFooter/>
    </>
  );
}
