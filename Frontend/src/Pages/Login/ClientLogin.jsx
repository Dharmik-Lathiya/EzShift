import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import LandingHeader from '../../Component/Landing/LandingHeader';
import LandingFooter from '../../Component/Landing/LandingFooter';
import { User, Phone, Mail, Lock } from 'lucide-react';

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
      <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16 sm:py-20">
        <div className="w-full max-w-sm">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 text-center tracking-tight">
              {isLogin ? "Log in" : "Create your account"}
            </h1>
            <p className="text-center text-sm text-gray-500 mt-1.5 mb-8">
              {isLogin ? "Book a truck and track it live." : "Book your next move in minutes."}
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
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <Field
                  icon={Lock}
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  Log in
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
                  placeholder="Your full name"
                  autoComplete="name"
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
                  placeholder="Your mobile number"
                  autoComplete="tel"
                  required
                />
                <Field
                  icon={Mail}
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                <Field
                  icon={Lock}
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  Create account
                </button>
              </form>
            )}

            <p className="text-center text-sm text-gray-500 mt-7">
              {isLogin ? "New to EzShift?" : "Already have an account?"}{" "}
              <button
                onClick={handleModeSwitch}
                className="text-primary hover:text-primary-hover font-medium"
              >
                {isLogin ? "Create an account" : "Log in"}
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            5,100+ deliveries completed this year
          </p>
        </div>
      </section>
      <LandingFooter/>
    </>
  );
}
