import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export default function LandingHeader() {
  return (
    <nav className="bg-slate-950 sticky top-0 z-50">
        <div className="h-16 p-12 w-full flex justify-between items-center px-6">
            <div className="w-fit">
                <img className="lg:h-15 lg:w-40 h-10 w30 cursor-pointer"
                    src={logo} alt="Logo" />
            </div>
            <div className="sm:block hidden">
                <ul className="flex justify-between text-md lg:text-lg">
                    <li
                        className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
                        <Link to="/#Features-Section">Features</Link></li>
                    <li
                        className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
                        <Link to="/#Tool-Section">Tools</Link></li>
                    <li
                        className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
                         <Link to="/ContectUs">Contact us</Link></li>
                    <li
                        className="text-white cursor-pointer px-6 py-1.5 hover:rounded-md hover:text-md hover:bg-transparent hover:shadow-md shadow-pink-300/50 ... transition delay-150 duration-200 ease-in-out">
                        <Link to="/AboutUs">About us</Link></li>
                </ul>
            </div>
            <div>
                <button
                    className=" text-white lg:px-6 lg:py-1.5 md:px-3 md:py-0.5 px-1 py-1 rounded-md text-md cursor-pointer bg-gradient-to-r from-pink-400 to-indigo-600 transition delay-150 duration-200 ease-in-out m-1 md:m-2"
                    ><Link to='/Worker/Auth'>Start As Worker</Link></button>
                <button
                    className=" text-white lg:px-6 lg:py-1.5 md:px-3 md:py-0.5 px-1 py-1 rounded-md text-md cursor-pointer bg-gradient-to-r from-pink-400 to-indigo-600 transition delay-150 duration-200 ease-in-out m-1 md:m-2"
                    ><Link to='/Client/Auth'>Get Start</Link></button>
            </div>
        </div>
    </nav>
  )
}
