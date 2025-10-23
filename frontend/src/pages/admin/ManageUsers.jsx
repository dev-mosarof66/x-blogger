import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { FaTrash, FaBan, FaCheck, FaSync } from "react-icons/fa";
import { toast } from 'react-hot-toast'
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBanToggle = async (userId) => {
    try {
      setActionLoading(userId);
      const res = await axiosInstance.put(`/admin/auth/user/${userId}`);
      if (res.data.success) {
        toast.success(res.data.message)
        setUsers(res.data.users)
      }
    } catch (error) {
      console.error("Error toggling ban:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId) => {

    try {
      setActionLoading(userId);
      const res = await axiosInstance.delete(`/admin/auth/user/${userId}`);
      if (res.data.success) {
        console.log(res.data)
        setUsers(res.data.users)
      }

    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div>
      <p className="block xs:hidden text-center text-black dark:text-white font-semibold">Please visit this page in large screen</p>
      {/* for large screen  */}
      <div className=" hidden xs:block">
        <div className="min-h-screen text-gray-900 dark:text-gray-100">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={fetchUsers}
              className="flex items-center gap-2 text-sm bg-purple-600 hover:bg-purple-700 active:scale-95 px-2 py-2 rounded-lg text-white cursor-pointer  transition-all duration-300 delay-75"
            >
              <FaSync />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-sm text-sm border border-purple-500">
            {loading ? (
              <div className="w-full flex justify-center items-center py-10">
                <span className="loading loading-spinner loading-lg text-purple-600"></span>
              </div>
            ) : users.length === 0 ? (
              <p className="text-center py-10 text-gray-700 dark:text-gray-500">No users found.</p>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr className=" text-black dark:text-white text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Blogs</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Joined</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    >
                      <td className="p-3 font-medium">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.read.length}</td>
                      <td className="p-3">
                        {user.isBanned ? (
                          <span className="text-red-500 font-semibold">Banned</span>
                        ) : (
                          <span className="text-green-500 font-semibold">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {new Date(user.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}

                      </td>
                      <td className="p-3 flex items-center justify-center gap-3">
                        <button
                          onClick={() =>
                            handleBanToggle(user._id)
                          }
                          disabled={actionLoading === user._id}
                          className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-all duration-300`}
                        >
                          {actionLoading === user._id ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) :
                            <div className={`${!user.isBanned
                              ? "text-green-600 hover:text-green-700"
                              : "text-red-600 hover:text-red-700"
                              } tooltip tooltip-bottom active:scale-95 cursor-pointer transition-all duration-300 delay-75`} data-tip={user.isBanned ? 'Banned' : 'Active'}>
                              <FaBan />
                            </div>
                          }
                        </button>

                        <button
                          onClick={() => handleDelete(user._id)}
                          disabled={actionLoading === user._id}
                          className="px-3 py-2 bg-red-700 hover:bg-red-800 active:scale-95 text-white rounded-md text-sm flex items-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50"
                        >
                          {actionLoading === user._id ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) : (
                            <>
                              <FaTrash />
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
