"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Moon, Sun, ShoppingCart } from "lucide-react"; // Import ShoppingCart icon
import Link from "next/link";
import { navigation } from "../../constant";

function HomeNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check user login state
    const user = localStorage.getItem("currentUser");
    setIsLoggedIn(!!user);

    // Check system or user theme preference
    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    router.push("/login");
    localStorage.removeItem("cart");
  };

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const closeNavigation = () => {
    setOpenNavigation(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-cyan-400 tracking-wide transition">
          Mihir Ecommerce
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Theme"
          className="lg:block text-gray-900 dark:text-white hover:text-cyan-400 transition"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleNavigation}
          aria-label="Toggle navigation"
          className="lg:hidden text-gray-900 dark:text-white"
        >
          {openNavigation ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed inset-0 top-[5rem] bg-white dark:bg-black lg:static lg:flex lg:items-center`}
          aria-label="Main Navigation"
        >
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8 lg:mx-auto">
            {navigation
              .filter((item) => isLoggedIn || item.title !== "Cart" && item.title !== "Products")
              .map((item) => (
                <a
                  key={item.label}
                  href={item.route}
                  onClick={closeNavigation}
                  className={`text-lg font-medium uppercase tracking-wide text-gray-900 dark:text-gray-100 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors ${
                    item.route === pathname ? "text-cyan-400" : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {item.title}
                </a>
              ))}
          </div>

          {/* Cart (visible when logged in) */}
          {isLoggedIn && (
            <div className="lg:ml-6 mt-4 lg:mt-0">
              <Link href="/cart">
                <ShoppingCart size={24} className="text-gray-600 dark:text-gray-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition" />
              </Link>
            </div>
          )}

          {/* Login/Logout Section */}
          <div className="flex justify-center items-center mt-6 lg:mt-0 lg:ml-6">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default HomeNav;
