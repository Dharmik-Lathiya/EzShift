import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Features', target: 'Features-Section' },
  { name: 'Tools', target: 'Tool-Section' },
]

export default function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Smooth-scroll to a section on the landing page,
  // or go home and scroll there when on another page.
  const scrollToSection = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    window.location.assign(`/#${id}`)
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 border-b border-white/10">
      <div className="h-16 lg:h-20 max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="flex items-center shrink-0" onClick={() => setMenuOpen(false)}>
          <img className="h-9 sm:h-11 w-auto object-contain" src={logo} alt="EzShift" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.target}>
                <a
                  href={`/#${link.target}`}
                  onClick={(e) => scrollToSection(e, link.target)}
                  className="relative text-sm lg:text-[15px] font-medium text-slate-300 hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/AboutUs"
                className="relative text-sm lg:text-[15px] font-medium text-slate-300 hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/ContectUs"
                className="relative text-sm lg:text-[15px] font-medium text-slate-300 hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                Contact us
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/Worker/Auth"
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-slate-200 border border-slate-700 hover:border-slate-500 hover:text-white transition-colors"
            >
              Start As Worker
            </Link>
            <Link
              to="/Client/Auth"
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden p-2 -mr-2 text-slate-200 hover:text-white transition-colors"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-950 px-4 sm:px-6 pb-6 pt-1 border-t border-white/10">
          <ul>
            {navLinks.map((link) => (
              <li key={link.target}>
                <a
                  href={`/#${link.target}`}
                  onClick={(e) => scrollToSection(e, link.target)}
                  className="block py-3 text-slate-200 hover:text-white border-b border-white/5 transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/AboutUs"
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-slate-200 hover:text-white border-b border-white/5 transition-colors"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/ContectUs"
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-slate-200 hover:text-white border-b border-white/5 transition-colors"
              >
                Contact us
              </Link>
            </li>
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <Link
              to="/Worker/Auth"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-200 border border-slate-700 hover:border-slate-500 hover:text-white transition-colors"
            >
              Start As Worker
            </Link>
            <Link
              to="/Client/Auth"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}