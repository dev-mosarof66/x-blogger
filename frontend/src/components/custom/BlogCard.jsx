/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";

const BlogCard = ({ i, admin = false, views, handler }) => {
    const router = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            onClick={() =>  router(`/blog/${i}`)}
            className="group bg-gray-100 dark:bg-gray-800 relative shadow-md rounded-2xl overflow-hidden 
                 hover:shadow-black/20 active:scale-95 cursor-pointer 
                 transition-all duration-300 delay-75 border border-transparent"
        >
            {/* Image */}
            <div className="relative w-full h-48 overflow-hidden">
                <img
                    src={`https://picsum.photos/seed/tech${i}/600/300`}
                    alt="blog"
                    className="w-full h-full object-cover transition-transform duration-500"
                />
                {/* Category Chip */}
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-md shadow-md">
                    Technology
                </span>
            </div>

            {/* Content */}
            <div className="p-2 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-all duration-300 delay-75">
                    Latest Tech Insight {i}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    A short teaser about emerging tech trends like AI, Web3, cloud, and DevOps shaping the future of innovation.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Published: Oct 15, 2025</p>

                {/* Read More (User Mode) */}
                {!admin && (
                    <Link
                        to={`/blog/${i}`}
                        className="text-purple-600 text-sm font-medium mt-1 hover:underline"
                    >
                        Read More →
                    </Link>
                )}

                {/* Admin Mode */}
                {admin && (
                    <div className="flex items-center justify-between">
                        {/* Stats */}
                        <div className="flex  items-center gap-4 text-base text-gray-600 dark:text-gray-400 ">
                            <p className="flex items-center gap-1">
                                <FaEye className="text-purple-500" /> {views || 0}
                            </p>
                            <p className="flex items-center gap-1">
                                <FcLike /> 10 
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router(`/admin/edit-blog/${i}`);
                                }}
                                className="p-2 rounded-lg hover:bg-purple-600/10 active:scale-95  cursor-pointer transition-all duration-300 delay-75"
                                title="Edit Blog"
                            >
                                <FaEdit size={18} />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handler();
                                }}
                                className="p-2 rounded-lg hover:bg-red-600/10  active:scale-95 text-red-500 cursor-pointer transition-all duration-300 delay-75"
                                title="Delete Blog"
                            >
                                <FaDeleteLeft size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default BlogCard;
