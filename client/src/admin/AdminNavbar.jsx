import React from "react";
import { Bell, Mail, ChevronDown } from "lucide-react";

const AdminNavbar = () => {
  return (
    <div className="w-full bg-gray-800/80 backdrop-blur-lg border-b border-gray-700 px-6 py-4 flex items-center justify-between shadow-lg">
      
      <h2 className="text-xl font-semibold text-white">Dashboard</h2>

      <div className="flex items-center gap-6">

        <button className="relative hover:text-red-400">
          <Bell size={22} />
          <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs px-1">3</span>
        </button>

        <button className="relative hover:text-red-400">
          <Mail size={22} />
          <span className="absolute -top-2 -right-2 bg-blue-600 rounded-full text-xs px-1">5</span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
          <img
            src="/profile.jpg"
            alt="admin"
            className="w-10 h-10 rounded-full border border-gray-600"
          />
          <p className="text-white font-medium">Admin</p>
          <ChevronDown size={20} className="text-gray-300" />
        </div>

      </div>
    </div>
  );
};

export default AdminNavbar;
