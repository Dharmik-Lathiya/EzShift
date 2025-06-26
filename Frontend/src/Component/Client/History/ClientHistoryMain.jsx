import React from "react";
const data = [
  {
    date: "2025-06-26",
    origin: "Rajkot",
    destination: "Ahmedabad",
    vehicle: "Tata Ace",
    works: "Furniture Shift",
    driverName: "Ravi Patel",
    mobileNumber: "9876543210",
    cost: "₹1500",
  },
  {
    date: "2025-06-26",
    origin: "Rajkot",
    destination: "Ahmedabad",
    vehicle: "Tata Ace",
    works: "Furniture Shift",
    driverName: "Ravi Patel",
    mobileNumber: "9876543210",
    cost: "₹1500",
  },
  {
    date: "2025-06-26",
    origin: "Rajkot",
    destination: "Ahmedabad",
    vehicle: "Tata Ace",
    works: "Furniture Shift",
    driverName: "Ravi Patel",
    mobileNumber: "9876543210",
    cost: "₹1500",
  },
  {
    date: "2025-06-26",
    origin: "Rajkot",
    destination: "Ahmedabad",
    vehicle: "Tata Ace",
    works: "Furniture Shift",
    driverName: "Ravi Patel",
    mobileNumber: "9876543210",
    cost: "₹1500",
  },
  {
    date: "2025-06-26",
    origin: "Rajkot",
    destination: "Ahmedabad",
    vehicle: "Tata Ace",
    works: "Furniture Shift",
    driverName: "Ravi Patel",
    mobileNumber: "9876543210",
    cost: "₹1500",
  },
  {
    date: "2025-06-26",
    origin: "Rajkot",
    destination: "Ahmedabad",
    vehicle: "Tata Ace",
    works: "Furniture Shift",
    driverName: "Ravi Patel",
    mobileNumber: "9876543210",
    cost: "₹1500",
  },
  {
    date: "2025-06-26",
    origin: "Rajkot",
    destination: "Ahmedabad",
    vehicle: "Tata Ace",
    works: "Furniture Shift",
    driverName: "Ravi Patel",
    mobileNumber: "9876543210",
    cost: "₹1500",
  },
  {
    date: "2025-06-26",
    origin: "Rajkot",
    destination: "Ahmedabad",
    vehicle: "Tata Ace",
    works: "Furniture Shift",
    driverName: "Ravi Patel",
    mobileNumber: "9876543210",
    cost: "₹1500",
  },
  {
    date: "2025-06-26",
    origin: "Rajkot",
    destination: "Ahmedabad",
    vehicle: "Tata Ace",
    works: "Furniture Shift",
    driverName: "Ravi Patel",
    mobileNumber: "9876543210",
    cost: "₹1500",
  },
  {
    date: "2025-06-26",
    origin: "Rajkot",
    destination: "Ahmedabad",
    vehicle: "Tata Ace",
    works: "Furniture Shift",
    driverName: "Ravi Patel",
    mobileNumber: "9876543210",
    cost: "₹1500",
  },
  {
    date: "2025-06-26",
    origin: "Rajkot",
    destination: "Ahmedabad",
    vehicle: "Tata Ace",
    works: "Furniture Shift",
    driverName: "Ravi Patel",
    mobileNumber: "9876543210",
    cost: "₹1500",
  },
];
export default function ClientHistoryMain() {
  return (
    <section className="py-20 px-10">
      <div className="mb-5">
        <h1 className="text-4xl font-semibold">My moves</h1>
      </div>
      <div className=" flex items-center w-full ">
        <form action="/search " className="bg-sky-100 mb-5 rounded-lg p-1 text-lg w-full flex items-center" >
          <i class="fa-solid fa-magnifying-glass m-3"></i>
          <input type="text" name="" id="" placeholder="Search by address" className="flex-1 bg-transparent focus:outline-none px-2 py-1" />
        </form>
      </div>
      <div className="border-1 border-black rounded-lg overflow-x-auto">
        <table className="w-full divide-y divide-gray-300">
          <thead className="text-left">
            <tr className="  bg-sky-100">
              <th className="px-6 py-4  whitespace-nowrap text-lg text-gray-900">date</th>
              <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">origin</th>
              <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">destination</th>
              <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">vehicle</th>
              <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">works</th>
              <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">Driver name</th>
              <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">mobile number</th>
              <th className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">cost</th>
            </tr>
          </thead>
          <tbody className="divide-y-1 ">
            {data.map((person, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{person.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{person.origin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{person.destination}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{person.vehicle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{person.works}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{person.driverName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{person.mobileNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-sky-700">{person.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
