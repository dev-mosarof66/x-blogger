import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaRegNewspaper } from "react-icons/fa";
import axiosInnstance from "../../utils/axios";
import { setBlogs } from "../../features/admin-blog.slices";
import BlogCard from "../../components/custom/BlogCard";
import DeleteModal from "../../components/custom/DeleteModal";
import { BlogCardPlaceholder } from "../../components/ui/Placeholder";

const BlogList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.adminBlogs);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleBlogEdit = () => { };
  const handleDeleteBlog = () => { };

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInnstance.get("/admin/blogs");
        if (res.data.success) {
          dispatch(setBlogs(res.data.blogs));
        }
      } catch (error) {
        console.log("Error fetching blogs for admin:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="w-full h-full p-2 space-y-6 relative">
      {/* Create Blog Button */}
      <div className="flex justify-end">
        {
          blogs.length !== 0 && <button
            onClick={() => navigate("/admin/blogs/create")}
            className="flex items-center text-sm sm:text-base gap-2 bg-purple-600 hover:bg-purple-700 text-white px-2 py-2 rounded-sm cursor-pointer transition-all duration-300 delay-75"
          >
            <FaPlus />
            Create Blog
          </button>
        }
      </div>

      {/* Blog Cards Grid */}
      <div>
        {loading ? (
          <div className="grid xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <BlogCardPlaceholder />
            <BlogCardPlaceholder />
            <BlogCardPlaceholder />
            <BlogCardPlaceholder />
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogs.map((blog, i) => (
              <BlogCard
                key={blog._id || i}
                blog={blog}
                admin={true}
                handleBlogEdit={handleBlogEdit}
                handleDeleteBlog={handleDeleteBlog}
                handler={() => setDeleteModal(true)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 mt-20 space-y-3">
            <FaRegNewspaper className="text-6xl text-purple-500 opacity-70" />
            <p className="text-lg font-medium">No Blogs Found</p>
            <button
              onClick={() => navigate("/admin/blogs/create")}
              className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300 delay-75"
            >
              Create Your First Blog
            </button>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal}
        title="Blog name..."
        onConfirm={handleDeleteBlog}
        onCancel={() => setDeleteModal(false)}
      />
    </div>
  );
};

export default BlogList;
