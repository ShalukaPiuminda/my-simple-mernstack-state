import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <header className="shadow-lg font-sans bg-white">
      <section className="flex flex-wrap items-center justify-between p-4 border-b border-gray-200">
        {/* Logo */}
        <Link to="/" className="flex items-center mb-4 md:mb-0">
          <img src="/images/LOGO.jpeg" alt="Logo" className="w-20 h-21" />
        </Link>

        {/* Search Bar */}
        <form className="relative w-full md:w-auto mb-4 md:mb-0 md:ml-4 flex-shrink-0 p-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full md:w-80 px-4 py-2 text-sm border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchInput.length < 30 && ( // Hide the search icon if the input is too long
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-900 mr-3" />
          )}
        </form>

        {/* Navigation */}
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
          <Link
            to="/"
            className="text-gray-800 hover:text-blue-500 text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:text-blue-500 text-sm font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 hover:text-blue-500 text-sm font-medium"
          >
            Contact
          </Link>
        </nav>

        {/* Conditional Rendering for Login/Register or Profile */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A4.978 4.978 0 0012 19a4.978 4.978 0 006.879-1.196M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          ) : (
            <>
              <Link Link
                to="/sign-in"
                className="text-gray-800 hover:text-blue-500 text-sm font-medium m-3"
              >
                Sign in
              </Link>
              <Link
                to="/sign-up"
                className="text-gray-800 hover:text-blue-500 text-sm font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
