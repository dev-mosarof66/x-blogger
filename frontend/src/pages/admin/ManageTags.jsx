import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../utils/axios";
import { FaTag, FaPlus, FaTags, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {  setTags } from "../../features/tags.slices";

const ManageTags = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.tags);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  // create new tag
  const handleAddTag = async () => {
    if (!name.trim()) return toast.error("Tag name cannot be empty");
    try {
      setLoading(true);
      const res = await axiosInstance.post("/admin/tags", { name });
      if (res.data.success) {
        toast.success("Tag created successfully");
        console.log(res.data)
        dispatch(setTags(res.data.tags))
        setName("");
      }
    } catch (error) {
      console.error("Error while creating new tag:", error);
      toast.error("Failed to create tag");
    } finally {
      setLoading(false);
    }
  };

  // delete tag
  const handleDeleteTag = async (tagId) => {

    try {
      setActionLoading(tagId);
      const res = await axiosInstance.delete(`/admin/tags/${tagId}`);
      if (res.data.success) {
        toast.success("Tag deleted successfully");
        dispatch(setTags(res.data.tags));
      }
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast.error("Failed to delete tag");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-sm sm:text-base">
      {/* Add Tag */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Enter tag name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full sm:w-1/2 lg:w-96 px-4 py-2 border border-purple-500 rounded-md outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-gray-800"
        />
        <div
          onClick={handleAddTag}
          disabled={loading}
          className="w-full sm:w-fit flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300 active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <>
              <FaPlus /> Add Tag
            </>
          )}
        </div>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <div
              key={tag._id}
              className="flex items-center justify-between bg-white dark:bg-gray-800 border border-purple-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <FaTag className="text-purple-600" />
                <p className="font-medium">{tag.name}</p>
              </div>
              <button
                onClick={() => handleDeleteTag(tag._id)}
                disabled={actionLoading === tag._id}
                className="text-red-600 hover:text-red-700 active:scale-95 cursor-pointer transition-all duration-300 disabled:opacity-50"
              >
                {actionLoading === tag._id ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FaTrash />
                )}
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 col-span-full mt-10 gap-3">
            <FaTags className="text-5xl text-purple-500 animate-pulse" />
            <p className="text-lg font-medium">No tags available</p>
          </div>

        )}
      </div>
    </div>
  );
};

export default ManageTags;
