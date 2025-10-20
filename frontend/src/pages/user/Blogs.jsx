import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import BlogCard from "../../components/custom/BlogCard";

// Dummy blogs (replace with API later)
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
    const [filter, setFilter] = useState("All");

    // Get unique tags for filter dropdown
    const allTags = [
        "All",
        ...new Set(dummyBlogs.flatMap((blog) => blog.tags)),
    ];

    // Filtered blogs based on search and tag
    const filteredBlogs = dummyBlogs.filter((blog) => {
        const matchesSearch =
            blog.title.toLowerCase().includes(search.toLowerCase()) ||
            blog.content.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || blog.tags.includes(filter);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="max-w-7xl mx-auto min-h-screen px-6 lg:px-0 py-20">

            {/* Search and Filter */}
            <div className="flex  items-center justify-between mb-8 gap-4">
                {/* Search */}
                <div className="flex items-center border rounded-full px-4 py-2 shadow-sm focus-within:shadow-md transition">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="outline-none w-full sm:w-sm bg-transparent text-gray-900 dark:text-gray-100"
                    />
                </div>

                {/* Filter */}
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border rounded-sm px-4 py-2 shadow-sm focus:shadow-md transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                    {allTags.map((tag, idx) => (
                        <option key={idx} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

            {/* Blog Cards */}
            <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((_, i) => (
                        <BlogCard key={i} i={i} />
                    ))
                ) : (
                    <p className="text-center col-span-3 text-gray-600 dark:text-gray-400">
                        No blogs found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Blogs;
