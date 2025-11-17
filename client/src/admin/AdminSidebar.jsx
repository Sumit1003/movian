import React from "react";
import { Shield, Users, MessageSquare, Menu, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const menu = [
    { label: "Dashboard", icon: Shield, id: "dashboard" },
    { label: "Users", icon: Users, id: "users" },
    { label: "Comments", icon: MessageSquare, id: "comments" },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? "80px" : "250px" }}
      className="bg-gray-800 border-r border-gray-700 text-white flex flex-col py-6 transition-all"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 mb-6">
        {!collapsed && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            ADMIN PANEL
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-700 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 px-2">
        {menu.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700"
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </motion.button>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-auto px-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600/30 text-red-400 w-full">
          <LogOut size={20} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
