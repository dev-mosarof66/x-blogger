import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogInteractions from "../../components/custom/BlogInteraction";
import axiosInstance from "../../utils/axios";
import moment from "moment";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axiosInstance.get(`/admin/blogs/${id}`);
                setBlog(res.data.blog);
            } catch (error) {
                console.error("Error fetching blog by ID:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);



    // Handle loading
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-400">
                Loading blog...
            </div>
        );
    }


    // Handle missing blog
    if (!blog) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-400">
                Sorry, we couldn’t find this blog post.
            </div>
        );
    }


    return (
        <article className="w-full max-w-[90%] min-h-screen mx-auto py-20 text-black dark:text-white">
            {/* Header */}
            <header className="w-full flex flex-col gap-2">
                <h1 className="text-3xl sm:text-4xl font-bold">
                    {blog.title || "Untitled Blog"}
                    <span className="font-normal text-sm mx-4 bg-purple-500 p-1 rounded-md text-black">{user.role === 'admin' && (blog.status)}</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    {moment(blog.createdAt).format("DD MMM YYYY")}
                </p>
            </header>

            {/* Tags */}
            {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 py-4">
                    {blog.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-md text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Blog content */}
            <section className="overflow-auto">
                {blog.coverImage?.url && (
                    <img
                        src={blog.coverImage.url}
                        alt={blog.title || "blog cover"}
                        className="lg:float-left w-full max-w-xl h-72 mb-4 md:mr-6 rounded-xl shadow-md object-cover"
                    />
                )}

                <div className="w-full prose dark:prose-invert max-w-none">
                    {parse(blog.content)}
                </div>
            </section>

            {/* Divider */}
            <div className="w-full my-10 h-[1px] bg-gradient-to-r from-transparent via-purple-700 to-transparent" />

            {/* Interactions */}
            <BlogInteractions />
        </article>
    );
};

export default Blog;
