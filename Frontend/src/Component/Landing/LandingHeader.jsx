import React from 'react'
import logo from '../../assets/logo.png'

export default function LandingHeader() {
  return (
    <nav className="bg-slate-950">
        <div className="h-16 p-12 w-full flex justify-between items-center px-6">
            <div className="w-fit">
                <img className="lg:h-15 lg:w-40 h-10 w30 cursor-pointer"
                    src={logo} alt="Logo" />
            </div>
            <div className="md:block hidden">
                <ul className="flex justify-between text-md lg:text-lg">
                    <li
                        className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
                        features</li>
                    <li
                        className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
                        technologies</li>
                    <li
                        className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
                        contact us</li>
                    <li
                        className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
                        about us</li>
                </ul>
            </div>
            <div>
                <button
                    className=" text-white lg:px-6 lg:py-1.5 px-3 py-0.5 rounded-md text-md cursor-pointer bg-gradient-to-r from-pink-400 to-indigo-600 transition delay-150 duration-200 ease-in-out m-1 md:m-2"
                    ><a href='http://localhost:5173/Worker/Auth'>Start As Worker</a></button>
                <button
                    className=" text-white lg:px-6 lg:py-1.5 px-3 py-0.5 rounded-md text-md cursor-pointer bg-gradient-to-r from-pink-400 to-indigo-600 transition delay-150 duration-200 ease-in-out m-1 md:m-2"
                    ><a href='http://localhost:5173/Client/Auth'>Get Start</a></button>
            </div>
        </div>
    </nav>
  )
}
