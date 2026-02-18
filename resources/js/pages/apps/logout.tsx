import React, { useState } from "react";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // user waa logged in

  const handleLogout = () => {
    // Markaas user logout ayuu noqonayaa
    setIsLoggedIn(false);
    alert("You have been logged out!");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold">Please login to continue...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <main>
        <p>Welcome to your dashboard!</p>
      </main>
    </div>
  );
}