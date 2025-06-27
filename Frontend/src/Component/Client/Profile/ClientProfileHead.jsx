import React, { useState } from "react";
import profilepicture from "../../../assets/profilepicture.avif";

export default function ClientProfileHead() {
  const [modal, setModal] = useState(false);
  const popUp = () => {
    setModal(!modal);
  };
  
  if(modal){
    document.body.style.overflow = "hidden";
  }else{
     document.body.style.overflow = "auto";
  }

  return (
    <section className="p-5 bg-gray-200 pb-10">
      <div>
        <div className="p-5 flex items-center">
          <p className="text-3xl text-sky-900 font-semibold w-2xs md:text-4xl">
            My Profile
          </p>
          <div className="border-t-1 border-gray-500 w-lg rounded-full md:w-full lg:full"></div>
          <div className=" m-5 text-xl bg-white p-2 pl-3 pr-3 rounded-md hover:text-white hover:bg-sky-500 transition-all duration-400 ease-in-out">
            <i class="fa-solid fa-right-from-bracket"></i>
          </div>
        </div>
        <div className="flex items-center  bg-white rounded-lg">
          <div className="h-25 w-25 relative m-5">
            <img
              className="w-full h-full rounded-full object-cover"
              src={profilepicture}
              alt=""
            />
            <div className="absolute bottom-0 right-0 bg-white p-0.5 rounded-full shadow">
              <i className="fas fa-camera text-gray-700 text-sm m-1.5"></i>
            </div>
          </div>
          <div>
            <p className="text-sky-700 text-xl">Dharmik Lathiya</p>
            <p className="text-sm">Founder, Tevron infotech</p>
            <p className="text-sm">kirti patel nu Bheshan</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 mt-10">
          <div className="flex justify-between items-center border-b-1 border-gray-400 pb-4 mb-4">
            <h2 className="text-lg font-semibold text-sky-900">
              Personal Information
            </h2>
            <button
              onClick={popUp}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded flex items-center gap-1 text-sm "
            >
              <i class="fa-solid fa-pen-to-square text-white"></i>
              Edit
            </button>
            {modal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 pl-6 pr-6 bg-black/30 backdrop-blur-xsm ">
                <div className="bg-white rounded-lg shadow-lg p-6 w-sm md:w-md lg:w-lg relative ">
                  <div className="  text-right border-b-1 border-gray-400 pb-2 mb-5 ">
                    <button onClick={popUp} className="hover:text-white hover:bg-sky-500 transition-all duration-400 ease-in-out pt-2 pb-2 pl-3 pr-3 rounded-md">
                      <i class="fa-solid fa-xmark text-2xl "></i>
                    </button>
                  </div>
                  <div className="md:grid grid-cols-2 md:gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="FirstName" className="text-gray-400">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="FirstName"
                        defaultValue="dharmik"
                        className="text-black font-semibold"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="LastName" className="text-gray-400">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="LastName"
                        name="LastName"
                        defaultValue="lathiya"
                        className="text-black font-semibold"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="DateOfBirth" className="text-gray-400">
                        Date Of Birth 
                      </label>
                      <input
                        type="text"
                        id="DateOfBirth"
                        name="DateOfBirth"
                        defaultValue="12-07-2006"
                        className="text-black font-semibold"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="EmailAddress" className="text-gray-400">
                        E-mail Address
                      </label>
                      <input
                        type="text"
                        id="EmailAddress"
                        name="EmailAddress"
                        defaultValue="dharmiklathiya@gmail.com"
                        className="text-black font-semibold"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="Phone" className="text-gray-400">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="Phone"
                        name="Phone"
                        defaultValue="9876543210"
                        className="text-black font-semibold"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="UserRole" className="text-gray-400">
                        User Role
                      </label>
                      <input
                        type="text"
                        id="UserRole"
                        name="UserRole"
                        defaultValue="User"
                        className="text-black font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-y-6 md:gap-x-10 gap-x-5 gap-y-5 text-sm">
            <div>
              <p className="text-gray-400">Last Name</p>
              <p className="text-black font-semibold">Lathiya</p>
            </div>

            <div>
              <p className="text-gray-400">Last Name</p>
              <p className="text-black font-semibold">Lathiya</p>
            </div>

            <div>
              <p className="text-gray-400">Date Of Birth</p>
              <p className="text-black font-semibold">12-07-2006</p>
            </div>

            <div>
              <p className="text-gray-400">E-mail Address</p>
              <p className="text-black font-semibold">
                dharmiklathiya@gmail.com
              </p>
            </div>

            <div>
              <p className="text-gray-400">Phone</p>
              <p className="text-black font-semibold">9876543210</p>
            </div>

            <div>
              <p className="text-gray-400">User Role</p>
              <p className="text-black font-semibold">User</p>
            </div>
          </div>
        </div>
        <section className="p-5 bg-white mt-5 rounded-lg">
          <div className=" items-center border-b-1 border-gray-400 pb-4 mb-4">
            <h2 className="text-lg font-semibold text-sky-900">Address</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-y-6 md:gap-x-10 gap-x-5 gap-y-5 text-sm">
            <div>
              <p className="text-gray-400">Country</p>
              <p className="text-black font-semibold">India</p>
            </div>

            <div>
              <p className="text-gray-400">City</p>
              <p className="text-black font-semibold">Rajkot</p>
            </div>

            <div>
              <p className="text-gray-400">Pin code</p>
              <p className="text-black font-semibold">360005</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
