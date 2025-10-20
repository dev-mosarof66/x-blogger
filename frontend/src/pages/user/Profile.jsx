/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "motion/react";
import { FaBookOpen, FaCalendarAlt, FaUser } from "react-icons/fa";
import BlogCard from "../../components/custom/BlogCard"; // reuse your BlogCard

// Dummy data (replace with your real data later)
const user = {
  name: "Mosarof Hossain",
  username: "dev-mosarof66",
  avatar: "https://i.pravatar.cc/150?img=3",
  bio: "Frontend Developer & Tech Blogger. Passionate about React, TailwindCSS, and building cool UI.",
  joined: "January 2023",
};

const readBlogs = [
  {
    id: 1,
    title: "Understanding AI: A Beginner's Guide",
    content: "Artificial Intelligence (AI) is transforming industries...",
    image: "https://picsum.photos/seed/ai/600/400",
    tags: ["AI", "Machine Learning"],
  },
  {
    id: 2,
    title: "Modern JavaScript Tips & Tricks",
    content: "JavaScript continues to evolve with new features...",
    image: "https://picsum.photos/seed/js/600/400",
    tags: ["JavaScript", "Frontend"],
  },
  {
    id: 3,
    title: "TailwindCSS Best Practices",
    content: "Learn how to make your Tailwind workflow smoother...",
    image: "https://picsum.photos/seed/tailwind/600/400",
    tags: ["TailwindCSS", "UI Design"],
  },
];

const UserProfile = () => {
  return (
    <div className="max-w-6xl mx-auto min-h-screen  space-y-10">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-28 h-28 rounded-full border-4 border-purple-600 object-cover"
        />
        <div className=" md:text-left space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FaUser /> {user.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
          <p className="text-gray-700 dark:text-gray-300 max-w-lg">{user.bio}</p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FaCalendarAlt /> Joined {user.joined}
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="grid sm:grid-cols-3 gap-6 text-center"
      >
        <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-xl">
          <FaBookOpen className="text-purple-600 text-2xl mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {readBlogs.length}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Blogs Read</p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">8</h3>
          <p className="text-gray-500 dark:text-gray-400">Bookmarks</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">5</h3>
          <p className="text-gray-500 dark:text-gray-400">Comments</p>
        </div>
      </motion.div>

      {/* Blogs Read Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Blogs You’ve Read
        </h2>

        {readBlogs.length > 0 ? (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {readBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            You haven’t read any blogs yet.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default UserProfile;
