/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BlogCard from "../../components/custom/BlogCard";
import { useSelector } from "react-redux";
import Hero from "../../components/custom/Hero";
import TrendingBlogs from "../../components/custom/TrendingBlogs";

const Landing = () => {

    const { user } = useSelector(state => state.user)
    const { blogs } = useSelector(state => state.blogs)

    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 pt-20">
            {/* Hero Section */}
            <Hero user={user} />

            {/* Trending Tech Blogs */}
            <TrendingBlogs />
            {/* all blogs  */}
            <section className="max-w-7xl mx-auto px-6 lg:px-0 py-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold mb-8 flex items-center gap-2 relative"
                >
                    Other Blogs
                    <div className="absolute h-[2px] bg-purple-500 w-16 -bottom-1" />
                </motion.h2>

                <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {blogs.slice(0, 4).map((blog, i) => (
                        <BlogCard key={i} i={i} blog={blog} />
                    ))}
                </div>
            </section>

            {/* Call To Action */}
            {
                !user && <section className="py-20 bg-gradient-to-r from-purple-600 to-cyan-400  text-center flex flex-col gap-4 text-gray-900">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-4xl font-extrabold"
                    >
                        Start Your Tech Blogging Journey
                    </motion.h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-900">
                        We are 100% guranteed to provide the latest tech news and informations.
                    </p>
                    <Link
                        to="/register"
                        className="w-[80%] sm:w-xs mx-auto px-8 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-md hover:bg-gray-100 active:scale-95 transition duration-300 delay-75"
                    >
                        Get Started
                    </Link>
                </section>
            }
        </div>
    );
};

export default Landing;
