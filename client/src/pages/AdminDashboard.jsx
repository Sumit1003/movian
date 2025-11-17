import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  Users, 
  MessageSquare, 
  Shield, 
  LogOut, 
  Ban, 
  Trash2, 
  Search,
  Eye,
  EyeOff,
  Calendar,
  Mail,
  User,
  RefreshCw
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState({});
  const [stats, setStats] = useState({
    totalUsers: 0,
    bannedUsers: 0,
    totalComments: 0,
    recentComments: 0
  });

  // Check admin session and load data
  const loadDashboard = async () => {
    try {
      setIsLoading(true);
      
      // Check admin session
      const sessionResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/session`,
        { 
          method: "GET",
          credentials: "include",
          headers: {
            "Cache-Control": "no-cache"
          }
        }
      );

      if (!sessionResponse.ok) {
        window.location.href = "/admin-login";
        return;
      }

      const sessionData = await sessionResponse.json();
      if (!sessionData.success) {
        window.location.href = "/admin-login";
        return;
      }

      // Fetch users and comments in parallel
      const [usersResponse, commentsResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`, {
          credentials: "include",
          headers: { "Cache-Control": "no-cache" }
        }),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/comments`, {
          credentials: "include",
          headers: { "Cache-Control": "no-cache" }
        })
      ]);

      if (!usersResponse.ok || !commentsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const usersData = await usersResponse.json();
      const commentsData = await commentsResponse.json();

      setUsers(usersData.users || []);
      setComments(commentsData.comments || []);
      
      // Calculate stats
      setStats({
        totalUsers: usersData.users?.length || 0,
        bannedUsers: usersData.users?.filter(u => u.isBanned)?.length || 0,
        totalComments: commentsData.comments?.length || 0,
        recentComments: commentsData.comments?.filter(c => {
          const commentDate = new Date(c.createdAt || c.timestamp);
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return commentDate > weekAgo;
        })?.length || 0
      });

    } catch (error) {
      console.error("Dashboard load error:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter data based on search
  useEffect(() => {
    const filteredUsers = users.filter(user =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);

    const filteredComments = comments.filter(comment =>
      comment.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.movieId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComments(filteredComments);
  }, [users, comments, searchTerm]);

  const toggleBan = async (userId, username) => {
    if (!userId) {
      toast.error("Invalid user ID");
      return;
    }

    setIsProcessing(prev => ({ ...prev, [userId]: true }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/ban/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await response.json();

      if (data.success) {
        const user = users.find(u => u._id === userId);
        toast.success(
          user?.isBanned 
            ? `Unbanned ${username}` 
            : `Banned ${username}`
        );
        loadDashboard();
      } else {
        toast.error(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Ban error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsProcessing(prev => ({ ...prev, [userId]: false }));
    }
  };

  const deleteComment = async (commentId, username) => {
    if (!commentId) {
      toast.error("Invalid comment ID");
      return;
    }

    setIsProcessing(prev => ({ ...prev, [commentId]: true }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(`Deleted comment by ${username}`);
        loadDashboard();
      } else {
        toast.error(data.message || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Delete comment error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsProcessing(prev => ({ ...prev, [commentId]: false }));
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include"
      });
      window.location.href = "/admin-login";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/admin-login";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center pt-20">
        <div className="text-center text-white">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-12">
      {/* Fixed padding top to account for navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl"
            >
              <Shield size={24} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Manage users and content</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadDashboard}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-600"
            >
              <RefreshCw size={16} />
              Refresh
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { 
              label: "Total Users", 
              value: stats.totalUsers, 
              icon: Users, 
              color: "blue",
              bgColor: "bg-blue-500/20",
              textColor: "text-blue-400"
            },
            { 
              label: "Banned Users", 
              value: stats.bannedUsers, 
              icon: Ban, 
              color: "red",
              bgColor: "bg-red-500/20",
              textColor: "text-red-400"
            },
            { 
              label: "Total Comments", 
              value: stats.totalComments, 
              icon: MessageSquare, 
              color: "green",
              bgColor: "bg-green-500/20",
              textColor: "text-green-400"
            },
            { 
              label: "Recent Comments", 
              value: stats.recentComments, 
              icon: Calendar, 
              color: "purple",
              bgColor: "bg-purple-500/20",
              textColor: "text-purple-400"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon size={24} className={stat.textColor} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: "users", label: "Users", icon: Users },
              { id: "comments", label: "Comments", icon: MessageSquare }
            ].map((tabItem) => (
              <button
                key={tabItem.id}
                onClick={() => setActiveTab(tabItem.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  activeTab === tabItem.id
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                <tabItem.icon size={18} />
                {tabItem.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-8"
        >
          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredUsers.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <Users size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No users found</p>
                  <p className="text-sm text-gray-500">
                    {searchTerm ? "Try adjusting your search terms" : "No users in the system"}
                  </p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <motion.div
                    key={user._id}
                    variants={itemVariants}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={24} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-white text-lg truncate">{user.username}</h3>
                            {user.isBanned && (
                              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm flex items-center gap-1 flex-shrink-0">
                                <Ban size={14} />
                                Banned
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm flex items-center gap-2 mb-1">
                            <Mail size={16} />
                            <span className="truncate">{user.email}</span>
                          </p>
                          <p className="text-gray-500 text-sm">
                            Joined {formatDate(user.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleBan(user._id, user.username)}
                        disabled={isProcessing[user._id]}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 min-w-[120px] justify-center ${
                          user.isBanned
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isProcessing[user._id] ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : user.isBanned ? (
                          <Eye size={16} />
                        ) : (
                          <EyeOff size={16} />
                        )}
                        {isProcessing[user._id] ? "Processing..." : user.isBanned ? "Unban" : "Ban"}
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredComments.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No comments found</p>
                  <p className="text-sm text-gray-500">
                    {searchTerm ? "Try adjusting your search terms" : "No comments in the system"}
                  </p>
                </div>
              ) : (
                filteredComments.map((comment) => (
                  <motion.div
                    key={comment._id}
                    variants={itemVariants}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <User size={16} className="text-white" />
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-red-400">{comment.username}</span>
                            <span className="text-gray-500 text-sm">•</span>
                            <span className="text-gray-400 text-sm">
                              {formatDate(comment.createdAt || comment.timestamp)}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-200 mb-3 leading-relaxed text-lg">{comment.comment}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">
                            Movie ID: {comment.movieId}
                          </span>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteComment(comment._id, comment.username)}
                        disabled={isProcessing[comment._id]}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 min-w-[120px] justify-center disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      >
                        {isProcessing[comment._id] ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <Trash2 size={16} />
                        )}
                        {isProcessing[comment._id] ? "Deleting..." : "Delete"}
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;