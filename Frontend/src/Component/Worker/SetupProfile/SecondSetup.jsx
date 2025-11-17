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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Select Your City</h2>

        {/* Custom Dropdown */}
        <div className="relative mb-4">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-gray-700 shadow-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-500 transition"
          >
            <span className="flex items-center gap-2">
              <FaCity className="text-blue-500" />
              {selectedCity || "-- Choose a city --"}
            </span>
            <FaChevronDown
              className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto">
              {/* Search box */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 sticky top-0 bg-white">
                <FaSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full outline-none text-gray-700"
                />
              </div>

              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`px-4 py-2 cursor-pointer flex items-center gap-2 hover:bg-blue-100 ${
                      selectedCity === city
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : ""
                    }`}
                  >
                    <FaCity className="text-gray-500" />
                    {city}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 text-sm">
                  No cities found
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
