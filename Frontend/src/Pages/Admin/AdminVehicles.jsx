import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.css"; 


export default function AdminVehicles() {
  const tableRef = useRef(null);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:3000/Admin/Vehicle/GetAll");
        if (res.data.success) {
          setVehicles(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

 useEffect(() => {
  if (vehicles.length > 0 && tableRef.current) {
    const table = $(tableRef.current).DataTable(); // init
    return () => {
      table.destroy();
    };
  }
}, [vehicles]);


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Vehicles</h2>
      <div className="overflow-x-auto">
        <table ref={tableRef} className="display" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Number Plate</th>
              <th>Model</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle.name}</td>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.numberPlate}</td>
                <td>{vehicle.model || "N/A"}</td>
                <td>{vehicle.capacity || "N/A"}</td>
                <td>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      color: "#fff",
                      backgroundColor:
                        vehicle.status === "Active" ? "green" : "red",
                    }}
                  >
                    {vehicle.status}
                  </span>
                </td>
                <td>{vehicle.ownerId?.name || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
