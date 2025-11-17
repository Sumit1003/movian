// src/utils/adminAuth.js

const API = import.meta.env.VITE_API_BASE_URL || "";

export const isAdminLoggedIn = async () => {
  try {
    const res = await fetch(`${API}/api/admin/session`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return false;

    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("Admin session check failed:", err);
    return false;
  }
};
