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
    const { user } = useSelector((state) => state.user);


    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get(`/user/blogs/${id}`);
                if (res.data.success) {
                    setBlog(res.data.blog);
                    await axiosInstance.post(`/user/views/${id}`)
                }
            } catch (error) {
                console.error("Error fetching blog by ID:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    //reset to 0

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600 dark:text-gray-400">
                Loading blog...
            </div>
        );
    }

    // Blog not found
    if (!blog) {
        return (
            <div className="flex items-center h-screen justify-center text-gray-600 dark:text-gray-400">
                Sorry, we couldn’t find this blog post.
            </div>
        );
    }

    // Render blog
    return (
        <article className="w-full max-w-[90%] min-h-screen mx-auto py-20 text-black dark:text-white">
            {/* Header */}
            <header className="w-full flex flex-col gap-2">
                <h1 className="text-3xl sm:text-4xl font-bold">
                    {blog.title || "Untitled Blog"}
                    {user?.role === "admin" && (
                        <span className="font-normal text-sm mx-4 bg-purple-500 p-1 rounded-md text-black">
                            {blog.status}
                        </span>
                    )}
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

            {/* Blog Content */}
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

            {/* Blog Interactions */}
            <BlogInteractions />
        </article>
    );
};

export default Blog;
