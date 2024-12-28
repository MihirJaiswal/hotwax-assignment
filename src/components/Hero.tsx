import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center p-8 mt-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 dark:text-gray-100 mb-6 text-center">
          Welcome to Hotwax Shop
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 text-center max-w-2xl">
          Discover an exceptional shopping experience at your fingertips. Sign up or log in to get started.
        </p>
        <div className="flex gap-6">
        <Link
  href="/register"
  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-950 to-gray-900 border border-gray-300 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
  Register
</Link>

<Link
  href="/login"
  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-950 to-gray-900 border border-gray-300 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
  Login
</Link>

        </div>
      </main>
    </>
  )
}
