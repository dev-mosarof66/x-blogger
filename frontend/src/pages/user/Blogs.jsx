/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import BlogCard from "../../components/custom/BlogCard";

const dummyBlogs = [
  {
    id: 1,
    title: "Understanding AI: A Beginner's Guide",
    content: "Artificial Intelligence (AI) is transforming industries...",
    image: "https://picsum.photos/seed/tech1/600/400",
    tags: ["AI", "Machine Learning"],
  },
  {
    id: 2,
    title: "Top 10 Web Development Frameworks in 2025",
    content: "Web development continues to evolve...",
    image: "https://picsum.photos/seed/tech2/600/400",
    tags: ["Web Development", "Frontend"],
  },
  {
    id: 3,
    title: "Cloud Computing Essentials for Developers",
    content: "Cloud computing powers modern apps...",
    image: "https://picsum.photos/seed/tech3/600/400",
    tags: ["Cloud", "DevOps"],
  },
];

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("All");

  const allTags = ["All", ...new Set(dummyBlogs.flatMap((b) => b.tags))];

  const filteredBlogs = dummyBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.content.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || blog.tags.includes(filter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto min-h-screen px-6 lg:px-0 py-20">
      {/* Search + Filter */}
      <div className="flex items-center justify-between mb-8 gap-4">
        {/* Search */}
        <div className="flex items-center border border-purple-700 focus:bg-purple-800 rounded-full px-4 py-2 shadow-sm focus-within:shadow-md transition w-full max-w-sm">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full bg-transparent text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg font-medium text-gray-200 hover:bg-purple-700 active:scale-95  cursor-pointer transition-all duration-300 delay-75" 
          >
            <FaFilter />
            <span className="hidden sm:block">{filter}</span>
          </div>

          {showFilter && (
            <div className="w-60 absolute right-0 mt-2 bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-2 z-10">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setFilter(tag);
                    setShowFilter(false);
                  }}
                  className={`block px-4 py-1 w-full text-left rounded-md hover:bg-purple-500 ${
                    tag === filter ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
                  } cursor-pointer transition-all duration-300 delay-75`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Blog Grid with AnimatePresence */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))
          ) : (
            <motion.p
              key="no-blogs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center col-span-4 text-gray-600 dark:text-gray-400"
            >
              No blogs found.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Blogs;
