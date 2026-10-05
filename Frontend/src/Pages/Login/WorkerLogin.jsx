import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import LandingHeader from '../../Component/Landing/LandingHeader';
import LandingFooter from '../../Component/Landing/LandingFooter';
import { User, Phone, Mail, Lock } from 'lucide-react';

function Field({ icon, label, error, className, ...props }) {
  const Icon = icon;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          {...props}
          className={`w-full bg-white border text-gray-900 placeholder:text-gray-400 rounded-lg pl-10 pr-3.5 py-2.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition ${
            error ? 'border-red-400' : 'border-gray-300'
          } ${className || ''}`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

export default function WorkerLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    mobileno: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobileno) => {
    // 10 digit number
    return /^\d{10}$/.test(mobileno);
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }
    if (!formData.mobileno.trim()) {
      newErrors.mobileno = "Mobile number is required";
    } else if (!validateMobile(formData.mobileno)) {
      newErrors.mobileno = "Mobile number must be 10 digits";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullname: "",
      mobileno: "",
      email: "",
      password: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    const btn = e.nativeEvent.submitter;
    btn.disabled = true;

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
      error: (err) => {
        btn.disabled = false;
        return err.message || "Server Error during login";
      },
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    const btn = e.nativeEvent.submitter;
    btn.disabled = true;

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
              {isLogin ? "Log in" : "Join as a worker"}
            </h1>
            <p className="text-center text-sm text-gray-500 mt-1.5 mb-8">
              {isLogin ? "Pick up jobs near you, on your schedule." : "Create your account to start taking trips."}
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
                  error={errors.email}
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
                  error={errors.password}
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
                  placeholder="Your full name"
                  autoComplete="name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  error={errors.fullname}
                  required
                />
                <Field
                  icon={Phone}
                  label="Mobile No"
                  type="tel"
                  maxLength={10}
                  inputMode="numeric"
                  autoComplete="tel"
                  name="mobileno"
                  placeholder="Your mobile number"
                  value={formData.mobileno}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  error={errors.mobileno}
                  required
                />
                <Field
                  icon={Mail}
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
                <Field
                  icon={Lock}
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
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
                {isLogin ? "Join as a worker" : "Log in"}
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Earn on every trip you complete
          </p>
        </div>
      </section>
      <LandingFooter/>
    </>
  );
}
