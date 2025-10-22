/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TrendingBlogs = () => {
    const { blogs } = useSelector(state => state.userBlogs)
    return (
        <section className="max-w-7xl mx-auto px-6 lg:px-0 py-16">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-8 flex items-center gap-2 relative"
            >
                Trending Blogs
                <div className="absolute h-[2px] bg-purple-500 w-28 -bottom-1" />
            </motion.h2>

            <div className='flex-1 flex items-center justify-center'>
                {
                    blogs.length > 0 ? <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {blogs.map((blog, i) => (
                            <BlogCard key={blog._id} i={i} blog={blog} />
                        ))}
                    </div> :
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: { duration: 0.5 }
                            }}
                            whileInView={{
                                opacity: 1,
                                transition: { duration: 0.5 }
                            }}
                        >NO TRENDING BLOGS TODAY</motion.p>
                }
            </div>
        </section>

    )
}

export default TrendingBlogs