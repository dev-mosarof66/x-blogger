import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../../components/custom/BlogCard";
import { FaPlus } from 'react-icons/fa'
import DeleteModal from "../../components/custom/DeleteModal";

const BlogList = () => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false)

  const handleBlogEdit = () => { }
  const handleDeleteBlog = () => { }
  return (
    <div className="w-full h-full p-2 space-y-6 relative">
      {/* Create Blog Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/admin/blogs/create")}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-2 py-2 rounded-sm cursor-pointer transition-all duration-300 delay-75"
        >
          <FaPlus />
          Create Blog
        </button>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <BlogCard key={i} i={i} admin={true} handleBlogEdit={handleBlogEdit} handleDeleteBlog={handleDeleteBlog} handler = {()=> setDeleteModal(true)} />
        ))}
      </div>

      <DeleteModal isOpen={deleteModal} title='blog name..' onConfirm={handleDeleteBlog} onCancel={() => setDeleteModal(false)} />
    </div>
  );
};

export default BlogList;
