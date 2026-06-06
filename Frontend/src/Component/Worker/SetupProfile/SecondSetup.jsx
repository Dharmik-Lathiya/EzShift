import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaChevronDown, FaCity, FaSearch } from "react-icons/fa";

export default function SecondSetup() {
  const [selectedCity, setSelectedCity] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const cities = [
    "Mumbai","Delhi","Bengaluru","Kolkata","Chennai","Hyderabad","Ahmedabad","Pune",
    "Surat","Jaipur","Lucknow","Kanpur","Nagpur","Indore","Bhopal","Patna",
    "Varanasi","Agra","Nashik","Vadodara","Rajkot","Amritsar","Coimbatore","Madurai",
    "Thiruvananthapuram","Kochi","Visakhapatnam","Vijayawada","Mysuru","Chandigarh",
    "Guwahati","Ranchi","Bhubaneswar","Jodhpur","Gwalior","Meerut"
  ];

  // Filter cities based on search input
  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCity) {
      alert("Please select a city.");
      return;
    }

    const workerId = localStorage.getItem("workerId");
    if (!workerId) {
      alert("Worker not found. Please log in again.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Worker/Profile/Edit/${workerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            city: selectedCity,
          },
        }),
      });

      if (!res.ok) {
        console.error("Failed to save city", await res.text());
        alert("Failed to save city. Please try again.");
        setSaving(false);
        return;
      }

      console.log("Selected city saved:", selectedCity);
      navigate("/Worker/SetupProfile/VehicleType");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving your city.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 w-full max-w-lg"
      >
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <FaCity className="text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Where are you based?</h2>
          <p className="text-gray-500 text-sm">Select your primary city of operation to find relevant trips.</p>
        </div>

        {/* Custom Dropdown */}
        <div className="relative mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`flex items-center justify-between w-full border ${open ? 'border-primary ring-2 ring-blue-50' : 'border-gray-300'} bg-white rounded-lg px-4 py-3 text-gray-700 shadow-sm transition-all focus:outline-none`}
          >
            <span className="flex items-center gap-2">
              {selectedCity ? (
                <span className="font-medium text-gray-900">{selectedCity}</span>
              ) : (
                <span className="text-gray-400">Select a city...</span>
              )}
            </span>
            <FaChevronDown
              className={`text-gray-400 transition-transform ${open ? "rotate-180 text-primary" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto">
              {/* Search box */}
              <div className="flex items-center gap-2 px-3 py-3 border-b border-gray-100 sticky top-0 bg-white">
                <FaSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full outline-none text-gray-700 text-sm"
                />
              </div>

              <div className="py-1">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <div
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setOpen(false);
                        setSearch("");
                      }}
                      className={`px-4 py-2.5 cursor-pointer flex items-center text-sm transition-colors ${
                        selectedCity === city
                          ? "bg-primary-light text-primary font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {city}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-sm text-center">
                    No cities found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-70"
        >
          {saving ? 'Saving...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
