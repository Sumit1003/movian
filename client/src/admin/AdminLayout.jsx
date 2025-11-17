import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1 flex flex-col bg-gray-900">
        <AdminNavbar collapsed={collapsed} setCollapsed={setCollapsed} />
        
        <div className="p-6 mt-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
